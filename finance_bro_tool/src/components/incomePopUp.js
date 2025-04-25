//internal import
import TextBox from "./textBoxes";



function IncomePopUp(){
return (<div className="flex flex-col rounded-lg bg-white w-full items-center justify-center ">
   
      <form method="post"  className="flex  flex-col items-center justify-center  p-4">
  
      <div className="flex  flex-col items-center justify-center  p-4">
      <header className="p-4">
     <h1 className="text-primary text-center text-2xl font-black  mb-10 md:text-m">What is your monthly take-home pay?</h1>
  </header>
       <TextBox id_="income" name="income" label="" placeholder="2,500" type="text"/>
  
       <button type="submit" className="rounded h-10  text-white font-bold bg-secondary w-4/12">
         Submit
        </button>
       </div>
       </form>
       


</div>)
}
export default IncomePopUp;