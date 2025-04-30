//React Imports
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


//External imports
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import axios from "axios";

//Internal Imports
import MenuBar from "../components/menuBar";
import Add from "../components/add";
import SearchBar from "../components/searchBar";
import ExpenseForm from "../components/addExpense";

//TODO: Add Search Bar
//TODO: Add Filter by Category

//TODO: edit events
function ExpenseTable() {
  const contentStyle = { background: 'transparent', border:'none'};
  const overlayStyle = { background: 'rgba(0,0,0,0.5)' };
  const categories = ["Essential Needs","Savings","Splurges/Wants"];
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const navigate = useNavigate();
  //Delete Expense
  async function deleteExpense (id){
    try {
      const res = await axios.delete(
        process.env.REACT_APP_API_URL+`/api/financebrotool/deleteexpense/${id}`,{
          withCredentials: true,
      });
    
    } catch (error) {
      console.error("Failed to delete expense:", error);
    }
  };

  const deleteAll = async () => {
    try{
        const response = await axios.delete(process.env.REACT_APP_API_URL+`/api/financebrotool/deleteallExpenses`, {
            withCredentials: true,});
        if(response.status === 200){
            console.log("All entries deleted successfully");
            setExpenses([]); 
            setFilteredExpenses([]); // Clear the filtered expenses state after deletion
            // Clear the expenses state after deletion
             // Redirect to the expenses page or any other page
             navigate("/dashboard")
        }
    }
    catch(err){
        console.log(err);
    }}

const updateExpense =async (e)=> {
    e.preventDefault(); // Prevent the default form submission behavior
    await axios.post(process.env.REACT_APP_API_URL+`/api/financebrotool/updateexpense/`, {
      _id: e.target._id.value,
      category: e.target.categories.value,
      description: e.target.description.value,
      amount: parseFloat(e.target.amount.value),
    }
      ,{
        withCredentials: true,})
      navigate("/dashboard")}

  const handleSearch = (event) => {
    event.preventDefault(); 
    const searchTerm = event.target.search.value; // Access the search term from the input field
    if (searchTerm=="") {
      setFilteredExpenses(expenses) // If the search term is empty, show all expenses
    }
    else {
      console.log("search term", searchTerm)

      const filtered = expenses.filter((exp)=>{ return exp.description.toLowerCase().includes(searchTerm.toLowerCase())})
      setFilteredExpenses(filtered); 
  }}// Prevent the default form submission behavior 
  useEffect(() => {
    
    const url = process.env.REACT_APP_API_URL+`/api/financebrotool/getexpenses/`

    const fetchExpenses = async () => {
      try {
        const res = await axios.get(url,{
          withCredentials: true,
         
        });
        setExpenses(res.data);
        setFilteredExpenses(res.data); // Initialize filtered expenses with all expenses
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

      <SearchBar click={handleSearch} delete={deleteAll}/>
    
     
      <div className="relative  rounded-lg bg-primary p-1  mr-1 w-11/12 overflow-x-auto">
        <table className="border rounded-md border-primary table-auto w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-white uppercase bg-primary dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3" >
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
            {filteredExpenses.map((item) => (
              <tr id={item._id} key={item._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
              
              <td
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                <Popup
                  trigger={<button className="text-primary">{item.category}</button>}
                  modal
                  {...{contentStyle, overlayStyle }}>
                    
                     <div className="flex flex-col h-[366px] rounded-lg bg-primary  items-center justify-center ">
                     <form onSubmit={updateExpense} className="flex flex-col w-3/4 h-full items-center justify-center gap-2"> 
                  <h1 className="font-black text-white text-2xl">{item.description}</h1>
                  <input value={item._id} id="_id" name="_id" className="hidden"></input>
                  <label className="text-white font-bold " htmlFor="categories"></label>
        <select id="categories" name="categories" className="border w-full border-gray-300 p-2 rounded-lg">
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
                  <label className="text-white font-black ">Amount</label>
                  <input id="amount" name="amount"className="border w-full border-gray-300 p-2 rounded-lg" placeholder={item.amount}/>
                  <label className="text-white font-black">Description</label>
                  <input id="description" name="description" className="border w-full border-gray-300 p-2 rounded-lg" placeholder={item.description}/>
                  
                <div className="flex flex-row items-center justify-center gap-2 w-full mt-4">
                <button type="submit" className="rounded h-10  text-white font-bold bg-secondary w-4/12" >
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
                  <ExpenseForm/>
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
