//React Imports
import React from 'react';
import ReactDOM from 'react-dom/client';

//Internal Imports
import './index.css';
import Login from './pages/login';
import SignUp from './pages/signUp';
import Income from './pages/income';
import Table from './pages/expenseTable';
import ExpenseForm from './pages/addExpense';
//External Imports
import {  createBrowserRouter, RouterProvider } from "react-router";
let router = createBrowserRouter([
  {
    path:"/login",
    element: <Login />

  },
  {
    path:"/signUp",
    element: <SignUp />
    
  },
  {
    path:"/income",
    element: <Income />
    
  },
  {
    path:"/expenseTable",
    element: <Table />
    
  },
  {
    path:"/addExpense",
    element: <ExpenseForm />
    
  },
 
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <RouterProvider router={router}/>
</React.StrictMode>
);

