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
import Page404 from './pages/404';
//External Imports
import {  createBrowserRouter, RouterProvider } from "react-router";
let router = createBrowserRouter([
 
  {
    path:"/",
    errorElement: <Page404 />,
    children: [
      {path: '', element: <Login /> },
      {path: 'signUp', element: <SignUp /> },
      {path: 'income', element: <Income /> },
      {path: 'expenseTable', element: <Table /> },
      {path: 'addExpense', element: <ExpenseForm /> },
    ],
   

  },
 
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <RouterProvider router={router}/>
</React.StrictMode>
);

