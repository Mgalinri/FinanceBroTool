//React Imports

//External Imports
import {  Link } from "react-router";

//Internal Imports
import TextBox  from "../components/textBoxes";
function SignUp() {
  return (
    <div className="flex flex-col items-center justify-center  h-screen w-100">
      
    
    <header>
       <h1 className="text-primary font-black text-xl">The Finance Bro Tool</h1>
    </header>
  
    <div className="flex  flex-col items-center justify-center w-[576px] p-4">
    
     <TextBox id="fName" label="First Name" placeholder="Salomé" type="text"/>
     <TextBox id="lName" label="Last Name" placeholder="Wate" type="text"/>
     <TextBox id="email" label="Email" placeholder="jsaul@gmail.com" type="email"/>
     <TextBox id="psw" label="Password" placeholder="****" type="password"/>
     
     <div className="flex flex-col items-center w-1/2 justify-center p-4 gap-2">
     <Link className="w-full" to="/income">
     <button className="bg-secondary   font-bold text-white w-full p-2 rounded-lg">Sign Up</button>
     </Link>
     <Link className="w-full" to="/login">
     <button className="bg-secondary   font-bold text-white w-full p-2 rounded-lg">Sign In</button>
     </Link>
     </div>
     </div>
 </div>
 
  );
}

export default SignUp;