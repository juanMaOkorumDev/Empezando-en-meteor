import { Accounts } from "meteor/accounts-base";
import { Meteor } from "meteor/meteor";
import { RoutePaths } from "/imports/ui/RoutePaths";

Accounts.emailTemplates.resetPassword.html = (user, url) =>
  "Reset you password con este link";

Accounts.urls.resetPassword = (token) =>
  Meteor.absoluteUrl(`${RoutePaths.RESET_PASSWORD.substring(1)}/${token}`);
