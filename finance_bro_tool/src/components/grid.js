function Grid(){
   const categories = {"item 1": ["Housing","bg-primary"],
                       "item 2": ["Schooling","bg-secondary"],
                       "item 3": ["Transportation", "bg-primary"],
                       "item 4": ["Healthcare","bg-secondary"],
                       "item 5": ["Entertainment","bg-primary"],
                       "item 6" : ["Miscellaneous","bg-primary"]}
   
   
   return (
   
      <div class="grid grid-cols-2 w-full">
            {
       Object.entries(categories).map(([key,value])=>(
        
          <>
        <div key={key} className="  text-white h-16 font-bold pl-8 border-black border-t-2 border-l-2 bg-primary flex justify-start items-center">
            {value[0]}</div>
      
      <input  type="text">
      </input>
      </>
     ))}

      </div>
    
   )
}

export default Grid;