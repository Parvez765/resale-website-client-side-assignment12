import DashboardLayout from "../Layout/DashboardLayout";
import Blog from "../Pages/Blog/Blog";
import AddProduct from "../Pages/Dashboard/AddProduct/AddProduct";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Login from "../Pages/Login/Login";
import ProductDetails from "../Pages/ProductDetails/ProductDetails";
import Error from "../Shared/Error/Error";
import Signup from "../Signup/Signup";

const { createBrowserRouter } = require("react-router-dom");
const { default: Main } = require("../Layout/Main");
const { default: Home } = require("../Pages/Home/Home/Home");

export const router = createBrowserRouter([
    {
        path: "/", element: <Main></Main>, errorElement: <Error></Error>, children: [
            {
                path: "/", element: <Home></Home>
            },
            {
                path: "/blog", element: <Blog></Blog>
            },
            {
                path: "/login", element: <Login></Login>
            },
            {
                path: "/signup", element: <Signup></Signup>
            },
            {
                path: "/categories/:categoryId",
                loader: ({ params }) => {
                    return fetch(`http://localhost:5000/categories/${params.categoryId}`)
                },
                element: <ProductDetails></ProductDetails>
            }
        ]
    },
    {
        path: "/dashboard", element: <DashboardLayout></DashboardLayout>, children: [
            {
                path: "/dashboard", element: <Dashboard></Dashboard>
            },
            {
                path: "/dashboard/addproduct", element : <AddProduct></AddProduct>
            }
        ]
    }
])