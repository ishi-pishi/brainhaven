import { Time } from "./Time";
/**
 * Represents a timer that can tick down, containing:
 * - start: the number of seconds which it started from
 * - elapsed: the amount of time passed so far
 */
export class Timer {
    private readonly startTime: Time;
    private elapsed: Time;
    private intervalId: ReturnType<typeof setInterval> | undefined;

    constructor(start: number | Time) {
        if (typeof start === "number") {
            this.startTime = new Time(start);
        } else {
            this.startTime = start;
        }
        this.elapsed = new Time(0);
    }

    // Moves timer forward by one tick; returns amount of time left.
    onTick(): boolean {
        if (!this.isFinished()) {
            this.elapsed.increment(1);
            console.log(this.elapsed.getTimeAsString()); // TODO: remove
        }
        return this.isFinished(); // todo - create observer?
    }

    getTimeLeft() {
        return this.startTime.subtractTime(this.elapsed);
    }

    private isFinished(): boolean {
        return this.elapsed.isGreaterThan(this.startTime) || this.elapsed.isEqualTo(this.startTime);
    }
}