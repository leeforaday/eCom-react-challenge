import React, {useEffect, useState} from "react";
import {getNumberSquares, getRandomHue, getRandomLevel, getRandomSaturation, getRandomSquare} from "../utils/utils";
import Color from "../models/Color";

interface GameBoardProps {
    level: number,
    clickSquare: (clickedIndex: number, correctIndex: number) => void,
}

const GameBoard = (props: GameBoardProps) => {
    const {level, clickSquare} = props;
    const [numberSquares, setNumberSquares] = useState<number>(getNumberSquares(level));
    const [color, setColor] = useState<Color>({
        h: getRandomHue(),
        s: 100,
        l: 50,
    });
    const [randomSquare, setRandomSquare] = useState<number>(getRandomSquare(numberSquares));

    const getSquares = (squares: number): JSX.Element[] => {
        let divSquares = [];
        for (let i = 0; i < squares; i++) {
            let squareColor = `hsl(${color.h}, ${color.s}%, ${color.l}%)`;
            if (i === randomSquare) {
                squareColor = `hsl(${color.h}, ${getRandomSaturation(color.s, level)}%, ${getRandomLevel(color.l, level)}%)`;
            }
            divSquares.push(
                <div className="Square" key={`square-${i}`} style={{backgroundColor: squareColor}}
                     onClick={() => clickSquare(i, randomSquare)}/>
            );
        }
        return divSquares;
    }

    useEffect(() => {
        const newNumberSquares = getNumberSquares(level);
        setNumberSquares(newNumberSquares);
        setRandomSquare(getRandomSquare(newNumberSquares));
        setColor((prevColor) => {
            return {...prevColor, h: getRandomHue()}
        });
    }, [level])


    return (
        <div className="GameBox" style={{gridTemplateColumns: `repeat(${level + 2}, 1fr)`}}>
            {getSquares(numberSquares)}
        </div>
    )
}

export default GameBoard;