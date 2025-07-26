import { Home } from "lucide-react";
import Logo from "../../assets/GraphScript.png";
import "./style.css";

export function Navbar() {
  return (<>
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <img src={Logo} alt="GraphScript Logo" />
          <h1 className="navbar-title">GraphScript Docs</h1>
        </div>

        <a
          href="/"
          className="navbar-home"
        >
          <Home />
        </a>
      </div>
    </nav>
  </>);
}
