import { useState } from 'react';
import { useNavigate } from "react-router-dom";

import { SessionSettings } from '../../logic/timer/SessionSettings';
import { ActiveSession } from '../../logic/timer/ActiveSession';

export function SettingsMenu() {
    const navigate = useNavigate();

    // All times in minutes
    const [workTime, setWorkTime] = useState(25);
    const [breakTime, setBreakTime] = useState(5);
    const [numBlocks, setNumBlocks] = useState(4);

    const handleStartSession = () => {
        navigate("/timer");

        const settings = new SessionSettings(toMs(workTime), toMs(breakTime), numBlocks);
        const session = new ActiveSession(settings);
        session.start();
    };

    return (
        <div className="flex flex-col items-center p-6 max-w-sm w-full mx-auto border rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Customize Session</h2>

            <NumberPicker
                label="Focus Time (min)"
                value={workTime}
                setValue={setWorkTime}
                min={1}
                max={200}
                step={5}
            />
            <NumberPicker
                label="Break Time (min)"
                value={breakTime}
                setValue={setBreakTime}
                min={1}
                max={200}
                step={5}
            />
            <NumberPicker
                label="Number of Blocks"
                value={numBlocks}
                setValue={setNumBlocks}
                min={1}
                max={20}
                step={1}
            />

            <div className="mt-4 flex justify-center">
                <button
                    onClick={handleStartSession}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Start Session
                </button>
            </div>
        </div>
    );
}

// NumberPicker with integer clamp
function NumberPicker({ value, setValue, min, max, step = 1, label }: any) {
    const clamp = (v: number) => Math.min(Math.max(Math.round(v), min), max);

    return (
        <div className="flex items-center gap-2 mb-3">
            <span className="w-32">{label}</span>
            <input
                type="number"
                value={value}
                onChange={e => setValue(clamp(Number(e.target.value)))}
                min={min}
                max={max}
                step={step}
                className="w-16 text-center"
            />
        </div>
    );
}

function toMs(mins: number) {
    return mins * 60 * 1000;
}
