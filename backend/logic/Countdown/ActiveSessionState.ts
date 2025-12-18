import { ActiveSession } from "./ActiveSession";

/**
 * Defines the methods for an ActiveSession State.
 */

export interface ActiveSessionState {
    start(ctx: ActiveSession): void;
    pause(ctx: ActiveSession): void;
    tick(ctx: ActiveSession): void;
}

// TODO: ready state
// TODO: running state
// TODO: paused state 
// TODO: completed state