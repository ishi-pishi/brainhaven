import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SessionSettings } from "../../logic/timer/SessionSettings";
import { ActiveSession } from "../../logic/timer/ActiveSession";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { SubjectComboBox } from "./SubjectComboBox";

import { Clock, Coffee, Repeat, Zap, ArrowRight, Brain, Minus, Plus } from "lucide-react";

// Represents the settings menu before going into a timer session
// showing timer settings and customizing difficulty
export function SettingsMenu() {
  const navigate = useNavigate();

  const [workTime, setWorkTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [numCycles, setNumCycles] = useState(4);
  const [isSubSelected, setIsSubSelected] = useState(false);

  useEffect(() => ActiveSession.resetInstance(), []);

  const handleStartSession = () => {
    navigate("/timer");
    let settings = new SessionSettings(
      toMs(workTime),
      toMs(breakTime),
      numCycles,
    );
    // settings = new SessionSettings(1000, 1000, 3); // uncomment this to simulate 1 second rounds
    const session = ActiveSession.getInstance();
    session.setSettings(settings);
    session.startFirstBlock();
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto py-2">
      {/* Title Header */}
      <div className="text-center md:text-left">
        <h1 className="text-3xl font-serif font-semibold tracking-tight text-foreground flex items-center justify-center md:justify-start gap-2.5">
          <Brain className="h-8 w-8 text-primary animate-pulse" />
          Customize Your Session
        </h1>
      </div>

      {/* Session Preview Timeline Bar (at the top, constant size) */}
      <div className="bg-card/50 backdrop-blur-md border border-primary/10 p-5 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.15)] flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="w-full md:flex-1 flex flex-col gap-3">
          <div className="flex items-center justify-between text-xs font-bold text-muted-foreground uppercase tracking-wider">
            <span className="flex items-center gap-1.5">
              <Zap className="h-3.5 w-3.5 text-primary" />
              Session Timeline
            </span>
            <div className="flex items-center gap-4 normal-case font-medium">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-primary shadow-sm" /> Focus
              </span>
              {numCycles > 1 && (
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-secondary shadow-sm" /> Break
                </span>
              )}
            </div>
          </div>
          
          {/* Glass track timeline */}
          <div className="w-full h-3.5 bg-muted/60 dark:bg-muted/30 border border-primary/5 rounded-full overflow-hidden flex shadow-inner">
            {Array.from({ length: 2 * numCycles - 1 }).map((_, index) => {
              const isWork = index % 2 === 0;
              const blockDuration = isWork ? workTime : breakTime;
              const totalDuration = workTime * numCycles + breakTime * (numCycles - 1);
              const percentWidth = totalDuration > 0 ? (blockDuration / totalDuration) * 100 : 0;
              
              return (
                <div
                  key={index}
                  className={`h-full transition-all duration-500 ${
                    isWork
                      ? "bg-primary"
                      : "bg-secondary"
                  }`}
                  style={{ width: `${percentWidth}%` }}
                />
              );
            })}
          </div>
        </div>
        
        <div className="flex-shrink-0 text-center md:text-right pl-0 md:pl-6 border-t md:border-t-0 md:border-l border-primary/10 pt-4 md:pt-0 w-full md:w-auto">
          <div className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Total Duration</div>
          <div className="text-3xl font-bold text-foreground font-serif mt-1">
            {Math.floor(
              (workTime * numCycles + breakTime * (numCycles - 1)) / 60,
            )}
            <span className="text-lg font-sans font-medium text-muted-foreground ml-0.5">h</span>{" "}
            {(workTime * numCycles + breakTime * (numCycles - 1)) % 60}
            <span className="text-lg font-sans font-medium text-muted-foreground ml-0.5">m</span>
          </div>
        </div>
      </div>

      {/* Inputs Configuration Row */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        {/* Left Column: Number Inputs */}
        <div className="md:col-span-7 bg-card/50 backdrop-blur-md border border-primary/10 p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] flex flex-col justify-between gap-5">
          <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            Interval Settings
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            {/* Focus */}
            <div className="space-y-2 text-center">
              <Label htmlFor="focus-input" className="text-xs font-bold text-muted-foreground flex items-center justify-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Focus (m)
              </Label>
              <div className="flex items-center justify-between bg-muted/50 border border-primary/5 hover:border-primary/20 focus-within:border-primary/30 rounded-2xl p-1.5 shadow-inner transition-all">
                <button
                  type="button"
                  onClick={() => setWorkTime((prev) => Math.max(5, prev - (prev % 5 === 0 ? 5 : prev % 5)))}
                  className="w-8 h-8 rounded-xl bg-card border border-primary/5 hover:border-primary/20 hover:bg-muted active:scale-90 flex items-center justify-center text-muted-foreground hover:text-foreground transition-all cursor-pointer shadow-sm"
                >
                  <Minus className="h-3 w-3" />
                </button>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  id="focus-input"
                  value={workTime || ""}
                  onChange={(e) => {
                    const cleanVal = e.target.value.replace(/\D/g, "");
                    const val = cleanVal ? Math.max(1, Math.min(180, parseInt(cleanVal))) : 0;
                    setWorkTime(val);
                  }}
                  onBlur={() => {
                    if (workTime < 5) setWorkTime(5);
                  }}
                  className="w-10 text-center bg-transparent border-none outline-none focus:outline-none focus:ring-0 h-8 font-serif font-bold text-lg p-0 text-foreground"
                />
                <button
                  type="button"
                  onClick={() => setWorkTime((prev) => Math.min(180, prev + (prev % 5 === 0 ? 5 : 5 - (prev % 5))))}
                  className="w-8 h-8 rounded-xl bg-card border border-primary/5 hover:border-primary/20 hover:bg-muted active:scale-90 flex items-center justify-center text-muted-foreground hover:text-foreground transition-all cursor-pointer shadow-sm"
                >
                  <Plus className="h-3 w-3" />
                </button>
              </div>
            </div>

            {/* Break */}
            <div className="space-y-2 text-center">
              <Label htmlFor="break-input" className="text-xs font-bold text-muted-foreground flex items-center justify-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                Break (m)
              </Label>
              <div className="flex items-center justify-between bg-muted/50 border border-primary/5 hover:border-secondary/20 focus-within:border-secondary/30 rounded-2xl p-1.5 shadow-inner transition-all">
                <button
                  type="button"
                  onClick={() => setBreakTime((prev) => Math.max(0, prev - (prev % 5 === 0 ? 5 : prev % 5)))}
                  className="w-8 h-8 rounded-xl bg-card border border-primary/5 hover:border-secondary/20 hover:bg-muted active:scale-90 flex items-center justify-center text-muted-foreground hover:text-foreground transition-all cursor-pointer shadow-sm"
                >
                  <Minus className="h-3 w-3" />
                </button>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  id="break-input"
                  value={breakTime}
                  onChange={(e) => {
                    const cleanVal = e.target.value.replace(/\D/g, "");
                    const val = cleanVal ? Math.max(0, Math.min(60, parseInt(cleanVal))) : 0;
                    setBreakTime(val);
                  }}
                  className="w-10 text-center bg-transparent border-none outline-none focus:outline-none focus:ring-0 h-8 font-serif font-bold text-lg p-0 text-foreground"
                />
                <button
                  type="button"
                  onClick={() => setBreakTime((prev) => Math.min(60, prev + (prev % 5 === 0 ? 5 : 5 - (prev % 5))))}
                  className="w-8 h-8 rounded-xl bg-card border border-primary/5 hover:border-secondary/20 hover:bg-muted active:scale-90 flex items-center justify-center text-muted-foreground hover:text-foreground transition-all cursor-pointer shadow-sm"
                >
                  <Plus className="h-3 w-3" />
                </button>
              </div>
            </div>

            {/* Cycles */}
            <div className="space-y-2 text-center">
              <Label htmlFor="cycles-input" className="text-xs font-bold text-muted-foreground flex items-center justify-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-foreground/30" />
                Cycles
              </Label>
              <div className="flex items-center justify-between bg-muted/50 border border-primary/5 hover:border-primary/20 focus-within:border-primary/30 rounded-2xl p-1.5 shadow-inner transition-all">
                <button
                  type="button"
                  onClick={() => setNumCycles((prev) => Math.max(1, prev - 1))}
                  className="w-8 h-8 rounded-xl bg-card border border-primary/5 hover:border-primary/20 hover:bg-muted active:scale-90 flex items-center justify-center text-muted-foreground hover:text-foreground transition-all cursor-pointer shadow-sm"
                >
                  <Minus className="h-3 w-3" />
                </button>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  id="cycles-input"
                  value={numCycles || ""}
                  onChange={(e) => {
                    const cleanVal = e.target.value.replace(/\D/g, "");
                    const val = cleanVal ? Math.max(1, Math.min(20, parseInt(cleanVal))) : 0;
                    setNumCycles(val);
                  }}
                  onBlur={() => {
                    if (numCycles < 1) setNumCycles(1);
                  }}
                  className="w-10 text-center bg-transparent border-none outline-none focus:outline-none focus:ring-0 h-8 font-serif font-bold text-lg p-0 text-foreground"
                />
                <button
                  type="button"
                  onClick={() => setNumCycles((prev) => Math.min(20, prev + 1))}
                  className="w-8 h-8 rounded-xl bg-card border border-primary/5 hover:border-primary/20 hover:bg-muted active:scale-90 flex items-center justify-center text-muted-foreground hover:text-foreground transition-all cursor-pointer shadow-sm"
                >
                  <Plus className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Subject & Start CTA */}
        <div className="md:col-span-5 bg-card/50 backdrop-blur-md border border-primary/10 p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] flex flex-col justify-between gap-5">
          <div className="space-y-2">
            <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
              <Brain className="h-4 w-4 text-primary" />
              Study Subject
            </Label>
            <div className="flex justify-start">
              <SubjectComboBox setSubjectSelected={setIsSubSelected} />
            </div>
          </div>

          <div className="space-y-2.5">
            <Button
              onClick={handleStartSession}
              className="w-full py-5 rounded-2xl flex items-center justify-center gap-2 text-sm font-semibold shadow-md shadow-primary/10 bg-primary text-primary-foreground hover:brightness-95 active:scale-95 transition-all cursor-pointer animate-pulse-slow"
              disabled={!isSubSelected}
            >
              <span>Begin Study Session</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
            {!isSubSelected && (
              <p className="text-center text-[10px] text-destructive font-bold flex items-center justify-center gap-1 animate-pulse">
                <Zap className="h-3 w-3" /> Select a study subject to begin
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function toMs(mins: number) {
  return mins * 60 * 1000;
}
