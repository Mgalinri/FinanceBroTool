//External Imports
import {  Link } from "react-router";




function Page404() {
    
  return (
    <div className="flex flex-col  items-center justify-center  h-screen w-100">
    <h1 className="text-primary font-black text-9xl mb-3">404</h1>
    <Link  to="/login">
    <button className="bg-secondary font-black p-4 rounded-lg text-white">Return to Homepage</button>
    </Link>
 </div>
 
  );
}

export default Page404;