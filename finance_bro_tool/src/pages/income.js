//React Imports
import { useNavigate } from "react-router-dom";

//Internal Imports
import TextBox  from "../components/textBoxes";

function Income() {

  const navigate = useNavigate();

  const email = localStorage.getItem("storedEmail");
  console.log("email:" + email);
  
  async function fetchAdd(info){
    const response = await fetch(process.env.REACT_APP_API_URL+"/api/financebrotool/setincome", {
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
     console.log(form);
     const body = JSON.stringify({
      "email": email,
      "income": parseInt(form.income.value),
     })
     //Handles the form information as formData
    
     fetchAdd(body)
     .then((response) => {
       if (response.status === 200) {
        // Change were is being redirected
         alert("Income Added");
         navigate("/percentages");
       } else {
         alert("Income Failed to Add");
       }
     })
    
  }

  return (
    <div className="flex flex-col items-center justify-center  h-screen w-100">
      
    <div className="w-1/2 flex flex-col  items-center justify-center ">
    <header>
       <h1 className="text-primary font-black text-xl">The Finance Bro Tool</h1>
    </header>

    <form method="post" onSubmit={handleSubmit} className="flex  flex-col items-center justify-center w-[576px] p-4">

    <div className="flex  flex-col items-center justify-center w-[576px] p-4">

     <TextBox id_="income" name="income" label="What is your monthly take-home pay?" placeholder="2,500" type="text"/>

     <button type="submit" className="bg-secondary   font-bold text-white w-full p-2 rounded-lg">Next</button>
     </div>
     </form>
     </div>
 </div>
 
  );
}

export default Income;