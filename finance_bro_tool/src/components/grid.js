import React from "react";

function Grid() {
  const categories = {
    needs: ["Essential Needs", "bg-primary"],
    savings: ["Savings", "bg-secondary"],
    wants: ["Splurges/Wants", "bg-primary"],
  };

  const validateInput = (event) => {
    const box_id = event.target.id;
    const box_value = event.target.value;
    const box = document.getElementById(box_id);
    if (box_value > 100 || box_value < 0) {
      box.classList.add("border-red-600");
      box.classList.add("focus:border-red-600")
      box.classList.add("focus:ring-2")
      box.classList.add("focus:ring-red-600")
    } else {
      box.classList.remove("border-red-600");
      box.classList.remove("focus:border-red-600")
      box.classList.remove("focus:ring-2")
      box.classList.remove("focus:ring-red-600")
    }
  };

  return (
    <div className="grid grid-cols-2 w-inherit gap-y-4">
      {Object.entries(categories).map(([key, value]) => (
        <React.Fragment key={key}>
          <label
            className={`text-white h-16 font-bold pl-8 border-black rounded-l-lg border-solid   flex justify-start items-center ${value[1]} p-4`}
          >
            {value[0]}
          </label>
          <input
            onChange={validateInput}
            type="number"
            id={key}
            name={key}
            placeholder="Enter % as int"
            min="0"
            max="100"
            required
            className="  border-l-0 border-r-2 border-t-2 border-b-2 p-1    w-full"
          />
        </React.Fragment>
      ))}
    </div>
  );
}

export default Grid;
