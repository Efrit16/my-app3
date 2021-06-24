import React, { useState } from "react";
import './item.css'
export default function AddItem(props) {
  const [input, setInput] = useState({
    name: "",
    image: "",
    category: "",
  });
  
  function handleSubmit(e) {
    let newState = {
      name: e.target.name.value,
     
      image: e.target.image.value,
      category:e.target.category.value
    };
    e.preventDefault();
    console.log("i was also clicked");
    setInput(newState);
    e.target.reset();
    props.addItemToList(newState);
   
  }
  return (
    <form className="formWrapper" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="Name" className="formbuilder-text-label">
          Name
          <br /> 
          <input id="name" type="text" required="required" />  
        </label>
        
        
        
        <label htmlFor="Image">
          Image
          <br />
          <input id="image" type="text"/>
        </label>
        
        <label htmlFor="Category">
          Category
          <br />
          <select id="category"  type="select">
            <option value="Computers">Computers</option>
            <option value="Phones">Phones</option>
            
          </select>
        </label>
        <br />
        <div id="button-group">
        <button type="reset" className="fancybutton" onClick={()=>props.setViewToSideList()}>Cancel</button>
        <button type="submit" className="fancybutton" >Add</button>
        </div>
      </div>
    </form>
    
  );
}