import { useState } from "react";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const ratings = [
    {
        value: 1,
        emoji: "😭",
        color: "bg-red-100 hover:bg-red-200",
        selected: "bg-red-500 text-white ring-red-300"
    },
    {
        value: 2,
        emoji: "😕",
        color: "bg-orange-100 hover:bg-orange-200",
        selected: "bg-orange-500 text-white ring-orange-300"
    },
    {
        value: 3,
        emoji: "🙂",
        color: "bg-yellow-100 hover:bg-yellow-200",
        selected: "bg-yellow-400 text-white ring-yellow-300"
    },
    {
        value: 4,
        emoji: "😊",
        color: "bg-blue-100 hover:bg-blue-200",
        selected: "bg-blue-500 text-white ring-blue-300"
    },
    {
        value: 5,
        emoji: "🤩",
        color: "bg-green-100 hover:bg-green-200",
        selected: "bg-green-500 text-white ring-green-300"
    },
];

/**
 *  This represents the page that appears after a user completes a study session.
 *  After completing the session, the user will choose a productivity rating and write 
 *  a little reflection about how they feel like their study session went.
 */
export function EndSessionCard() {

    const [rating, setRating] = useState<number | null>(null);
    const [reflection, setReflection] = useState("");

    const handleSubmit = () => {

        console.log({
            rating,
            reflection
        });

        // save to db later
    };

    return (

        <Card className="mx-auto max-w-sm w-full border">

            <CardHeader>

                <CardTitle>Session Complete</CardTitle>

                <CardDescription>

                    Reflect on your productivity and how the session went.

                </CardDescription>

            </CardHeader>


            <CardContent className="space-y-6">
                <div className="flex justify-between">

                    {ratings.map((r) => {

                        const isSelected = rating === r.value;

                        return (

                            <button

                                key={r.value}

                                onClick={() => setRating(r.value)}

                                className={`
                    text-3xl h-14 w-14 rounded-md
                    transition
                    hover:scale-110

                    ${isSelected
                                        ? `ring-2 ${r.selected}`
                                        : r.color
                                    }
                `}

                            >

                                {r.emoji}

                            </button>

                        );

                    })}

                </div>




                <div className="space-y-2">

                    <Label htmlFor="reflection">

                        Reflection

                    </Label>

                    <Textarea

                        id="reflection"
                        placeholder="How did the session go?"
                        value={reflection}
                        onChange={(e) => setReflection(e.target.value)}
                        className="resize-none"

                    />

                </div>


            </CardContent>



            <CardFooter>

                <Button
                    onClick={handleSubmit}
                    disabled={!rating}
                    className="w-full"
                >

                    Save Reflection

                </Button>

            </CardFooter>


        </Card>

    );

}
