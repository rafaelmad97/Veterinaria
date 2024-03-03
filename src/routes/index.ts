import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LoginPage from "../pages/login";
const router = createBrowserRouter([
  {
    path: "/",
    Component: LoginPage,
  },
]);

export default router;
