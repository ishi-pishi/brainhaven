import { Time } from "../Time";
/**
 * A class representing a block of time (either work or break)
 */

export abstract class TimeBlock {
    constructor(protected duration: Time) {}
}

class WorkBlock extends TimeBlock {}
class BreakBlock extends TimeBlock {}