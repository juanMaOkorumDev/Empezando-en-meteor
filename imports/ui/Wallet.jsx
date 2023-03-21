import React, { useState } from "react";
import { Modal } from "./components/Modal";
import { SelectContact } from "./components/SelectContact";
import { ContactsCollection } from "../api/ContactsCollection";
import { useTracker, useSubscribe, useFind } from "meteor/react-meteor-data";
import { Loading } from "./components/Loading";
import { Meteor } from "meteor/meteor";
import { WalletsCollection } from "../api/WalletCollection";

export const Wallet = () => {
  const isLoadingContacts = useSubscribe("contacts");
  const isLoadingWallets = useSubscribe("wallets");
  // const isLoading = useSubscribe("allContacts");
  const contacts = useFind(() => {
    return ContactsCollection.find(
      { archived: { $ne: true } },
      { sort: { createdAt: -1 } }
    );
  });
  const [wallet] = useFind(() => {
    return WalletsCollection.find();
  });
  const [open, setOpen] = useState(false);
  const [isTransferring, setIsTransferring] = useState(false);
  const [amount, setAmount] = useState(0);
  const [destinationWallet, setDestinationWallet] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const addTransaction = () => {
    // console.log("nueva transacción", amount, destinationWallet);
    Meteor.call(
      "transactions.insert",
      {
        isTransferring,
        sourceWalletId: wallet._id,
        destinationWalletId: destinationWallet?.walletId || "",
        amount: Number(amount),
      },
      (e) => {
        if (e) {
          setErrorMessage(e.error);
        } else {
          setOpen(false);
          setDestinationWallet({});
          setAmount(0);
          setErrorMessage("");
        }
      }
    );
  };

  if (isLoadingContacts() || isLoadingWallets()) {
    return <Loading />;
  }

  return (
    <>
      <div className="flex font-sans shadow-md my-10">
        <form className="flex-auto p-6">
          <div className="flex flex-wrap">
            <div className="w-full flex-none text-sm font-medium text-gray-500">
              Cuenta principal
            </div>
            <div className="w-full flex-none text-sm font-medium text-gray-500 mt-2">
              Id de la billetera:
            </div>
            <h1 className="flex-auto text-lg font-semibold text-slate-700">
              {wallet._id}
            </h1>
            <div className="text-2xl font-bold text-slate-700">{`${wallet.balance} ${wallet.currency}`}</div>
          </div>
          <div className="flex space-x-4 text-sm font-medium">
            <div className="flex-auto flex space-x-4 mt-4">
              <button
                type="button"
                className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                onClick={() => {
                  setIsTransferring(false);
                  setErrorMessage("");
                  setOpen(true);
                }}
              >
                Agregar dinero
              </button>
              <button
                type="button"
                className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                onClick={() => {
                  setIsTransferring(true);
                  setErrorMessage("");
                  setOpen(true);
                }}
              >
                Transferir dinero
              </button>
            </div>
          </div>
        </form>
      </div>
      <Modal
        open={open}
        setOpen={setOpen}
        title={
          isTransferring
            ? "Transifiriendo dinero a otra billetera"
            : "Agregar dinero a mi billetera"
        }
        body={
          <>
            {isTransferring && (
              <div className="mt-2">
                <SelectContact
                  title="Contacto destino"
                  contacts={contacts}
                  contact={destinationWallet}
                  setContact={setDestinationWallet}
                />
              </div>
            )}

            <div className="mt-2">
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-gray-700"
              >
                Amount
              </label>
              <input
                type="number"
                id="amount"
                value={amount}
                min={0}
                onChange={(e) => setAmount(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="000.00"
              />
            </div>
          </>
        }
        footer={
          <button
            type="button"
            className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
            onClick={addTransaction}
          >
            {isTransferring ? "Transferir" : "Añadir"}
          </button>
        }
        errorMessage={errorMessage}
      />
    </>
  );
};
