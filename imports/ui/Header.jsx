import React from "react";
import { useNavigate } from "react-router-dom";
import { RoutePaths } from "./RoutePaths";
import { useLoggedUser } from "meteor/quave:logged-user-react";
// @ts-ignore
import { Meteor } from "meteor/meteor";

export const Header = () => {
  const navigate = useNavigate();
  const { loggedUser, isLoadingLoggedUser } = useLoggedUser();
  return (
    <header className="bg-indigo-600">
      <nav className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="w-full py-6 flex items-center justify-between border-b border-indigo-500 lg:border-none">
          <div className="flex grow justify-between items-center">
            <div>
              <a
                onClick={() => navigate(RoutePaths.HOME)}
                className="cursor-pointer"
              >
                <span className="sr-only">Meteor Wallet</span>
                <img
                  className="h-10 w-auto"
                  src="https://lh4.googleusercontent.com/WHMQ1rK5NzpgIZe9Pvy_VgngvNHLf8VaJ3Eu358o_EARtdQ-038GC6fwB1c3Y8psnrBNig=w16383"
                  alt=""
                />
              </a>
            </div>
            <div>
              {!isLoadingLoggedUser && !loggedUser && (
                <button
                  className="text-white font-bold"
                  onClick={() => {
                    navigate(RoutePaths.SIGN_UP);
                  }}
                >
                  Registrarse
                </button>
              )}
              {!isLoadingLoggedUser && loggedUser && (
                <button
                  className="text-white font-bold"
                  onClick={() => {
                    Meteor.logout();
                    navigate(RoutePaths.HOME);
                  }}
                >
                  Cerrar sesión
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
