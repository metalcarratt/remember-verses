import { Page } from "../page";
import { KeywordsStep, Part } from "./keywords-builder";
import { useKeywords } from "./use-keywords";

type Props = {
    step: KeywordsStep,
    next: () => void
}

export const Keywords = ({step, next}: Props) => {
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
      <Page result={result} next={next}>
        <h2>{verse.reference}</h2>
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