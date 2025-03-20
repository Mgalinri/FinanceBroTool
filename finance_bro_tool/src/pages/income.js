//React Imports

//External Imports
import {  Link } from "react-router";

//Internal Imports
import TextBox  from "../components/textBoxes";


function Income() {
  return (
    <div className="flex flex-col items-center justify-center  h-screen w-100">
      
    <div className="w-1/2 flex flex-col  items-center justify-center ">
    <header>
       <h1 className="text-primary font-black text-xl">The Finance Bro Tool</h1>
    </header>
  
    <div className="flex  flex-col items-center justify-center w-[576px] p-4">
    
     <TextBox id="fName" label="What is your Monthly Income?" placeholder="2,500" type="text"/>

     
    
     <Link to="/expenseTable">
     <button className="bg-secondary   font-bold text-white w-full p-2 rounded-lg">Next</button>
     </Link>
     </div>
     </div>
 </div>
 
  );
}

export default Income;