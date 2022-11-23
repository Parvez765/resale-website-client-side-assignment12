import Blog from "../Pages/Blog/Blog";
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
                path: "/signup", element: <Signup></Signup>
            }
        ]
    }
])