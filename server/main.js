import { Meteor } from "meteor/meteor";
import SimpleSchema from "simpl-schema";
import "../imports/api/ContactsCollection";
import "../imports/api/ContactsMethods";
import "../imports/api/ContactsPublications";
import "../imports/api/TransactionsCollections";
import "../imports/api/TransactionsMethods";
import "../imports/api/WalletCollection";
import "../imports/api/WalletsPublications";
import { WalletsCollection } from "../imports/api/WalletCollection";

const walletSchema = new SimpleSchema({
  balance: {
    type: Number,
    min: 0,
    defaultValue: 0,
  },
  currency: {
    type: String,
    allowedValues: ["USD", "COP", "EUR"],
    defaultValue: "COP",
  },
  createdAt: {
    type: Date,
  },
});

Meteor.startup(() => {
  const walletData = {
    balance: 0,
    currency: "COP",
    createdAt: new Date(),
  };

  const cleanWallet = walletSchema.clean(walletData);

  walletSchema.validate(cleanWallet);

  WalletsCollection.insert(cleanWallet);
});
