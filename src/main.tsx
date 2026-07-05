import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./globals.css";
import { Landing } from "./landing";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Landing />
  </StrictMode>,
);
