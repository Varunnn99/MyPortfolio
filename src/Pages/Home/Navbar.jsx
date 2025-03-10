import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [navActive, setNavActive] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token")); // ✅ Track login state
  const navigate = useNavigate();

  const toggleNav = () => {
    setNavActive(!navActive);
  };

  const closeMenu = () => {
    setNavActive(false);
  };

  // ✅ Check login status on every render (fixes missing logout issue)
  useEffect(() => {
    const checkLoginStatus = () => {
      setIsLoggedIn(!!localStorage.getItem("token")); // ✅ Update login state dynamically
    };

    checkLoginStatus(); // Check on mount

    window.addEventListener("storage", checkLoginStatus); // Listen for token changes
    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    setIsLoggedIn(false); // Update state
    navigate("/"); // Redirect to home
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 500) {
        closeMenu();
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (window.innerWidth <= 1200) {
      closeMenu();
    }
  }, []);

  return (
    <nav className={`navbar ${navActive ? "active" : ""}`}>
      <div>
        <img src="./img/logo.svg" alt="Logoipsum" width={350} height={50} />
      </div>
      <a className={`nav__hamburger ${navActive ? "active" : ""}`} onClick={toggleNav}>
        <span className="nav__hamburger__line"></span>
        <span className="nav__hamburger__line"></span>
        <span className="nav__hamburger__line"></span>
      </a>
      <div className={`navbar--items ${navActive ? "active" : ""}`}>
        <ul>
          <li><Link onClick={closeMenu} to="heroSection" smooth duration={500} className="navbar--content">Home</Link></li>
          <li><Link onClick={closeMenu} to="MyPortfolio" smooth duration={500} className="navbar--content">Portfolio</Link></li>
          <li><Link onClick={closeMenu} to="AboutMe" smooth duration={500} className="navbar--content">About Me</Link></li>
          <li><Link onClick={closeMenu} to="Testimonials" smooth duration={500} className="navbar--content">Testimonials</Link></li>
        </ul>
      </div>
      <div className="navbar-buttons">
        <Link onClick={closeMenu} to="Contact" smooth duration={500} className="btn btn-outline-primary">Contact Me</Link>

        {/* ✅ Show Login or Logout button dynamically */}
        {isLoggedIn ? (
          <button onClick={handleLogout} className="btn btn-outline-danger">Logout</button>
        ) : (
          <button onClick={() => navigate("/login")} className="btn btn-outline-primary">Login</button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
