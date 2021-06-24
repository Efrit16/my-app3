import './App.css';
import Items from './Items/items.jsx'
import AddItem from './Items/addItem'
import React, { useState } from "react";
import SideList from './sideList/sideList';
import { ContextClickOnItem } from "./ItemClickContext";

function SideListView(props){
  return(
  <div key="sideListViewGroupConditional">
   
    <SideList  category="Computers" handleChildEdit={props.handleChildEdit}
     key="list" list={props.sideList}  setViewToAddItem={props.setViewToAddItem}/>    
    <button  onClick={props.setViewToAddItem}>Add an Item Instead</button>
  </div>)
}


function manageList(oldState,category,name){

  let newList=[...oldState];
 const index=newList.findIndex((elem)=>elem.category===category);
 if(index===-1){
   newList=[...newList,{name,qt:1}];
   throw new Error('unexistant category');
 }else{
   let elemsArray=[...newList[index].elems]
   let i=elemsArray.findIndex((item)=>item.name===name);
    if(elemsArray.length===0||i===-1){
      elemsArray.push({name:name,qt:1});
    }else{
      elemsArray[i].qt=parseInt(elemsArray[i].qt)+1
      
    }
    newList[index].elems=elemsArray;

 }
 return newList;
}

function App() {
  function setViewToAddItem() {
  setCurView("addItem");
}
function handleChildEdit(arrayOfChanges){
  setSideList(arrayOfChanges);
  
}
  const [sideList,setSideList]=useState([
    {category:"Computers",elems:[]},
    {category:"Phones",elems:[]}
  ]);
  const [curView,setCurView]=useState("addItem")

  function addItemToSideList(category,item) {
    
    setCurView("sideListView")
    setSideList(manageList(sideList,category,item.name))
    }
    
  
 let array= 
 [
   {category:"Computers",
    elems:[
      {name:"Asus"},{name:"HP"},
      {name:"DELL"},{name:"Toshiba"},{name:"MSI"},
      {name:"Acer"},{name:"Fujitsu"},{name:"Lenovo"},{name:"Microsoft"}, {name:"IBM"}
    ]
    },
    {category:"Phones",
    elems:[
      {name:"Apple"},{name:"Samsung"},
      {name:"Sony"},{name:"Blackberry"},
      {name:"Huawei"},{name:"LG"},
      {name:"Motorola"},{name:"OnePlus"},{name:"Xiaomi"},{name:"OPPO"},{name:"Vivo"}
    ]
    }
  ]
  const[itemList,setItemList]=useState(array)
  
   
   function addItemToList(itemToAdd) {
     console.log(itemToAdd.category);
     let temp=[...itemList];
     let index=temp.findIndex((elem)=>elem.category===itemToAdd.category);
     if(index===-1){
       throw new Error("cant find category")
     }else{
       temp[index].elems.push({name:itemToAdd.name});
     }
     setItemList(temp);
   }
  function clickOnItem(item){
    setCurView(item);
  }
  return (
    
     
        <div className="wrapperOfAll">
        <div className="nav">
 
        </div>
       <div className="main">
       <ContextClickOnItem.Provider value={{clickOnItem,addItemToSideList}}>
        <Items addItemToSideList={addItemToSideList} itemList={itemList} key="1"/> 
        </ContextClickOnItem.Provider>
        </div>
        {
        curView==="addItem"?
        <AddItem addItemToList={addItemToList} 
        className="add" 
        setViewToSideList={()=>setCurView("sideListView")}/>:
        (
          curView==="sideListView"?
        <SideListView sideList={sideList} setViewToAddItem={setViewToAddItem} handleChildEdit={handleChildEdit}/>
        :<ItemView item={curView}/>)
        }
        </div>
       
      
  );
}
function ItemView(props){
  return(<div>{props.item.name}</div>)
}
export default App;
