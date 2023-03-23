import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";
import { WalletsCollection } from "./WalletCollection";
import { Meteor } from "meteor/meteor";

export const TRANSFER_TYPE = "TRANSFER";
export const ADD_TYPE = "ADD";

// export const TransactionsCollections = new Mongo.Collection("transactions");

// @ts-ignore
export const TransactionsCollections = new Mongo.Collection(
  // @ts-ignore
  "transactions"
);

TransactionsCollections.before.insert(function (userId, transactionDocument) {
  if (transactionDocument.type === TRANSFER_TYPE) {
    const sourceWallet = WalletsCollection.findOne(
      transactionDocument.sourceWalletId
    );
    if (!sourceWallet) {
      throw new Meteor.Error("No se encontro billetera de salida.");
    }
    if (sourceWallet.balance < transactionDocument.amount) {
      throw new Meteor.Error("Saldo insuficiente");
    }
    WalletsCollection.update(transactionDocument.sourceWalletId, {
      $inc: { balance: -transactionDocument.amount },
    });
    WalletsCollection.update(transactionDocument.destinationWalletId, {
      $inc: { balance: transactionDocument.amount },
    });
  }
  if (transactionDocument.type === ADD_TYPE) {
    const sourceWallet = WalletsCollection.findOne(
      transactionDocument.sourceWalletId
    );
    if (!sourceWallet) {
      throw new Meteor.Error("No se encontro billetera de salida.");
    }
    WalletsCollection.update(transactionDocument.sourceWalletId, {
      $inc: { balance: transactionDocument.amount },
    });
  }
});

const TransactionsSchema = new SimpleSchema({
  type: {
    type: String,
    allowedValues: [TRANSFER_TYPE, ADD_TYPE],
  },
  sourceWalletId: {
    type: String,
    // @ts-ignore
    // regEx: SimpleSchema.RegEx?.Id,
  },
  destinationWalletId: {
    type: String,
    optional: true,
    // @ts-ignore
    // regEx: SimpleSchema.RegEx?.Id,
  },
  amount: {
    type: Number,
    min: 1,
  },
  createdAt: {
    type: Date,
  },
});

TransactionsCollections.attachSchema(TransactionsSchema);
