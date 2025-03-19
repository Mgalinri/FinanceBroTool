//React Imports

//External Imports


//Internal Imports
import TextBox  from "../components/textBoxes";


function Income() {
  return (
    <div className="flex flex-col items-center justify-center  h-screen w-100">
      
    
    <header>
       <h1 className="text-primary font-black text-xl">The Finance Bro Tool</h1>
    </header>
  
    <div className="flex  flex-col items-center justify-center w-[576px] p-4">
    
     <TextBox id="fName" label="What is your Monthly Income?" placeholder="2,500" type="text"/>

     
     <div className="flex flex-col items-center w-1/2 justify-center p-4 gap-2">

 
     <button className="bg-secondary   font-bold text-white w-full p-2 rounded-lg">Next</button>
  
     </div>
     </div>
 </div>
 
  );
}

export default Income;