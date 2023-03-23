import React, { useState } from "react";
import { Accounts } from "meteor/accounts-base";
import { RoutePaths } from "./RoutePaths";
import { useNavigate } from "react-router-dom";
import { ErrorAlert } from "./components/ErrorAlert";
import { Meteor } from "meteor/meteor";

export const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isSignUp, setIsSignUp] = useState(true);
  const signUp = (e) => {
    e.preventDefault();
    Accounts.createUser({ email, password }, (e) => {
      if (e) {
        console.error("Error creando usuario", e);
        setError(e);
        return;
      }
      navigate(RoutePaths.HOME);
    });
  };

  const signIn = (e) => {
    e.preventDefault();
    Meteor.loginWithPassword(email, password, (e) => {
      if (e) {
        console.error("Error iniciando con este usuario", e);
        setError(e);
        return;
      }
      navigate(RoutePaths.HOME);
    });
  };
  return (
    <div className="flex flex-col items-center ">
      <h3 className="px-3 py-2 text-lg text-base font-medium">
        {isSignUp ? "Registrarse" : "Ingresar"}
      </h3>
      {error && <ErrorAlert message={error.reason || "Error desconocido"} />}
      <form className="mt-6">
        <div className="flex flex-col space-y-4">
          <div className="">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <button
            className="mt-3 bg-red-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
            onClick={() => navigate(RoutePaths.HOME)}
          >
            Cancelar
          </button>
          {isSignUp && (
            <button
              className="mt-3 bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
              onClick={signUp}
              type="submit"
            >
              Registrar
            </button>
          )}
          {!isSignUp && (
            <button
              className="mt-3 bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
              onClick={signIn}
              type="submit"
            >
              Ingresar
            </button>
          )}
        </div>
        <div className="py-3">
          <a
            onClick={() => setIsSignUp(!isSignUp)}
            className="cursor-pointer text-indigo-600"
          >
            Si ya posees una cuenta, click aqui
          </a>
        </div>
      </form>
    </div>
  );
};
