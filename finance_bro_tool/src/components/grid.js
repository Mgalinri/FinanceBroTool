import React from "react";

function Grid(){
   const categories = {
      needs: ["Essential Needs", "bg-primary"],
      savings: ["Savings", "bg-secondary"],
      wants: ["Splurges/Wants", "bg-primary"],
   };
   
   return (
      <div className="grid grid-cols-2 w-full gap-y-4">
         {Object.entries(categories).map(([key, value]) => (
         <React.Fragment key={key}>
            <label className={`text-white h-16 font-bold pl-8 border-black border-t-2 border-l-2 flex justify-start items-center ${value[1]}`}>
               {value[0]}
            </label>
            <input
               type="number"
               id={key}
               name={key}
               placeholder="Enter % as int"
               min="0"
               max="100"
               required
               className="border border-black p-2 rounded w-full"
            />
         </React.Fragment>
         ))}
      </div>
   );
}

export default Grid;