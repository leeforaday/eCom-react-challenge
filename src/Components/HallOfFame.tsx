import React, {createRef} from "react";
import HallOfFamePosition from "../models/HallOfFamePosition";

interface HallOfFameProps {
    scorePosition: number | null,
    level: number,
    saveHighScore: (newHallOfFamer: HallOfFamePosition, position: number) => void,
    hallOfFame: HallOfFamePosition[],

}

const HallOfFame = (props: HallOfFameProps) => {
    const {scorePosition, level, saveHighScore, hallOfFame} = props;
    const hallOfFamerRef = createRef<HTMLInputElement>();

    const saveScore = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === "Enter") {
            const newHallOfFamer: HallOfFamePosition = {
                name: hallOfFamerRef.current?.value || 'Anonymous',
                score: level
            };
            if (scorePosition !== null) {
                saveHighScore(newHallOfFamer, scorePosition);
            }
        }
    }

    return (
        <>
            <div className="Score Header" key={`score-titles`}>
                <span>Position</span>
                <span className="Name">Name</span>
                <span>Score</span>
            </div>
            {hallOfFame.map((famer, index) => {
                    if (scorePosition !== null && index === scorePosition) {
                        return (
                            <div className="Score" key={`position-${index}`}>
                                <span>{index + 1} </span>
                                <input autoFocus onKeyDown={(e) => saveScore(e)} ref={hallOfFamerRef}/>
                                <span>{level}</span>
                            </div>
                        )
                    } else {
                        return (
                            <div className="Score" key={`position-${index}`}>
                                <span>{index + 1} </span>
                                <span className="Name"> {famer.name}</span>
                                <span>{famer.score}</span>
                            </div>
                        );
                    }
                }
            )}
        </>
    )

}

export default HallOfFame;