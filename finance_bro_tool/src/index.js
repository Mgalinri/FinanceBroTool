//React Imports
import React from 'react';
import ReactDOM from 'react-dom/client';
import { useState } from 'react';
//Internal Imports
import './index.css';
import Login from './pages/login';
import SignUp from './pages/signUp';
import Income from './pages/income';
import Percentages from './pages/percentages';
import Dashboard from './pages/dashboard';
import Page404 from './pages/404';
import ExpenseTable from './pages/expenses';
import ProtectedRoute from './components/protectedRoute';
import AuthProvider from './components/authContextProvider';
//External Imports
import {  createBrowserRouter, RouterProvider } from "react-router";
import { AuthContext } from './authContext';

let router = createBrowserRouter([
 
  {
    path:"/",
  
    errorElement: <Page404 />,
    children: [
      {path: '', element: <Login /> },
      {path: 'signUp', element: <SignUp /> },
      {path: 'dashboard', element: <ProtectedRoute><Dashboard /></ProtectedRoute> },
      {path: 'income', element: <ProtectedRoute><Income /></ProtectedRoute> },
      {path: 'percentages', element: <ProtectedRoute><Percentages /></ProtectedRoute> },
      {path: 'expenseTable', element: <ProtectedRoute><ExpenseTable /></ProtectedRoute>}
    ],
   

  },
 
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

  
  <RouterProvider router={router}/>
 
</React.StrictMode>
);

