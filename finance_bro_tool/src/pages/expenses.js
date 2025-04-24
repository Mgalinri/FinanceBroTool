//React Imports
import { useEffect, useState } from "react";


//External imports
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import axios from "axios";

//Internal Imports
import MenuBar from "../components/menuBar";
import Add from "../components/add";
import AddForm from "../components/addExpense";

//TODO: Add Search Bar
//TODO: edit events
function ExpenseTable() {
  const contentStyle = { background: 'transparent', border:'none'};
  const overlayStyle = { background: 'rgba(0,0,0,0.5)' };
  const [expenses, setExpenses] = useState([]);

  //Delete Expense
  async function deleteExpense (id){
    try {
      const res = await axios.delete(
        process.env.REACT_APP_API_URL+`/api/financebrotool/deleteexpense/${id}`,{
          withCredentials: true,
      });
      console.log(res.data);
    } catch (error) {
      console.error("Failed to delete expense:", error);
    }
  };
 
  useEffect(() => {
    
    const url = process.env.REACT_APP_API_URL+`/api/financebrotool/getexpenses/`

    const fetchExpenses = async () => {
      try {
        const res = await axios.get(url,{
          withCredentials: true,
         
        });
        setExpenses(res.data);
      } catch (error) {
        console.error("Failed to fetch expenses:", error);
      }
    };

    fetchExpenses();
  }, []);

  // debugging log
  useEffect(() => {
    console.log("Updated expenses:", expenses);
  }, [expenses]);

  return (
    <div className="text-white h-screen w-full flex flex-row  items-center ">
      <MenuBar />
      <Add />
      <div className="w-full flex flex-col items-center justify-center h-full ">
      <input className="rounded-lg border-s-primary h-9 border-6 mr-1 w-11/12  mb-6 bg-green-300 border-3"/>
    
     
      <div className="relative  rounded-lg bg-primary p-1  mr-1 w-11/12 overflow-x-auto">
        <table className="border rounded-md border-primary table-auto w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-white uppercase bg-primary dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((item) => (
              <tr id={item._id}className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
              
              <td
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                <Popup
                  trigger={<button className="text-primary">{item.category}</button>}
                  modal
                  {...{contentStyle, overlayStyle }}>
                    
                     <div className="flex flex-col h-[366px] rounded-lg bg-primary  items-center justify-center ">
                     <form className="flex flex-col w-3/4 h-full items-center justify-center gap-2"> 
                  <h1 className="font-black text-white text-2xl">{item.description}</h1>
                  <label className="text-white text-left font-semibold">Category</label>
                  <input placeholder={item.category}/>
                  <label className="text-white self-start ">Amount</label>
                  <input placeholder={item.amount}/>
                  <label className="text-white">Description</label>
                  <input placeholder={item.description}/>
                  
                <div className="flex flex-row items-center justify-center gap-2 w-full mt-4">
                <button type="submit" className="rounded h-10  text-white font-bold bg-secondary w-4/12" onClick={()=>{deleteExpense(item._id)}}>
                Update</button>
                <button className="rounded h-10  text-white font-bold bg-red-600 w-4/12" onClick={()=>{deleteExpense(item._id)}}>
                Delete </button>
               
                </div>
                </form>
                </div>
                </Popup>
              </td>
              <td className="px-6 py-4">{item.description}</td>
              <td className="px-6 py-4">{item.amount}</td>
            
              </tr>
             
              ))}
            <tr>
              <td
                colSpan={3}
                className="table-cell text-center bg-primary dark:bg-gray-800 dark:border-gray-700 border-gray-200"
              >
                <Popup
                  trigger={<button className="text-white">+</button>}
                  modal
                  nested
                  position="right center"
                  {...{contentStyle, overlayStyle }}
                >
                  <AddForm/>
                </Popup>
              </td>
            </tr>
          </tbody>
        </table>
        </div>
      </div>
      
    </div>
  );
}

export default ExpenseTable;
