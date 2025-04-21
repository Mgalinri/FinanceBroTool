import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-6">
      <h1 className="text-primary font-black text-xl">The Finance Bro Tool</h1>

      <Link
        to="/addExpense"
        className="bg-secondary text-white font-bold px-4 py-2 rounded-lg"
      >
        Add an Expense
      </Link>
    </div>
  );
}

export default Dashboard;
