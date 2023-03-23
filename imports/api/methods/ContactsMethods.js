import { ContactsCollection } from "../collections/ContactsCollection";
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";

Meteor.methods({
  "contacts.insert"({ name, email, imageUrl, walletId }) {
    check(name, String);
    check(email, String);
    check(imageUrl, String);
    check(walletId, String);
    if (!name) {
      throw new Meteor.Error("El Nombre es obligatorio");
    }
    if (!walletId) {
      throw new Meteor.Error("El Id de la billetera es obligatorio");
    }
    return ContactsCollection.insert({
      name,
      email,
      imageUrl,
      walletId,
      createdAt: new Date(),
    });
  },
  "contacts.remove"({ contactId }) {
    check(contactId, String);
    return ContactsCollection.remove(contactId);
  },
  "contacts.archive"({ contactId }) {
    check(contactId, String);
    ContactsCollection.update({ _id: contactId }, { $set: { archived: true } });
  },
});
