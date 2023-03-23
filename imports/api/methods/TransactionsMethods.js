import {
  ADD_TYPE,
  TransactionsCollections,
  TRANSFER_TYPE,
} from "../collections/TransactionsCollections";
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";

Meteor.methods({
  "transactions.insert"({
    isTransferring,
    sourceWalletId,
    destinationWalletId,
    amount,
  }) {
    check(isTransferring, Boolean);
    check(sourceWalletId, String);
    check(destinationWalletId, String);
    check(amount, Number);
    if (!sourceWalletId) {
      throw new Meteor.Error("La billetera inicial es obligatorio");
    }
    if (isTransferring && !destinationWalletId) {
      throw new Meteor.Error("El Id de la billetera final es obligatorio");
    }
    if (!amount || amount <= 0) {
      throw new Meteor.Error("El monto es requerido");
    }
    return TransactionsCollections.insert({
      type: isTransferring ? TRANSFER_TYPE : ADD_TYPE,
      sourceWalletId,
      destinationWalletId: isTransferring ? destinationWalletId : null,
      amount,
      createdAt: new Date(),
    });
  },
});
