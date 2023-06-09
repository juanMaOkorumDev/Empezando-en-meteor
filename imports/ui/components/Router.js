import React from "react";
import { Routes, Route } from "react-router-dom";
import { ForgotPassword } from "../ForgotPassword";
import { Home } from "../Home";
import { NotFound } from "../NotFound";
import { ResetPassword } from "../ResetPassword";
import { RoutePaths } from "../RoutePaths";
import { SignUp } from "../SignUp";

export const Router = () => (
  <Routes>
    <Route path={RoutePaths.HOME} element={<Home />} />
    <Route path={RoutePaths.SIGN_UP} element={<SignUp />} />
    <Route path={RoutePaths.FORGOT_PASS} element={<ForgotPassword />} />
    <Route
      path={`${RoutePaths.RESET_PASSWORD}/:token`}
      element={<ResetPassword />}
    />
    <Route path="*" element={<NotFound />} />
  </Routes>
);
