import { Outlet, useLocation } from "react-router-dom";
import "./App.css";
import MyNavbar from "./components/MyNavbar";

const App = () => {
  const location = useLocation();

  // Paths where the main navbar should be hidden
  const hideNavbarOnPaths = ['/dashboard', '/admin'];

  // Check if the current path starts with any of the paths to hide on
  const showNavbar = !hideNavbarOnPaths.some(path => location.pathname.startsWith(path));

  return (
    <>
      {showNavbar && <MyNavbar />}
      <Outlet />
    </>
  );
};

export default App;
