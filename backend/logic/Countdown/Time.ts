/**
 * Represents a time duration in seconds.
 */
export class Time {
    private seconds: number;

    constructor(seconds: number) {
        this.seconds = seconds;
    }

    // Increments time by a given number of seconds (Default 1)
    increment(seconds: number = 1) {
        this.seconds += seconds;
    }

    // Decrements time by given number of seconds (default 1), to a minimum of 0
    decrement(seconds: number = 1) {
        this.seconds = Math.max(0, this.seconds - seconds);
    }

    // Returns time in HH:MM:SS format
    getTimeAsString(): string {
        const { hours, minutes, seconds } = this.getComponents();
        return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    }

    // Returns time split into components (hours, minutes and seconds)
    getComponents(): { hours: number; minutes: number; seconds: number } {
        const hours = Math.floor(this.seconds / 3600);
        const minutes = Math.floor((this.seconds % 3600) / 60);
        const seconds = this.seconds % 60;
        return { hours, minutes, seconds };
    }

    // Subtracts given time from this time and compares it.
    // E.g. if this time
    subtractTime(other: Time): Time {
        return new Time(this.getTime() - other.getTime());
    }

    // Returns true if two times have same seconds value
    isEqualTo(other: Time): boolean {
        return this.getTime() - other.getTime() == 0;
    }

    // Returns true if this time is greater than the second time
    isGreaterThan(other: Time): boolean {
        return this.getTime() - other.getTime() > 0;
    }

    // Returns time in seconds
    private getTime(): number {
        return this.seconds;
    }
}