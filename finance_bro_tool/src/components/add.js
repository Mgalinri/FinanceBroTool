//External imports
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";


//Internal Imports

import AddExpense from "./addExpense";

function Add(){
  const contentStyle = { background: 'transparent', border:'none'};
const overlayStyle = { background: 'rgba(0,0,0,0.5)' };
return(
    <div className='absolute top-0 right-0 p-4'>
 
     <Popup
                  trigger={ <AddCircleIcon fontSize='large' className="text-primary  hover:text-primary cursor-pointer" />}
                  modal
                  nested
                  position="right center"
                  {...{contentStyle, overlayStyle }}
                >
                  <AddExpense/>
                  
                </Popup> 

                
    </div>
)
}
export default Add;