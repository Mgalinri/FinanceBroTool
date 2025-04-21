// External Imports
import { Link } from "react-router-dom";
import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

// Internal Imports
import MenuBar from "../components/menuBar";
import Add from "../components/add";

// Sample percentages
const essentialProgress = 60;
const savingsProgress = 40;
const splurgesProgress = 30;

function Dashboard() {
  return (
    <div className="flex flex-row h-screen gap-4">
      <MenuBar />
      <Add />

      <div className="flex flex-1 flex-row gap-6 p-4 overflow-x-auto">
        {/* Essential Needs Column */}
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
              <tr className="border-b border-gray-200">
                <td>Walmart - $200</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td>Gas Station - $50</td>
              </tr>
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
              <tr className="border-b border-gray-200">
                <td>Emergency Fund - $100</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td>Investments - $150</td>
              </tr>
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
              <tr className="border-b border-gray-200">
                <td>Starbucks - $15</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td>Amazon - $75</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
