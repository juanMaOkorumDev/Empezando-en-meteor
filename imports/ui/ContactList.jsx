import React, { memo } from "react";
import { ContactsCollection } from "../api/ContactsCollection";
import { Meteor } from "meteor/meteor";
import { useTracker, useSubscribe, useFind } from "meteor/react-meteor-data";

export const ContactList = () => {
  const isLoading = useSubscribe("allContacts");
  const contacts = useFind(() => {
    return ContactsCollection.find({}, { sort: { createdAt: -1 } });
  });
  // const contacts = useTracker(() => {
  //   return ContactsCollection.find({}, { sort: { createdAt: -1 } }).fetch();
  // });

  const removeContact = (event, _id) => {
    event.preventDefault();
    Meteor.call("contacts.remove", { contactId: _id });
  };

  if (isLoading()) {
    return (
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
          d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
        />
      </svg>
    );
  }

  const ContactItem = memo(({ contact }) => {
    return (
      <li className="py-4 flex items-center justify-between space-x-3">
        <div className="min-w-0 flex-1 flex items-center space-x-3">
          <div className="flex-shrink-0">
            <img
              className="h-10 w-10 rounded-full"
              src={contact.imageUrl}
              alt=""
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-gray-900 truncate">
              {contact.name}
            </p>
            <p className="text-sm font-medium text-gray-500 truncate">
              {contact.email}
            </p>
          </div>
          <div>
            <a
              href="#"
              onClick={(event) => removeContact(event, contact._id)}
              className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
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
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </a>
          </div>
        </div>
      </li>
    );
  });

  return (
    <div>
      <div className="mt-10">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
          Contact List
        </h3>
        <ul
          role="list"
          className="mt-4 border-t border-b border-gray-200 divide-y divide-gray-200"
        >
          {contacts.map((contact) => (
            <ContactItem contact={contact} key={contact._id} />
          ))}
        </ul>
      </div>
    </div>
  );
};
