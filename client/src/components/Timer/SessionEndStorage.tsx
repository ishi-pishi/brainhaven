import { ActiveSession } from "@/logic/timer/ActiveSession";

export class SessionEndStorage {
    private session;

    constructor() {
        this.session = ActiveSession.getInstance();
        this.session?.addListener(this.saveDataOnSessionEnd);
    }

    // Called when the ActiveSession signifies it's changing block
    private saveDataOnSessionEnd() {
        if (!this.session?.isFinished) return;
        this.saveSession();
    }

    // Saves current session to firebase (time started, time ended, and session settings())
    private saveSession() {
        // TODO
    }
}