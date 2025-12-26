import { useState } from 'react';
import { useNavigate } from "react-router-dom";

import { SessionSettings } from '../../logic/timer/SessionSettings';
import { ActiveSession } from '../../logic/timer/ActiveSession';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from '@/components/ui/label';

export function SettingsMenu() {
    const navigate = useNavigate();

    // All times in minutes
    const [workTime, setWorkTime] = useState(25);
    const [breakTime, setBreakTime] = useState(5);
    const [numCycles, setNumCycles] = useState(4);

    const handleStartSession = () => {
        navigate("/timer");

        const settings = new SessionSettings(toMs(workTime), toMs(breakTime), numCycles);
        const session = new ActiveSession(settings);
        session.start();
    };

    return (
        <Card className="mx-auto max-w-sm w-full">
            <CardHeader>
                <CardTitle>
                    Customize Session
                </CardTitle>

                <CardDescription>
                    Adjust your work/break durations and the number of cycles you would like to work for.
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                    <Label htmlFor="focus-time" className="w-20">Focus</Label>
                    <Input
                        id="focus-time"
                        type="number"
                        value={workTime}
                        min={0}
                        max={200}
                        step={5}
                        onChange={e => setWorkTime(Math.round(Number(e.target.value)))}
                        className="w-20"
                    />
                </div>

                <div className="flex items-center space-x-2">
                    <Label htmlFor="break-time" className="w-20">Break</Label>
                    <Input
                        id="break-time"
                        type="number"
                        value={breakTime}
                        min={0}
                        max={200}
                        step={5}
                        onChange={e => setBreakTime(Math.round(Number(e.target.value)))}
                        className="w-20"
                    />
                </div>

                <div className="flex items-center space-x-2">
                    <Label htmlFor="cycles" className="w-20">Cycles</Label>
                    <Input
                        id="cycles"
                        type="number"
                        value={numCycles}
                        min={1}
                        max={10}
                        onChange={e => setNumCycles(Math.round(Number(e.target.value)))}
                        className="w-20"
                    />
                </div>
            </CardContent>

            <CardFooter>
                <Button
                    onClick={handleStartSession}
                >
                    Start Session
                </Button>
            </CardFooter>
        </Card>
    );
}

function toMs(mins: number) {
    return mins * 60 * 1000;
}
