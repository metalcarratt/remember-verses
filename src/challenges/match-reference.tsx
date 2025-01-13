import { useEffect, useState } from "react";
import { Verse } from "../types";
import { MatchRefStep } from "./match-reference-builder";
import { Page } from "./page";
import { useResult } from "./use-result";

type Props = {
    step: MatchRefStep,
    stepi: number,
    maxSteps: number,
    next: (wrong: boolean) => void,
    back: () => void
}

type Result = 'Correct' | 'Incorrect' | undefined;

const getAnswerClassName = (answer: string, verse: Verse, result: Result, chosen?: string) => {
    if (answer === verse.reference && result !== undefined) {
        return 'Correct';
    } else if (result === 'Incorrect' && chosen === answer) {
        return 'Incorrect';
    }
    return '';
}

export const MatchReference = ({step, stepi, maxSteps, next, back}: Props) => {
    const {verse, answers} = step;
    const {result, setResult} = useResult(step);
    const [chosen, setChosen] = useState<string | undefined>(undefined);
    const checkAnswer = (answer: string) => {
        setChosen(answer);
        if (answer === verse.reference) {
            setResult('Correct');
        } else {
            setResult('Incorrect');
        }
    }

    useEffect(() => {
        setChosen(undefined);
    }, [step]);

    return (
      <Page result={result} next={next} step={stepi} maxStep={maxSteps}>
        <h2>
          <a href="#" onClick={back} className="backBtn">◀</a>
        </h2>
        <p>{verse.verse}</p>
        {answers.map(answer => {
            const className = getAnswerClassName(answer, verse, result, chosen);
            return (<button className={`answer ${className}`} onClick={() => checkAnswer(answer)}>{answer}</button>)
        })}
      </Page>
    );
}