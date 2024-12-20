import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./configuration/Routing";

function App() {
  return <RouterProvider router={router} />;
}

export default App;
