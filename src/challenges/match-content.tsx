import { useEffect, useState } from "react";
import { Result, useResult } from "./use-result";
import { Page } from "./page";
import { MatchContentStep } from "./match-content-builder";
import { Verse } from "../types";

type Props = {
    step: MatchContentStep,
    stepi: number,
    maxSteps: number,
    next: (wrong: boolean) => void,
    back: () => void
}

const getAnswerClassName = (answer: string, verse: Verse, result: Result, chosen?: string) => {
    if (answer === verse.verse && result !== undefined) {
        return 'Correct';
    } else if (result === 'Incorrect' && chosen === answer) {
        return 'Incorrect';
    }
    return '';
}

export const MatchContent = ({step, stepi, maxSteps, next, back}: Props) => {
    const {verse, answers} = step;
    const {result, setResult} = useResult(step);
    const [chosen, setChosen] = useState<string | undefined>(undefined);
    const checkAnswer = (answer: string) => {
        setChosen(answer);
        if (answer === verse.verse) {
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
        <p className="short">{verse.reference}</p>
        <div className="panels">
        {answers.map(answer => {
            const className = getAnswerClassName(answer, verse, result, chosen);
            return (<button className={`answer panel ${className}`} onClick={() => checkAnswer(answer)}>{answer}</button>)
        })}
        </div>
      </Page>
    );
}