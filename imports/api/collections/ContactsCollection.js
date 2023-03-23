import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

export const ContactsCollection = new Mongo.Collection("contacts");

const ContactsSchema = new SimpleSchema({
  name: {
    type: String,
  },
  email: {
    type: String,
    // @ts-ignore
    regEx: SimpleSchema.RegEx?.Email,
  },
  imageURL: {
    type: String,
    optional: true,
  },
  walletId: {
    type: String,
    // @ts-ignore
    // regEx: SimpleSchema.RegEx?.Id,
  },
  createdAt: {
    type: Date,
  },
});

ContactsCollection.attachSchema(ContactsSchema);
