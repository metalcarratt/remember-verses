import { Page } from "../page";
import { KeywordsStep, Part } from "./keywords-builder";
import { useKeywords } from "./use-keywords";

type Props = {
    step: KeywordsStep,
    stepi: number,
    maxSteps: number,
    next: (wrong: boolean) => void,
    back: () => void
}

export const Keywords = ({step, next, back, stepi, maxSteps}: Props) => {
    const { clickAnswer, returnAnswer, keywords, slots, verse, parts, answers, result, check } = useKeywords(step);

    const keywordPart = (part: Part) => {
        if (part.type === 'text') {
            return <span>{part.value}</span>
        }
        
        const sindex = keywords.findIndex(keyword => part.value === keyword);
        if (slots[sindex]) {
            return <span className="inline-word" onClick={() => returnAnswer(sindex)}>{slots[sindex]}</span>;    
        }

        return <span className="inline-blank" />;
    }

    return (
      <Page result={result} next={next} step={stepi} maxStep={maxSteps}>
        <h2>
          <a href="#" onClick={back} className="backBtn">◀</a>
          {verse.reference}
        </h2>
        <span className="h2-foot">
          <span className="h2-foot-1"></span>
          <span className="h2-foot-2"></span>
        </span>
        <p>{parts.map(part => keywordPart(part))}</p>
        <div className="keywords">
            {answers.map(answer => 
                (<button className="answer" onClick={() => clickAnswer(answer)}>{answer}</button>)
            )}
        </div>
        {answers.length === 0 && result === undefined && <button onClick={check}>Check</button>}
      </Page>
    );
}