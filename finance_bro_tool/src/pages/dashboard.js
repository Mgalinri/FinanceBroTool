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

//TODO: delete expenses

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState(0);
  const [percentages, setPercentages] = useState({
    needs: 0,
    savings: 0,
    wants: 0
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No token found");
      return;
    }

    const email = jwtDecode(token).email;

    const fetchExpenses = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/financebrotool/getexpensesbyemail/${email}`
        );
        setExpenses(res.data);
      } catch (error) {
        console.error("Failed to fetch expenses:", error);
      }
    };

    const fetchPercentages = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/financebrotool/getpercentagesbyemail/${email}`
        );
        setPercentages(res.data);
      } catch (error) {
        console.error("Failed to fetch percentages:", error);
      }
    };

    const fetchIncome = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/financebrotool/getincomebyemail/${email}`
        );
        setIncome(res.data);
      } catch (error) {
        console.error("Failed to fetch percentages:", error);
      }
    };

    fetchExpenses();
    fetchPercentages();
    fetchIncome();
  }, []);

  // debugging log
  useEffect(() => {
    console.log("Updated expenses:", expenses);
  }, [expenses]);

  // debugging log
  useEffect(() => {
    console.log("Updated percentages:", percentages);
  }, [percentages]);

  // debugging log
  useEffect(() => {
    console.log("Updated income:", income);
  }, [income]);

  const essentialNeedsExpenses = expenses.filter((e) => e.category === "Essential Needs");
  const savingsExpenses = expenses.filter((e) => e.category === "Savings");
  const splurgesExpenses = expenses.filter((e) => e.category === "Splurges/Wants");

  // calculations for essential needs, savings, and wants
  // probably should clean this up and put into functions
  const essentialNeedsTotal = essentialNeedsExpenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );
  const essentialNeedsProgress = Math.round(100 - ((income * (percentages.needs / 100) - essentialNeedsTotal) / (income * (percentages.needs / 100))) * 100);

  const savingsTotal = savingsExpenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );
  const savingsProgress = Math.round(100 - ((income * (percentages.savings / 100) - savingsTotal) / (income * (percentages.savings / 100))) * 100);

  const splurgesTotal = splurgesExpenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );
  const splurgesProgress = Math.round(100 - ((income * (percentages.wants / 100) - splurgesTotal) / (income * (percentages.wants / 100))) * 100);
  
  return (
    <div className="flex flex-row h-screen gap-4">
      <MenuBar />
      <Add />

      <div className="flex flex-1 flex-row gap-6 p-4 overflow-x-auto">
        {/* EssentialNeeds Column */}
        <div className="flex-1 bg-white shadow-md rounded-lg border border-primary p-4 flex flex-col items-center">
          <div className="w-24 h-24 mb-4">
            <CircularProgressbar
              value={essentialNeedsProgress}
              text={`${essentialNeedsProgress}%`}
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