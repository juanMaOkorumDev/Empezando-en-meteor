import React, { useState } from "react";
// @ts-ignore
import { Accounts } from "meteor/accounts-base";
import { useAlert } from "meteor/quave:alert-react-tailwind";
// @ts-ignore
import { Meteor } from "meteor/meteor";
import { RoutePaths } from "./RoutePaths";
import { useNavigate, useParams } from "react-router-dom";
import { ErrorAlert } from "./components/ErrorAlert";

export const ResetPassword = () => {
  //   const { openAlert } = useAlert();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { token } = useParams();
  const [alert, setAlert] = useState(false);

  const resetPassword = (e) => {
    e.preventDefault();
    Accounts.resetPassword(token, password, (e) => {
      if (e) {
        console.error("Error tratando de reiniciar la contraseña", e);
        setError(e);
        return;
      }
      setPassword("");
      setError(null);
      //   openAlert("Recibiste un correo para reiniciar la contraseña");
      setAlert(true);
      navigate(RoutePaths.SIGN_UP);
    });
  };

  return (
    <div className="flex flex-col items-center ">
      <h3 className="px-3 py-2 text-lg text-base font-medium">
        Reiniciar Contraseña olvidada
      </h3>
      {error && <ErrorAlert message={error.reason || "Error desconocido"} />}
      <form className="mt-6 flex flex-col">
        <div className="flex flex-col space-y-4">
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
            Volver al HOME.
          </button>

          <button
            className="mt-3 bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
            onClick={resetPassword}
            type="submit"
          >
            Nueva contraseña.
          </button>
        </div>
        {alert ? window.alert("Se reinicio tu contraseña.") : ""}
      </form>
    </div>
  );
};
