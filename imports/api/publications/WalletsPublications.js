import { Meteor } from "meteor/meteor";
import { WalletsCollection } from "../collections/WalletCollection";

Meteor.publish("wallets", function publishWallets() {
  return WalletsCollection.find();
});
