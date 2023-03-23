import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "../Home";
import { NotFound } from "../NotFound";
import { RoutePaths } from "../RoutePaths";
import { SignUp } from "../SignUp";

export const Router = () => (
  <Routes>
    <Route path={RoutePaths.HOME} element={<Home />} />
    <Route path={RoutePaths.SIGN_UP} element={<SignUp />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);
