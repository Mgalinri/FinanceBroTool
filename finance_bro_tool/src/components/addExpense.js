//React Imports
import { useNavigate } from "react-router-dom";

//External Imports
import { jwtDecode } from "jwt-decode";
import axios from "axios";

//Internal Imports

const categories = ["Essential Needs","Savings","Splurges/Wants"];

function ExpenseForm() {
  const navigate = useNavigate();
 
  async function fetchAdd(info){
    console.log("Sending data:", info);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/financebrotool/addexpense`, info ,{
          withCredentials: true,
        }
      );
      return Promise.resolve(res);
    } catch (error) {
      console.error("Failed to Add expenses:", error);
    }
   
  };
  
  

  function handleSubmit(e) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    // Read the form data
    const form = e.target;
    const token = localStorage.getItem("token");

    if (!token) {
      alert("No token found");
      return;
    }

    const decoded = jwtDecode(token);

    console.log(decoded.email);

    console.log("Form data:", form);
    console.log("Category selected:", form.categories.value);
    console.log("Description entered:", form.description.value);
    console.log("Amount entered:", form.amount.value);

    const body = {
      "userid": "Hello",
      "category": form.categories.value,
      "description": form.description.value,
      "amount": parseInt(form.amount.value),
    }

    // Handle the form submission (add expense)
    fetchAdd(body)
      .then((response) => {
        if (response.status === 200) {
          alert("Expense Added");
          navigate("/dashboard");
        } else {
          alert("Failed to Add Expense");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred while adding the expense.");
      });
  }

  return (
    <div className="flex flex-col rounded-lg bg-primary  items-center justify-center ">
         <header>
        <h1 className="text-white font-black text-xl mt-4 ">Add Expense</h1>
      </header>
      <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center w-1/2 p-4">
        <label className="text-white font-bold self-start" htmlFor="categories"></label>
        <select id="categories" name="categories" className="border w-full border-gray-300 p-2 rounded-lg">
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <label
        className=" text-white font-bold self-start pt-4"
        htmlFor="description"
      >
        Description
      </label>
      <input
      required
        type="text"
        name="description"
        id="description"
        placeholder="Walmart"
        className="border w-full  border-gray-300 p-2 rounded-lg"
      />
         <label
        className=" text-white font-bold self-start pt-4 "
        htmlFor="amount"
      >
        Amount
      </label>
      <input
      required
        type="number"
        name="amount"
        id="amount"
        placeholder="1599.99"
        className="border w-full  border-gray-300 mb-4 rounded-lg"
      />
       

        <button type="submit" className="rounded h-10  text-white font-bold bg-secondary w-10/12">
          Add Expense
        </button>
      </form>
      </div>
    
  );
}

export default ExpenseForm;
