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

    // Runs on tick function every second
    start(): void {
        if (this.intervalId) return;

        this.intervalId = setInterval(() => {
            const finished = this.onTick();
            if (finished) {
                this.stop();
            }
        }, 1000);
    }

    // Stops ticking
    stop(): void {
        if (!this.intervalId) return;

        clearInterval(this.intervalId);
        this.intervalId = undefined;
    }

    // Moves timer forward by one tick; returns amount of time left.
    onTick(): boolean {
        if (!this.isFinished()) {
            this.elapsed.increment(1);
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