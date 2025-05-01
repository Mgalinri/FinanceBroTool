//Internal Imports
import Login from "./pages/login";
import SignUp from "./pages/signUp";
import Income from "./pages/income";
import Percentages from "./pages/percentages";
import Dashboard from "./pages/dashboard";
import Page404 from "./pages/404";
import ExpenseTable from "./pages/expenses";
import ProtectedRoute from "./components/protectedRoute";
import { createContext } from "react";

//External Imports
import { createBrowserRouter, RouterProvider } from "react-router";
import { useState } from "react";
import { ToastContainer } from "react-toastify";

export const AuthContext = createContext();
export const IncomeContext = createContext();
export const PercentagesContext = createContext();

//Clean up the code either by making a single app provider or uniting the Income and percentages context
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [income, setIncome] = useState(0);
  const [percentages, setPercentages] = useState({
    needs: 0,
    savings: 0,
    wants: 0,
  });

  let router = createBrowserRouter([
    {
      path: "/",

      errorElement: <Page404 />,
      children: [
        { path: "", element: <Login /> },
        { path: "signUp", element: <SignUp /> },
        {
          path: "dashboard",
          element: (
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          ),
        },
        { path: "income", element: <Income /> },
        { path: "percentages", element: <Percentages /> },
        {
          path: "expenseTable",
          element: (
            <ProtectedRoute>
              <ExpenseTable />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);
  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <IncomeContext.Provider value={{ income, setIncome }}>
        <PercentagesContext.Provider value={{ percentages, setPercentages }}>
          {/* Wrap your application with the AuthProvider */}
          <ToastContainer />
          <RouterProvider router={router} />
        </PercentagesContext.Provider>
      </IncomeContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
