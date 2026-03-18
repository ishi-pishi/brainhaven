import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SessionSettings } from "../../logic/timer/SessionSettings";
import { ActiveSession } from "../../logic/timer/ActiveSession";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { SubjectComboBox } from "./SubjectComboBox";

import { Clock, Coffee, Repeat, Zap, ArrowRight } from "lucide-react";

// Represents the settings menu before going into a timer session
// showing timer settings and customizing diffiuclty
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

  const calculateDifficulty = () => {
    let val =
      breakTime === 0
        ? 1
        : workTime / breakTime <= 5
          ? (0.5 * (workTime / breakTime - 1)) / 4
          : 0.5 + (0.5 * (workTime / breakTime - 5)) / 5;

    if (val < 0) val = 0;
    if (val > 0.99) val = 0.99;
    return val;
  };

  const difficultyValue = calculateDifficulty();

  return (
    <div className="flex justify-center p-6">
      <Card className="w-[720px] max-w-full rounded-3xl shadow-2xl overflow-hidden border-0 bg-card">
        <div className="bg-primary/15 p-6 border-b border-primary/10">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-primary/20 p-2.5">
                <ArrowRight className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-foreground text-2xl font-serif font-semibold">
                  Customize Session
                </h3>
                <p className="text-foreground/70 text-sm mt-0.5">
                  Adjust durations & cycles to fit your needs.
                </p>
              </div>
            </div>
          </div>
        </div>

        <CardContent className="grid grid-cols-2 gap-6 p-6 bg-white">
          {/* Left column: sliders */}
          <div className="space-y-5">
            <div>
              <Label
                htmlFor="focus-slider"
                className="flex items-center gap-2 mb-2 text-sm font-medium text-slate-700"
              >
                <Clock className="h-4 w-4 text-slate-600" />
                Focus <span className="ml-2 text-slate-500">({workTime}m)</span>
              </Label>
              <div className="flex items-center gap-4">
                <Slider
                  value={[workTime]}
                  onValueChange={([v]) => setWorkTime(v)}
                  min={5}
                  max={90}
                  step={5}
                  id="focus-slider"
                  className="w-full"
                />
                <div className="w-12 text-right text-sm font-semibold text-slate-700">
                  {workTime}m
                </div>
              </div>
            </div>

            <div>
              <Label
                htmlFor="break-slider"
                className="flex items-center gap-2 mb-2 text-sm font-medium text-slate-700"
              >
                <Coffee className="h-4 w-4 text-slate-600" />
                Break{" "}
                <span className="ml-2 text-slate-500">({breakTime}m)</span>
              </Label>
              <div className="flex items-center gap-4">
                <Slider
                  value={[breakTime]}
                  onValueChange={([v]) => setBreakTime(v)}
                  min={5}
                  max={30}
                  step={5}
                  id="break-slider"
                  className="w-full"
                />
                <div className="w-12 text-right text-sm font-semibold text-slate-700">
                  {breakTime}m
                </div>
              </div>
            </div>

            <div>
              <Label
                htmlFor="cycles-slider"
                className="flex items-center gap-2 mb-2 text-sm font-medium text-slate-700"
              >
                <Repeat className="h-4 w-4 text-slate-600" />
                Cycles{" "}
                <span className="ml-2 text-slate-500">({numCycles})</span>
              </Label>
              <div className="flex items-center gap-4">
                <Slider
                  value={[numCycles]}
                  onValueChange={([v]) => setNumCycles(v)}
                  min={1}
                  max={10}
                  step={1}
                  id="cycles-slider"
                  className="w-full"
                />
                <div className="w-12 text-right text-sm font-semibold text-slate-700">
                  {numCycles}
                </div>
              </div>
            </div>

            <div className="mt-1 text-sm text-slate-600">
              <div className="font-semibold">Total time</div>
              <div className="text-slate-700">
                {Math.floor(
                  (workTime * numCycles + breakTime * (numCycles - 1)) / 60,
                )}
                h {(workTime * numCycles + breakTime * (numCycles - 1)) % 60}m
              </div>
            </div>
          </div>

          {/* Right column: subject, difficulty, action */}
          <div className="flex flex-col justify-between gap-6">
            <div className="space-y-4">
              <div>
                <Label className="block text-sm font-medium text-slate-700">
                  Subject
                </Label>
                <div className="mt-2">
                  <SubjectComboBox setSubjectSelected={setIsSubSelected} />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold text-slate-700">
                    Difficulty
                  </div>
                  <div className="text-xs text-slate-500">Auto</div>
                </div>

                <div className="mt-2">
                  <div className="flex items-center gap-3">
                    <div className="text-xs text-slate-500 flex items-center gap-1">
                      <span className="opacity-80">Easy</span>
                    </div>
                    <div className="relative flex-1 h-3 rounded-md overflow-hidden bg-slate-100">
                      <div
                        className="absolute top-0 left-0 h-full"
                        style={{
                          width: `${difficultyValue * 100}%`,
                          background:
                            "linear-gradient(90deg,#60a5fa,#34d399,#fb923c)",
                        }}
                      />
                      <div
                        className="absolute top-0 left-[calc(var(--difficulty)*100%)] -translate-x-1/2 h-full w-0.5 bg-white"
                        style={{ left: `${difficultyValue * 100}%` }}
                      />
                    </div>
                    <div className="text-xs text-slate-500 flex items-center gap-1">
                      <span className="opacity-80">Hard</span>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-slate-500 flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    <div>Calculated from work/break ratio</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <CardFooter className="p-0 bg-transparent">
                <Button
                  onClick={handleStartSession}
                  className="w-full py-3 rounded-xl flex items-center justify-center gap-3"
                  disabled={!isSubSelected}
                >
                  <span>Start Session</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function toMs(mins: number) {
  return mins * 60 * 1000;
}
