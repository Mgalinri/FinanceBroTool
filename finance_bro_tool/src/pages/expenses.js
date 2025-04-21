//React Imports
import { useNavigate } from "react-router-dom";

//External imports
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";


//Internal Imports
import MenuBar from "../components/menuBar";
import Add from "../components/add";
import AddForm from "../components/addForm";

function ExpenseTable() {
  return (
    <div className="text-white h-screen w-full flex flex-row  items-center ">
      <MenuBar />
      <Add />
      <div className="relative   p-4  pr-6 pl-6 w-screen overflow-x-auto">
      
        <table className="border rounded-md border-primary table-auto w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-white uppercase bg-primary dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Apple MacBook Pro 17"
              </th>
              <td className="px-6 py-4">Silver</td>
              <td className="px-6 py-4">$2999</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Microsoft Surface Pro
              </th>
              <td className="px-6 py-4">White</td>
              <td className="px-6 py-4">$1999</td>
            </tr>
            <tr className="bg-white dark:bg-gray-800">
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Magic Mouse 2
              </th>
              <td className="px-6 py-4">Black</td>
              <td className="px-6 py-4">$99</td>
            </tr>
            <tr>
              <td
                colSpan={3}
                className="table-cell text-center bg-primary dark:bg-gray-800 dark:border-gray-700 border-gray-200"
              >
                <Popup
                  trigger={<button className="text-white"> +</button>}
                  modal
                  nested
                  position="right center"
                >
                  <AddForm/>
                </Popup>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
     
      </div>
    
  );
}

export default ExpenseTable;
