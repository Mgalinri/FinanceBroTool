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

//TODO: delete expenses
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
      <div className="relative   p-4  pr-6 pl-6 w-screen overflow-x-auto">
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
                <button onClick={()=>{deleteExpense(item._id)}}>{item.category}
                </button>
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
  );
}

export default ExpenseTable;
