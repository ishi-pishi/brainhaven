import { Session } from "./Session";

/**
 * Defines the methods for an Session State.
 */

export abstract class SessionState {
    protected ctx: Session;

    constructor(ctx: Session) {
        this.ctx = ctx;
    }

    enter(): void { }
    exit(): void { }

    togglePause(): void { }
}

// TODO: ready state
export class ReadyState extends SessionState {
    togglePause(): void {
        this.ctx.setState(new RunningState(this.ctx));
    }
}


// TODO: running state
export class RunningState extends SessionState {
    enter(): void {
        this.ctx.startTimer();
    }

    exit(): void {
        this.ctx.stopTimer();
    }

    togglePause(): void {
        // Pause the session
        this.ctx.setState(new PausedState(this.ctx));
    }
}

// TODO: paused state
export class PausedState extends SessionState {
    togglePause(): void {
        this.ctx.setState(new RunningState(this.ctx));
    }
}

// TODO: completed state
export class CompletedState extends SessionState {
    togglePause(): void { }
}