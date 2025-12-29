import { useState } from 'react';
import { useNavigate } from "react-router-dom";

import { SessionSettings } from '../../logic/timer/SessionSettings';
import { ActiveSession } from '../../logic/timer/ActiveSession';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from '@/components/ui/label';
import { Slider } from "@/components/ui/slider";

export function SettingsMenu() {
    const navigate = useNavigate();

    const [workTime, setWorkTime] = useState(25);
    const [breakTime, setBreakTime] = useState(5);
    const [numCycles, setNumCycles] = useState(4);

    const handleStartSession = () => {
        navigate("/timer");
        const settings = new SessionSettings(toMs(workTime), toMs(breakTime), numCycles);
        const session = new ActiveSession(settings);
        session.start();
    };

    const calculateDifficulty = () => {
        let val = breakTime === 0
            ? 1
            : workTime / breakTime <= 5
                ? 0.5 * (workTime / breakTime - 1) / 4
                : 0.5 + 0.5 * (workTime / breakTime - 5) / 5;

        if (val < 0) val = 0;
        if (val > 0.99) val = 0.99;
        return val;
    };


    const difficultyValue = calculateDifficulty();

    return (
        <Card className="mx-auto max-w-sm w-full border">
            <CardHeader>
                <CardTitle>Customize Session</CardTitle>
                <CardDescription>
                    Adjust your work/break durations and the number of cycles you would like to work for.
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
                <div className="space-y-1">
                    <Label htmlFor="focus-slider" className="block">Focus ({workTime}m)</Label>
                    <Slider
                        value={[workTime]}
                        onValueChange={([v]) => setWorkTime(v)}
                        min={5}
                        max={90}
                        step={5}
                        id="focus-slider"
                        className="w-full"
                    />
                </div>

                <div className="space-y-1">
                    <Label htmlFor="break-slider" className="block">Break ({breakTime}m)</Label>
                    <Slider
                        value={[breakTime]}
                        onValueChange={([v]) => setBreakTime(v)}
                        min={5}
                        max={30}
                        step={5}
                        id="break-slider"
                        className="w-full"
                    />
                </div>

                <div className="space-y-1">
                    <Label htmlFor="cycles-slider" className="block">Cycles ({numCycles})</Label>
                    <Slider
                        value={[numCycles]}
                        onValueChange={([v]) => setNumCycles(v)}
                        min={1}
                        max={10}
                        step={1}
                        id="cycles-slider"
                        className="w-full"
                    />
                </div>

                <div className="mt-4 text-center font-semibold text-lg">
                    Total time: {Math.floor((workTime * numCycles + breakTime * (numCycles - 1)) / 60)}h{" "}
                    {(workTime * numCycles + breakTime * (numCycles - 1)) % 60}m
                </div>

                <div className="mt-2 space-y-1">
                    <div className="text-center font-semibold">Difficulty</div>
                    <div className="relative h-4 w-full rounded-lg overflow-hidden bg-linear-to-r from-blue-400 via-green-400 to-orange-500">
                        <div
                            className="absolute top-0 h-full w-0.5 bg-white"
                            style={{ left: `${difficultyValue * 100}%` }}
                        />
                    </div>
                </div>
            </CardContent>

            <CardFooter>
                <Button onClick={handleStartSession} className="w-full">
                    Start Session
                </Button>
            </CardFooter>
        </Card>
    );
}

function toMs(mins: number) {
    return mins * 60 * 1000;
}