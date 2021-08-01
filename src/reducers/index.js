import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import user from "./user";
import household from "./household";
import onea from "./onea";
import twoa from "./twoa";
import category from "./category";
import upload from "./upload";
import hshd from "./hshdnums";

export default combineReducers({
  auth,
  message,
  user,
  household, 
  onea,
  category,
  upload,
  hshd,
  twoa
});