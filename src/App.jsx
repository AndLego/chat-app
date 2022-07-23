import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {MainProvider} from "./context/MainContext"

import { Home } from "./components/Home";
import { Chat } from "./components/Chat";

import "./styles/pages/App.css";

const App = () => {
  return (
    <MainProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/chat/:id" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </MainProvider>
  );
};

export { App };
