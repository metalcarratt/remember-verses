import { useState } from "react"
import { buildKeywords } from "../challenges/keywords/keywords-builder"
import { buildSections } from "../challenges/keywords/sections-builder"
import { buildMatchRefs } from "../challenges/match-reference-builder"
import { buildReferences } from "../challenges/reference-builder"
import { Verse } from "../types"
import { VerseReference } from "../challenges/reference"
import { MatchReference } from "../challenges/match-reference"
import { Keywords } from "../challenges/keywords/keywords"
import { buildMatchContent } from "../challenges/match-content-builder"
import { MatchContent } from "../challenges/match-content"

type Props = {
    verse: Verse,
    otherVerses: Verse[],
    back: () => void
}

export const LearnCourse = ({verse, otherVerses, back}: Props) => {
  const [steps, setSteps] = useState([
      buildReferences(verse),
      buildKeywords(verse.keywords, verse),
      buildKeywords(verse.keywords2, verse),
      buildKeywords(verse.keywords3, verse),
      buildSections(verse),
      buildMatchContent(verse, otherVerses),
      buildMatchRefs(verse, otherVerses),
  ]);
  const [step, setStep] = useState(0);

  const [wrong, setWrong] = useState(0);
  
  const next = (isWrong = false) => {
    if (isWrong) {
        setSteps([...steps, steps[step]]);
        setWrong(wrong + 1);
    }

    if (step === steps.length - 1) {
      setStep(0);
      const score = Math.abs((1 - (wrong / steps.length)) * 100);
      localStorage.setItem(`score:${verse.reference}`, `${score}`);
      back();
    }
    
    setStep(step + 1);
  }
  
  return (
    <div className="bg">
      {steps[step].type === 'reference'    && <VerseReference step={steps[step]} next={next} back={back} stepi={step} maxSteps={steps.length} />}
      {steps[step].type === 'matchref'     && <MatchReference step={steps[step]} next={next} back={back} stepi={step} maxSteps={steps.length} />}
      {steps[step].type === 'matchcontent' && <MatchContent   step={steps[step]} next={next} back={back} stepi={step} maxSteps={steps.length} />}
      {steps[step].type === 'keywords'     && <Keywords       step={steps[step]} next={next} back={back} stepi={step} maxSteps={steps.length} />}
    </div>
  )
}