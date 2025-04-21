//React Imports
import { useNavigate } from "react-router-dom";

//External Imports
import { jwtDecode } from "jwt-decode";

//Internal Imports
import TextBox  from "../components/textBoxes";

const categories = ["Essential Needs","Savings","Splurges/Wants"];

function ExpenseForm() {
  const navigate = useNavigate();

  async function fetchAdd(info) {
    const response = await fetch(process.env.REACT_APP_API_URL + "/api/financebrotool/addexpense", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: info,
    });
    return Promise.resolve(response);
  }

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

    const body = JSON.stringify({
      "userid": decoded.email,
      "category": form.categories.value,
      "description": form.description.value,
      "amount": parseInt(form.amount.value),
    });

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
    <div className="flex flex-col items-center justify-center h-screen w-100">
      <header>
        <h1 className="text-primary font-black text-xl">Add Expense</h1>
      </header>

      <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center w-1/2 p-4">
        <label className="text-secondary font-bold self-start" htmlFor="categories"></label>
        <select id="categories" name="categories" className="border w-full border-gray-300 p-2 rounded-lg">
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <TextBox id_="description" name="description" label="Description" placeholder="Walmart" type="text" />
        <TextBox id_="amount" name="amount" label="Amount" placeholder="120" type="number" />

        <button type="submit" className="rounded h-10 text-white font-bold bg-secondary w-1/4">
          Add Expense
        </button>
      </form>
    </div>
  );
}

export default ExpenseForm;
