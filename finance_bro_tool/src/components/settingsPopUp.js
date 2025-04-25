//React Imports

//External Imports
import Popup from "reactjs-popup";
import SettingsIcon from "@mui/icons-material/Settings";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

//Internal Imports
import PercentagePopUp from "./percentagePopUp";
import IncomePopUp from "./incomePopUp";

//To-Do: Add functionality to the settings, they must allow for a change in the percentage
//To-Do: Add functionality to the settings, they must allow for a change in the income
function SettingsPopUp() {
  const contentStyle = { background: "transparent", border: "none" };
  const overlayStyle = { background: "rgba(0,0,0,0.5)" };

  const menuReturn = (event) => {
    const obtain_div = event.target.parentElement.parentElement;
    obtain_div.style.display = "none";
    document.getElementById("buttons").style.display = "flex";
  };

  const handlePercentageUpdate = () => {
    document.getElementById("buttons").style.display = "none";
    document.getElementById("percentagePopUp").style.display = "block";
  };
  const handleIncomeUpdate = () => {
    document.getElementById("buttons").style.display = "none";
    document.getElementById("incomePopUp").style.display = "block";
  };

  return (
    <Popup
      trigger={<SettingsIcon fontSize="large" />}
      modal
      nested
      position="right center"
      {...{ contentStyle, overlayStyle }}
    >
      <div
        id="buttons"
        className="flex flex-col rounded-lg bg-primary w-full gap-4 p-4 items-center justify-center "
      >
        <button
          type="submit"
          className="rounded h-10  text-white font-bold bg-secondary w-6/12"
          onClick={handleIncomeUpdate}
        >
          Update Income
        </button>
        <button
          type="submit"
          className="rounded h-10  text-white font-bold bg-secondary w-6/12"
          onClick={handlePercentageUpdate}
        >
          Update Percentages
        </button>
      </div>
      <div id="percentagePopUp" style={{ display: "none" }}>
        <button onClick={menuReturn}>
          <ArrowBackIcon className="text-primary m-4 absolute" />
        </button>
        <PercentagePopUp />
      </div>
      <div id="incomePopUp" style={{ display: "none" }}>
        <button onClick={menuReturn}>
          <ArrowBackIcon className="text-primary m-4 absolute" />
        </button>
        <IncomePopUp />
      </div>
    </Popup>
  );
}

export default SettingsPopUp;
