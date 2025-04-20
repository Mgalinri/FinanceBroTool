//External Imports
import {  Link } from "react-router";

//Internal Imports
import Grid from "../components/grid";


function Percentages() {
    
  return (
    <div className="flex flex-col  items-center justify-center   h-screen w-100">
    <div className="w-1/2 flex flex-col  items-center justify-center ">
    <header>
       <h1 className="text-secondary text-2xl font-black  mb-10">What Percentage Do You Want to Assign into the Following?</h1>
    </header>
    
   <Grid />
   <Link  className="w-full flex justify-end" to="/dashboard">
    <button className="bg-secondary font-black  mt-6 w-1/3 rounded-r-3xl  h-12 text-white ">Complete</button>
    </Link>
    </div>
 </div>
 
  );
}

export default Percentages;