//External imports
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';

import TableRowsIcon from '@mui/icons-material/TableRows';
import { Link } from 'react-router';

import "reactjs-popup/dist/index.css";
import { useNavigate } from 'react-router-dom';
import { useContext} from "react";

//Internal imports
import { AuthContext } from "../App";
import SettingsPopUp from './settingsPopUp';

//To-do: Add functionality to the settings, they must allow for a change in the percentage
function MenuBar() {
  const navigate = useNavigate();
  const {isAuthenticated,setIsAuthenticated} = useContext(AuthContext);
  
  //Function to handle logout

  async function fetchLogout(){
    const response = await fetch(process.env.REACT_APP_API_URL+"/logout", {
       method: "POST",
       credentials: "include",
     });
     return Promise.resolve(response);
   }
  const handleLogout = () => {
    fetchLogout().then((response) => {
    if (window.confirm("Are you sure you want to logout?") === true){
      setIsAuthenticated(false)
      navigate("/");
    }})
  };

 return (
 <div className="bg-primary text-white flex flex-col items-center justify-start h-full w-24 p-4 pt-6 pb-6">
   <Link to="/dashboard">
   <DashboardIcon fontSize='large'/>
   </Link>
   <Link to="/expenseTable">
   <TableRowsIcon fontSize='large'/>
   </Link>
   <button className="mt-auto mb-4" onClick={handleLogout}>
   <LogoutIcon fontSize='large'/>
   </button>

         <SettingsPopUp/>
   
 <button></button>

 </div>
 )
}
export default MenuBar;