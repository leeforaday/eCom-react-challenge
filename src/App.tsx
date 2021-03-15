import React, {useEffect, useState} from "react";
import './App.css';
import HallOfFamePosition from "./models/HallOfFamePosition";
import GameBoard from "./Components/GameBoard";
import HallOfFame from "./Components/HallOfFame";

const localStorageName = "HallOfFame";

const App = () => {

    const [level, setLevel] = useState<number>(0);
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [hallOfFame, setHallOfFame] = useState<HallOfFamePosition[]>(Array(10).fill({name: '', score: 0}));
    const [endPosition, setEndPosition] = useState<number | null>(null);

    const saveNewHighScore = (hallOfFamer: HallOfFamePosition, endPosition: number): void => {
        setHallOfFame((prevHallOfFame) => {
            return [
                ...prevHallOfFame.slice(0, endPosition),
                hallOfFamer,
                ...prevHallOfFame.slice(endPosition + 1, 10)
            ];
        });
        setEndPosition(null);
    }

    const restartGame = (): void => {
        if (endPosition !== null) {
            const newHallOfFamer: HallOfFamePosition = {name: 'Anonymous', score: level};
            saveNewHighScore(newHallOfFamer, endPosition);
        }
        setLevel(0);
        setGameOver(false);
    }

    const handleClick = (index: number, correctIndex: number): void => {
        if (index === correctIndex) setLevel(level + 1);
        else {
            setGameOver(true);
            if (level > hallOfFame[9].score) {
                let newHallOfFamer: HallOfFamePosition = {name: "Anonymous", score: level};
                let position: number;
                setEndPosition(null);
                hallOfFame.some((famer, index) => {
                    if (famer.score < level) {
                        position = index;
                        setEndPosition(position);
                        return true;
                    }
                    return false;
                })
                setHallOfFame((prevHallOfFame) => {
                    const newHallOfFame = [
                        ...prevHallOfFame.slice(0, position),
                        newHallOfFamer,
                        ...prevHallOfFame.slice(position, 10)
                    ];
                    newHallOfFame.pop();
                    return newHallOfFame;
                });
            }
        }
    }

    const findSolution = () => {
        const squares = document.getElementsByClassName("Square") as HTMLCollectionOf<HTMLElement>;
        const size = squares.length;
        for (let i = 0; i < size-1; i++) {
            let prevColor = squares[i].style.backgroundColor;
            let currentColor = squares[i + 1].style.backgroundColor;
            if (prevColor !== currentColor) {
                if (i > 0) {
                    squares[i + 1].click();
                    break;
                } else if (prevColor !== squares[i + 2].style.backgroundColor) {
                    squares[i].click();
                    break;
                } else if (currentColor !== squares[i + 2].style.backgroundColor) {
                    squares[i + 1].click();
                    break;
                }
            }
        }
    }

    useEffect(() => {
        const localScores = localStorage.getItem(localStorageName);
        if (localScores) {
            setHallOfFame(JSON.parse(localScores));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(localStorageName, JSON.stringify(hallOfFame));
    }, [hallOfFame]);

    return (
        <div className="App">
            <div className="Level">
                <span>Level: {level}</span>
            </div>
            {!gameOver ?
                <GameBoard level={level} clickSquare={handleClick}/> :
                <>
                    <div className="GameOver">
                        <span>GAME OVER!</span>
                    </div>
                    <div className="HighScore">
                        <HallOfFame hallOfFame={hallOfFame}
                                    level={level}
                                    scorePosition={endPosition}
                                    saveHighScore={saveNewHighScore}
                        />
                    </div>
                    <button onClick={() => restartGame()}>Retry Game</button>
                </>
            }

            {!gameOver && <button className="ScriptButton" onClick={() => findSolution()}>Use script</button>}
        </div>
    );
}

export default App;
