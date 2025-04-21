//External imports
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { Link } from "react-router";

//Internal Imports
import MenuBar from "../components/menuBar";
import AddForm from "../components/addForm";

function Add(){
return(
    <div className='absolute top-0 right-0 p-4'>
    {/* <Popup
                  trigger={ <AddCircleIcon fontSize='large' className="text-primary  hover:text-primary cursor-pointer" />}
                  modal
                  nested
                  position="right center"
                >
                  <AddForm/>
                  
                </Popup> */}

                {/* Temporary route until popup works */}
                <Link className="w-full" to="/addExpense">
                <AddCircleIcon fontSize='large' className="text-primary  hover:text-primary cursor-pointer" />
                </Link>
    </div>
)
}
export default Add;