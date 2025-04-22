//React Imports
import { useNavigate } from "react-router-dom";

//External Imports
import {  Link } from "react-router";

//Internal Imports
import TextBox  from "../components/textBoxes";
//Add SignUp
function SignUp() {
  const navigate = useNavigate();
  
  async function fetchAdd(info){
    const response = await fetch(process.env.REACT_APP_API_URL+"/api/financebrotool/createaccount", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: info,
     });
     return Promise.resolve(response);
   }
   function handleSubmit(e){
    // Prevent the browser from reloading the page
    e.preventDefault();
   
     // Read the form data
     const form = e.target;
     const body = JSON.stringify({
      "first_name": form.fName.value,
      "last_name": form.lName.value,
      "email": form.email.value,
      "password": form.psw.value,
     })
     //Handles the form information as formData
    
     fetchAdd(body)
     .then((response) => {
       if (response.status === 200) {
        // Change were is being redirected
         alert("Sign Up successful");
         localStorage.setItem("storedEmail", form.email.value);
         navigate("/income");
       } else {
         alert("Sign Up  failed");
       }
     })
    
  }
  
  return (
    <div className="flex flex-col items-center justify-center  h-screen w-100">
      
    
    <header>
       <h1 className="text-primary font-black text-xl">The Finance Bro Tool</h1>
    </header>
  
    <form method="post" onSubmit={handleSubmit} className="flex  flex-col items-center justify-center w-[576px] p-4">
    
     <TextBox id_="fName" label="First Name" placeholder="Salomé" type="text"/>
     <TextBox id_="lName" label="Last Name" placeholder="Wate" type="text"/>
     <TextBox id_="email" label="Email" placeholder="jsaul@gmail.com" type="email"/>
     <TextBox id_="psw" label="Password" placeholder="****" type="password"/>
    
     <div className="flex flex-col items-center w-1/2 justify-center p-4 gap-2">
     <button type="submit" className="bg-secondary   font-bold text-white w-full p-2 rounded-lg">Sign Up</button>
    
     <Link className="w-full" to="/login">
     <button className="bg-secondary   font-bold text-white w-full p-2 rounded-lg">Sign In</button>
     </Link>
     </div>
     </form>
     
    
 </div>
 
  );
}

export default SignUp;