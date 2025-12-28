import logo from "../assets/logo.png";
import "./Header.css";

export default function Header() {
  return (
    <header className="app-header">
      <img src={logo} alt="Logo" className="app-logo" />
    </header>
  );
}