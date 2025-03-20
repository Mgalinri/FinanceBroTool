//React Imports

//External Imports
import {  Link } from "react-router";

//Internal Imports
import TextBox  from "../components/textBoxes";

const categories = ["Housing","Schooling","bg-secondary","Transportation", "Healthcare","Entertainment","Miscellaneous"]

function ExpenseForm() {
  return (
    <div className="flex flex-col items-center justify-center  h-screen w-100">
      
    
    <header>
       <h1 className="text-primary font-black text-xl">Add Expense</h1>
    </header>
    <div className="flex flex-col items-center justify-center w-1/2 p-4">
    <label className=" text-secondary font-bold self-start" htmlFor="categories"></label>
    <select id="categories" className="border w-full  border-gray-300 p-2 rounded-lg">
       {categories.map((category)=>(
         <option value={category}>{category}</option>
       ))}
    </select>
    </div>
  <TextBox id="description" label="Label" placeholder="Walmart" type="text"></TextBox>
  <TextBox id="amount" label="Amount" placeholder="$2,500" type="number"></TextBox>
  <button className="rounded h-10 text-white font-bold bg-secondary w-1/4">Add</button>

 </div>
 
  );
}

export default ExpenseForm;