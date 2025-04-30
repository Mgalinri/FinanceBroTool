//external import
import axios from "axios";
import Popup from 'reactjs-popup';

//internal import
import TextBox from "./textBoxes"
import { IncomeContext } from "../App";

//React import
import { useContext } from "react";

function IncomePopUp(){
    const {income, setIncome} = useContext(IncomeContext);
    const updateIncome = async (event) => {
        event.preventDefault();
        const income = event.target.income.value;
        await axios.post(process.env.REACT_APP_API_URL+"/api/financebrotool/updateincome", {
            'income': income,
        },{withCredentials: true})
        // Add your logic to handle the income value here
        // For example, you can send it to a server or update the state
        setIncome(income);
      }
return (<div className="flex flex-col rounded-lg bg-white w-full items-center justify-center ">
   
      <form method="post" onSubmit={updateIncome} className="flex  flex-col items-center justify-center  p-4">
  
      <div className="flex  flex-col items-center justify-center  p-4">
      <header className="p-4">
     <h1 className="text-primary text-center text-2xl font-black  mb-10 md:text-m">What is your monthly take-home pay?</h1>
  </header>
       <TextBox id_="income" name="income" label="" placeholder="2,500" type="text" required={true}/>
  
       <button type="submit" className="rounded h-10  text-white font-bold bg-secondary w-4/12">
         Submit
        </button>
       </div>
       </form>
       


</div>)
}
export default IncomePopUp;