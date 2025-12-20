// import { Time } from "./Time";
// import { BlockQueue } from "./BlockQueue";
// import { SessionSettings } from "./SessionSettings";
// import { ReadyState, SessionState } from "./SessionState";
// import { TimeBlock } from "./TimeBlock";

// /**
//  * Represents an ACTIVE session that is counting down, containing
//  * - Total time elapsed so far
//  * - Session we are tracking
//  * 
//  * This is the context; the state can be:
//  * - Ready
//  * - Running
//  * - Paused
//  * - Completed
//  */

// // TODO: right now, this is just a ticking timer. it does not switch blocks.
// export class Session {
//     private settings: SessionSettings;
//     private state: SessionState = new ReadyState(this);
//     protected bq: BlockQueue;

//     // Construct a new session with no elapsed time
//     constructor(settings: SessionSettings) {
//         this.settings = settings;
//         this.setState(new ReadyState(this));
//         this.bq = new BlockQueue(settings);
//     }

//     togglePause() {
//         this.state.togglePause();
//     }


//     // Sets current state to given state
//     setState(newState: SessionState) {
//         this.state.exit?.();
//         this.state = newState;
//         this.state.enter?.();
//     }

//     getCurrentBlock(): TimeBlock | null {
//         return this.bq.current();
//     }
// }