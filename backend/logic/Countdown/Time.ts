/**
 * Represents a time duration in seconds.
 */
export class Time {
    private seconds: number;

    constructor(seconds: number) {
        this.seconds = seconds;
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
}