import { Meteor } from "meteor/meteor";
import "../imports/api/collections/ContactsCollection";
import "../imports/api/methods/ContactsMethods";
import "../imports/api/publications/ContactsPublications";
import "../imports/api/collections/TransactionsCollections";
import "../imports/api/methods/TransactionsMethods";
import "../imports/api/collections/WalletCollection";
import "../infra/accounts";
import "../imports/api/publications/WalletsPublications";
import { WalletsCollection } from "../imports/api/collections/WalletCollection";

Meteor.startup(() => {
  if (!WalletsCollection.find().count()) {
    WalletsCollection.insert({
      createdAt: new Date(),
    });
  }
});
