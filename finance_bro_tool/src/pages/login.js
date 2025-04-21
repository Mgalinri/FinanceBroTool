//React Imports
import { useNavigate } from "react-router-dom";

//External Imports
import {Link } from "react-router";

//Internal Imports
import TextBox  from "../components/textBoxes";

//React Imports



function Login() {
  const navigate = useNavigate();

  async function fetchLogin(info){
   const response = await fetch(process.env.REACT_APP_API_URL+"/token", {
      method: "POST",
      body: info,
    });
    return Promise.resolve(response);
  }

  function prepareFormData(e){
    /*Prepares the data before being sent to the api*/
    const form = e.target;
    const formData = new FormData();
    //Handles the form information as formData
    formData.append("grant_type","password")
    formData.append("username", form.username.value);
    formData.append("password", form.password.value);
    return formData
  }

  function handleSubmit(e){
    /*Handles the response to submitting the login */
    // Prevent the browser from reloading the page
    e.preventDefault();
   
     // Read the form data
    const formData = prepareFormData(e)

     fetchLogin(formData)
     .then((response) => response.json())
     .then((data) => {
       if (data.access_token) {
         localStorage.setItem("token", data.access_token);
         alert("Login successful");
         navigate("/dashboard");
       } else {
         alert("Login failed");
       }
     })
     .catch((error) => {
       console.error("Login error:", error);
       alert("Login failed");
     });
    
  }
  
  return (
    <div className="flex flex-col items-center justify-center  h-screen w-100">
    <header>
       <h1 className="text-primary font-black text-xl">The Finance Bro Tool</h1>
    </header>
  
    <form method="post" onSubmit={handleSubmit} className="flex  flex-col items-center justify-center w-[576px] p-4">

   
     <TextBox id_="username" label="username" placeholder="jsaul@gmail.com" type="text"/>
     <TextBox id_="password" label="password" placeholder="****" type="password"/>
     
     <div className="flex flex-col items-center w-1/2 justify-center p-4 gap-2">
     <Link className="w-full" to="/dashboard">
     <button className="bg-secondary font-bold  text-white w-full p-2 rounded-lg" type="submit">Sign In</button>
     </Link>
        
     <Link className="w-full" to="/signUp">
     <button  className="bg-secondary   font-bold text-white w-full p-2 rounded-lg">Sign Up</button>
     </Link>
     </div>
     </form>
 </div>
 
  );
}

export default Login;