import { Session } from "./Session";
import { SessionSettings } from "./SessionSettings";

const settings = new SessionSettings(10, 10, 1);
const session = new Session(settings);
session.startTimer();