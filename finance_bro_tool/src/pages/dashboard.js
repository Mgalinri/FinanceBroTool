//External Imports
import { Link } from "react-router-dom";


//Internal Imports
import MenuBar from "../components/menuBar";
import Add from "../components/add";
function Dashboard() {
  return (
  
    <div className="flex flex-row items-center h-screen  gap-4 ">
        <MenuBar/>
        <Add />
      
     
    </div>
  );
}

export default Dashboard;
