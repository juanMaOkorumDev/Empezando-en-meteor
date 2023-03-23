import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./components/Router";
import { Header } from "./Header";
import { Home } from "./Home";

export const App = () => (
  <BrowserRouter>
    <>
      <Header />
      <div className="min-h-full">
        <div className="max-w-4xl mx-auto p-2">
          <Router />
        </div>
      </div>
    </>
  </BrowserRouter>
);
