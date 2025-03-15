import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router";

function App() {
  return (
    <div className="flex flex-col items-center justify-center  h-screen w-100">
       <header>
          <h1 className="text-primary font-black">The Finance Bro Tool</h1>
       </header>
       <div className="flex  flex-col items-center justify-center w-[576px] p-4">
       <div className="flex flex-col items-center justify-center w-1/2 p-4">
        <label className=" text-secondary font-bold self-start" for="email">Email</label>
        <input type="text" id ="email" placeholder="hi@gmail.com" className="border w-full  border-gray-300 p-2 rounded-lg" />
        </div>
        <div className="flex flex-col items-center w-1/2 justify-center p-4">
        <label className="  text-secondary font-bold self-start" for="password">Password</label>
        <input type="text" id ="password" placeholder="******" className="border  w-full border-gray-300 p-2 rounded-lg" />
        </div>
        <div className="flex flex-col items-center w-1/2 justify-center p-4 gap-2">
        <button className="bg-secondary font-bold text-white w-full p-2 rounded-lg">Sign In</button>
        <button className="bg-secondary   font-bold text-white w-full p-2 rounded-lg">Sign Up</button>
        </div>
        </div>
    </div>
 
  );
}

export default App;