import React from "react";

export const Wallet = () => {
  const wallet = {
    _id: "123456",
    balance: 5000,
    currency: "COP",
  };

  return (
    <>
      <div class="flex font-sans shadow-md my-10">
        <form class="flex-auto p-6">
          <div class="flex flex-wrap">
            <div class="w-full flex-none text-sm font-medium text-gray-500">
              Cuenta principal
            </div>
            <div class="w-full flex-none text-sm font-medium text-gray-500 mt-2">
              Id de la billetera:
            </div>
            <h1 class="flex-auto text-lg font-semibold text-slate-700">
              {wallet._id}
            </h1>
            <div class="text-2xl font-bold text-slate-700">{`${wallet.balance} ${wallet.currency}`}</div>
          </div>
          <div class="flex space-x-4 text-sm font-medium">
            <div class="flex-auto flex space-x-4 mt-4">
              <button
                type="button"
                className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
              >
                Agregar dinero
              </button>
              <button
                type="button"
                className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
              >
                Transferir dinero
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
