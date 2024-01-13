import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthContext } from "./Context/AuthContext";
import { Home } from "./Pages/Home";
import { Hotel } from "./Pages/Hotel";
import { DetailsHotel } from "./Pages/DetailsHotel";
import { Register } from "./Components/Register/Register";
import { Login } from "./Components/Login/Login";
import { Order } from "./Components/Order/Order";
import { Contact } from "./Components/Contact/Contact";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signup",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/hotel",
    element: <Hotel />,
  },
  {
    path: "/order",
    element: <Order />,
  },
  {
    path: "/:id",
    element: <DetailsHotel />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
]);
export const App = () => {
  return (
    <AuthContext>
      <RouterProvider router={router} />
    </AuthContext>
  );
};
