import React, { useState } from "react";
import { ContactsCollection } from "../api/ContactsCollection";

export const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const saveContact = () => {
    console.log({ name, email, imageUrl });
    ContactsCollection.insert({ name, email, imageUrl });
    setName("");
    setEmail("");
    setImageUrl("");
  };

  return (
    <>
      <form>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            value={name}
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            value={email}
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="imageUrl">Image URL:</label>
          <input
            id="imageUrl"
            value={imageUrl}
            type="text"
            placeholder="Image Url"
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        <div>
          <button type="button" onClick={saveContact}>
            Save Contact
          </button>
        </div>
      </form>
    </>
  );
};
