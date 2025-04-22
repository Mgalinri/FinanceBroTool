// External Imports
import { Link } from "react-router-dom";
import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

// Internal Imports
import MenuBar from "../components/menuBar";
import Add from "../components/add";

// Sample percentages
const essentialProgress = 60;
const savingsProgress = 40;
const splurgesProgress = 30;

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  //const [email, setEmail] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("No token found");
      return;
    }
    const email = jwtDecode(token).email;
    const url = process.env.REACT_APP_API_URL+`/api/financebrotool/getexpensesbyemail/${email}`

    const fetchExpenses = async () => {
      try {
        const res = await axios.get(url);
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

  const essentialNeedsExpenses = expenses.filter((e) => e.category === "Essential Needs");
  const savingsExpenses = expenses.filter((e) => e.category === "Savings");
  const splurgesExpenses = expenses.filter((e) => e.category === "Splurges/Wants");

  return (
    <div className="flex flex-row h-screen gap-4">
      <MenuBar />
      <Add />

      <div className="flex flex-1 flex-row gap-6 p-4 overflow-x-auto">
        {/* EssentialNeeds Column */}
        <div className="flex-1 bg-white shadow-md rounded-lg border border-primary p-4 flex flex-col items-center">
          <div className="w-24 h-24 mb-4">
            <CircularProgressbar
              value={essentialProgress}
              text={`${essentialProgress}%`}
              styles={buildStyles({
                textColor: "#3B82F6",
                pathColor: "#3B82F6",
                trailColor: "#d6d6d6",
              })}
            />
          </div>
          <h2 className="text-xl font-semibold text-primary mb-4">Essential Needs</h2>
          <table className="w-full text-sm text-left text-gray-500">
            <tbody>
              {essentialNeedsExpenses.map((item, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td>{item.description} - ${item.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Savings Column */}
        <div className="flex-1 bg-white shadow-md rounded-lg border border-primary p-4 flex flex-col items-center">
          <div className="w-24 h-24 mb-4">
            <CircularProgressbar
              value={savingsProgress}
              text={`${savingsProgress}%`}
              styles={buildStyles({
                textColor: "#10B981",
                pathColor: "#10B981",
                trailColor: "#d6d6d6",
              })}
            />
          </div>
          <h2 className="text-xl font-semibold text-primary mb-4">Savings</h2>
          <table className="w-full text-sm text-left text-gray-500">
            <tbody>
              {savingsExpenses.map((item, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td>{item.description} - ${item.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Splurges/Wants Column */}
        <div className="flex-1 bg-white shadow-md rounded-lg border border-primary p-4 flex flex-col items-center">
          <div className="w-24 h-24 mb-4">
            <CircularProgressbar
              value={splurgesProgress}
              text={`${splurgesProgress}%`}
              styles={buildStyles({
                textColor: "#F59E0B",
                pathColor: "#F59E0B",
                trailColor: "#d6d6d6",
              })}
            />
          </div>
          <h2 className="text-xl font-semibold text-primary mb-4">Splurges / Wants</h2>
          <table className="w-full text-sm text-left text-gray-500">
            <tbody>
              {splurgesExpenses.map((item, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td>{item.description} - ${item.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;