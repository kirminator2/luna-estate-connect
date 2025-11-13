import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Initialize theme
const savedTheme = localStorage.getItem("theme");
const root = document.documentElement;
if (savedTheme === "dark") {
  root.classList.add("dark");
} else {
  root.classList.remove("dark");
}

createRoot(document.getElementById("root")!).render(<App />);
