//External Imports
import { Link } from "react-router-dom";


//Internal Imports
import MenuBar from "../components/menuBar";
import Add from "../components/add";


//To-do: Add a graph for Essential needs
// To-do: Add a graph for Savings
// To-do: Add a graph for Splurges/Wants
// To-do: Change the modal for react components
function Dashboard() {
  return (
  
    <div className="flex flex-row items-center h-screen  gap-4 ">
        <MenuBar/>
        <Add />
      
    
    </div>
  );
}

export default Dashboard;
