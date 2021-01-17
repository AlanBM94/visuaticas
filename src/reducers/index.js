import { combineReducers } from "redux";
import sign from "./sign";
import mode from "./mode";
import gameInfo from "./gameInfo";
import audio from "./audio";

export default combineReducers({ sign, mode, gameInfo, audio });
