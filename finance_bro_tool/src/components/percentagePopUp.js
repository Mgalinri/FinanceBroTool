//React Imports
import { useNavigate } from "react-router-dom";

//Internal Imports
import Grid from "../components/grid";


//To-Do: Add functionality to the settings, they must allow for a change in the percentage

function PercentagePopUp(){
const navigate = useNavigate();

/*

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




 function handleSubmit(e) {
  e.preventDefault();

  const form = e.target;

  const needs = parseInt(form.needs.value);
  const savings = parseInt(form.savings.value);
  const wants = parseInt(form.wants.value);
   
  const total = needs + savings + wants;

  // Validate total
  if (total !== 100) {
    const alert_element = document.getElementById("alert")
    let alert_text = "The total of needs, savings, and wants must add up to 100%"
    alert_element.innerHTML=alert_text
    return;
  }

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
      alert("Percentages Added successfully");
    } else {
      alert("Percentages Failed to Add");
    }
  });
}
  */
return (

  <div className="flex flex-col rounded-lg bg-white w-full items-center justify-center ">
  <form method="post"  className="flex  flex-col items-center justify-center  p-4">

  <div className="w-full flex flex-col  items-center
   ">
  <header className="p-4">
     <h1 className="text-primary text-center text-2xl font-black  mb-10 md:text-m">What Percentage Do You Want to Assign into the Following?</h1>
  </header>
  
 <Grid />
  <p id="alert" className="text-red-600 pt-4 font-bold"></p>
  <button type="submit" className="rounded h-10  text-white font-bold bg-secondary w-4/12">
         Submit
        </button>
  </div>
  </form>

</div>

)}

export default PercentagePopUp;