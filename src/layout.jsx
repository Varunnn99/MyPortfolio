import Navbar from "./Pages/Home/Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />  {/* 👈 This will render Home, Login, or any other pages */}
      </main>
    </div>
  );
};

export default Layout;
