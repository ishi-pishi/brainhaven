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
        <Card>
            <CardHeader>
                <CardTitle>
                    Customize Session
                </CardTitle>
            </CardHeader>
            <CardDescription>
                Adjust your work/break durations and the number of cycles you would like to work for.
            </CardDescription>

            <CardContent>
                <Label>Focus</Label>
                <Input id="focus-time"
                    type="number"
                    value={workTime}
                    min={1}
                    max={200}
                    step={5}
                    onChange={e => setWorkTime(Math.round(Number(e.target.value)))}>
                </Input>
                <Label>Break</Label>
                <Input id="break-time"
                    type="number"
                    value={breakTime}
                    min={1}
                    max={200}
                    step={5}
                    onChange={e => setBreakTime(Math.round(Number(e.target.value)))}>
                </Input>
                <Label>Cycles</Label>
                <Input id="cycles"
                    type="number"
                    value={numCycles}
                    min={1}
                    max={10}
                    onChange={e => setNumCycles(Math.round(Number(e.target.value)))}>
                </Input>
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
