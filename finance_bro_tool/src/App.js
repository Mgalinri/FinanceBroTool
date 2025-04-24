//Internal Imports
import Login from './pages/login';
import SignUp from './pages/signUp';
import Income from './pages/income';
import Percentages from './pages/percentages';
import Dashboard from './pages/dashboard';
import Page404 from './pages/404';
import ExpenseTable from './pages/expenses';
import ProtectedRoute from './components/protectedRoute';
import {createContext } from 'react';


//External Imports
import {  createBrowserRouter, RouterProvider } from "react-router";
import { useState } from 'react';


export const AuthContext = createContext();
function App() {
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  let router = createBrowserRouter([
    {
      path:"/",
    
      errorElement: <Page404 />,
      children: [
        {path: '', element: <Login /> },
        {path: 'signUp', element: <SignUp /> },
        {path: 'dashboard', element:<ProtectedRoute><Dashboard /></ProtectedRoute> },
        {path: 'income', element: <Income />},
        {path: 'percentages', element: <Percentages /> },
        {path: 'expenseTable', element: <ProtectedRoute><ExpenseTable /></ProtectedRoute>}
      ],
     
  
    },
   
  ])
  return (   
    <AuthContext.Provider value={{isAuthenticated,setIsAuthenticated}}>
      {/* Wrap your application with the AuthProvider */}
      <RouterProvider router={router}/>
   </AuthContext.Provider>
  );
}

export default App;
