import { useState } from "react"
import { buildKeywords } from "../challenges/keywords/keywords-builder"
import { buildSections } from "../challenges/keywords/sections-builder"
import { buildMatchRefs } from "../challenges/match-reference-builder"
import { buildReferences } from "../challenges/reference-builder"
import { Verse } from "../types"
import { VerseReference } from "../challenges/reference"
import { MatchReference } from "../challenges/match-reference"
import { Keywords } from "../challenges/keywords/keywords"

type Props = {
    verse: Verse,
    otherVerses: Verse[],
    back: () => void
}

export const LearnCourse = ({verse, otherVerses, back}: Props) => {
  const [steps, setSteps] = useState([
      buildReferences(verse),
      buildKeywords(verse),
      buildSections(verse),
      buildMatchRefs(verse, otherVerses),
  ]);
  const [step, setStep] = useState(0);

  const [wrong, setWrong] = useState(0);
//   const markWrong = () => {
//     setWrong(wrong + 1);
//   }
  
  const next = (isWrong = false) => {
    // const maxStep = steps.length - 1;
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
      {steps[step].type === 'reference' && <VerseReference step={steps[step]} next={next} back={back} stepi={step} maxSteps={steps.length} />}
      {steps[step].type === 'matchref'  && <MatchReference step={steps[step]} next={next} back={back} stepi={step} maxSteps={steps.length} />}
      {steps[step].type === 'keywords'  && <Keywords step={steps[step]} next={next} back={back} stepi={step} maxSteps={steps.length} />}
    </div>
  )
}