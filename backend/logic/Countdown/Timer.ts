import { Time } from "./Time";
/**
 * Represents a timer that can tick down, containing:
 * - start: the number of seconds which it started from
 * - elapsed: the amount of time passed so far
 */
export class Timer {
    private readonly start: Time;
    private elapsed: Time;

    constructor(start: number) {
        this.start = new Time(start);
        this.elapsed = new Time(0);
    }

    // Moves timer forward by one tick; returns amount of time left.
    onTick(): boolean {
        if (!this.isFinished()) {
            this.elapsed.increment(1);
        }
        return this.isFinished();
    }

    getTimeLeft() {
        return this.start.subtractTime(this.elapsed);
    }

    private isFinished(): boolean {
        return this.elapsed.isGreaterThan(this.start) || this.elapsed.isEqualTo(this.start);
    }
}