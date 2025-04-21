//React Imports
import React from 'react';
import ReactDOM from 'react-dom/client';

//Internal Imports
import './index.css';
import Login from './pages/login';
import SignUp from './pages/signUp';
import Income from './pages/income';
import Percentages from './pages/percentages';
import ExpenseForm from './pages/addExpense';
import Dashboard from './pages/dashboard';
import Page404 from './pages/404';
import ExpenseTable from './pages/expenses';


//External Imports
import {  createBrowserRouter, RouterProvider } from "react-router";

let router = createBrowserRouter([
 
  {
    path:"/",
    errorElement: <Page404 />,
    children: [
      {path: '', element: <Login /> },
      {path: 'login', element: <Login /> },
      {path: 'signUp', element: <SignUp /> },
      {path: 'dashboard', element: <Dashboard /> },
      {path: 'income', element: <Income /> },
      {path: 'percentages', element: <Percentages /> },
      {path: 'addExpense', element: <ExpenseForm /> },
      {path: 'expenseTable', element: <ExpenseTable />}
    ],
   

  },
 
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <RouterProvider router={router}/>
</React.StrictMode>
);

