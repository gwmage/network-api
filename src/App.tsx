import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from "react-router-dom";
import RootLayout from "./components/RootLayout";
import Error from "./components/Error";
import HomePage from "./routes/home/HomePage";
import Network from "./routes/network/Network";
import ForgotPassword from "./components/ForgotPassword";

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<RootLayout />} errorElement={<Error />} >
    <Route index element={<HomePage />} />
    <Route path="network" element={<Network />} />
    <Route path="forgot-password" element={<ForgotPassword />} />
  </Route>
));

export default function App() {
  return <RouterProvider router={router} />
}
