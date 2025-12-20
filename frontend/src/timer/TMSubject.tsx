export type TickListener = (timeLeftMs: number) => void;
export type FinishedListener = () => void;

export class TMSubject {
  private tickListeners = new Set<TickListener>();
  private finishedListeners = new Set<FinishedListener>();

  addTickListener(cb: TickListener) {
    this.tickListeners.add(cb);
    return () => this.tickListeners.delete(cb);
  }

  addFinishedListener(cb: FinishedListener) {
    this.finishedListeners.add(cb);
    return () => this.finishedListeners.delete(cb);
  }

  emitTick(msLeft: number) {
    for (const cb of this.tickListeners) {
      try { cb(msLeft); } catch (err) { console.error("tick listener error", err); }
    }
  }

  emitFinished() {
    for (const cb of this.finishedListeners) {
      try { cb(); } catch (err) { console.error("finished listener error", err); }
    }
  }
}
