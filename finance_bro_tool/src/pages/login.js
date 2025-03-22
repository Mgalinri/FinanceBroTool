//External Imports
import {  Link } from "react-router";

//Internal Imports
import TextBox  from "../components/textBoxes";

//React Imports
import { useState } from "react";


function Login() {
 
  function handleSubmit(e){
    // Prevent the browser from reloading the page
    e.preventDefault();

     // Read the form data
     const form = e.target;
     const formData = new FormData(form);
     const formJson = Object.fromEntries(formData.entries());
     console.log(formJson);
    
  }
  
  return (
    <div className="flex flex-col items-center justify-center  h-screen w-100">
    <header>
       <h1 className="text-primary font-black text-xl">The Finance Bro Tool</h1>
    </header>
  
    <form method="post" onSubmit={handleSubmit} className="flex  flex-col items-center justify-center w-[576px] p-4">

   
     <TextBox id_="email" label="Email" placeholder="jsaul@gmail.com" type="email"/>
     <TextBox id_="psw" label="Password" placeholder="****" type="password"/>
     
     <div className="flex flex-col items-center w-1/2 justify-center p-4 gap-2">
     <button className="bg-secondary font-bold  text-white w-full p-2 rounded-lg" type="submit">Sign In</button>
        
     <Link className="w-full" to="/signUp">
     <button  className="bg-secondary   font-bold text-white w-full p-2 rounded-lg">Sign Up</button>
     </Link>
     </div>
     </form>
 </div>
 
  );
}

export default Login;