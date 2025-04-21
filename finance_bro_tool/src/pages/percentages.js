//React Imports
import { useNavigate } from "react-router-dom";

//Internal Imports
import Grid from "../components/grid";


function Percentages() {
  const navigate = useNavigate();

  const email = localStorage.getItem("storedEmail");
  console.log("email:" + email);
  
  async function fetchAdd(info){
    const response = await fetch(process.env.REACT_APP_API_URL+"/api/financebrotool/setpercentages", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: info,
     });
     return Promise.resolve(response);
   }

   function alertText(total){
      //alert text element
    const alert_element = document.getElementById("alert")
    let alert_text = "The total of needs, savings, and wants must add up to 100%"
    // Validate total
    
    if (total !== 100) {
      alert_element.innerHTML=alert_text
      return;
    }
   }


   function handleSubmit(e) {
    e.preventDefault();
  
    const form = e.target;
  
    const needs = parseInt(form.needs.value);
    const savings = parseInt(form.savings.value);
    const wants = parseInt(form.wants.value);
     
    const total = needs + savings + wants;
    alertText(total)
    
  
    const body = JSON.stringify({
      email: email,
      percentages: {
        needs,
        savings,
        wants,
      },
    });
  
    fetchAdd(body).then((response) => {
      if (response.status === 200) {
        alert("Percentages Added");
        navigate("/dashboard");
      } else {
        alert("Percentages Failed to Add");
      }
    });
  }
    
  return (
    <div className="flex flex-col  items-center justify-center   h-screen w-100">
    <form method="post" onSubmit={handleSubmit} className="flex  flex-col items-center justify-center w-[576px] p-4">

    <div className="w-full flex flex-col  items-center
     ">
    <header>
       <h1 className="text-secondary text-2xl font-black  mb-10">What Percentage Do You Want to Assign into the Following?</h1>
    </header>
    
   <Grid />
    <p id="alert" className="text-red-600 pt-4 font-bold"></p>
    <button type="submit" className="bg-secondary font-black self-end  mt-6 w-1/3 rounded-r-3xl  h-12 text-white ">Complete</button>
    </div>
    </form>

 </div>
 
  );
}

export default Percentages;