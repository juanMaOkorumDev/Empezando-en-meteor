import React from "react";
// import { ContactsCollection } from "../api/ContactsCollection";
import { Meteor } from "meteor/meteor";
import { ErrorAlert } from "./components/ErrorAlert";
import { useState } from "react/cjs/react.production.min";
import { SuccessAlert } from "./components/SuccessAlert";

export const ContactForm = () => {
  const [name, setName] = React.useState(""); // Formik
  const [email, setEmail] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");

  const saveContact = () => {
    // ContactsCollection.insert({ name, email, imageUrl });
    Meteor.call("contacts.insert", { name, email, imageUrl }, (e) => {
      if (e) {
        setError(e.error);
        setTimeout(() => {
          setError("");
        }, 4000);
        // console.log(e.error);
      } else {
        setName("");
        setEmail("");
        setImageUrl("");
        setSuccess("Contacto guardado con éxito");
        setTimeout(() => {
          setSuccess("");
        }, 4000);
      }
    });
  };

  return (
    <form className="mt-6">
      {error && <ErrorAlert message={error} />}
      {success && <SuccessAlert message={success} />}
      <div className="grid grid-cols-6 gap-6">
        <div className="col-span-6 sm:col-span-6 lg:col-span-2">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
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

        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
          <label
            htmlFor="imageUrl"
            className="block text-sm font-medium text-gray-700"
          >
            Image URL
          </label>
          <input
            type="text"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>
      <div className="px-2 py-3 text-right">
        <button
          type="button"
          onClick={saveContact}
          className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
            />
          </svg>
        </button>
      </div>
    </form>
  );
};
