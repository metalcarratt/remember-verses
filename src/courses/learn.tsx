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
  const steps = [
      buildReferences(verse),
      buildKeywords(verse),
      buildSections(verse),
      buildMatchRefs(verse, otherVerses),
  ];
  const [step, setStep] = useState(0);
  
  
  const next = () => {
    const maxStep = steps.length - 1;
    if (step === maxStep) {
      setStep(0);
      back();
    }
    
    setStep(step + 1);
  }
  
  return (
    <div className="bg">
      {steps[step].type === 'reference' && <VerseReference step={steps[step]} next={next} back={back} />}
      {steps[step].type === 'matchref'  && <MatchReference step={steps[step]} next={next} back={back} />}
      {steps[step].type === 'keywords'  && <Keywords step={steps[step]} next={next} back={back} />}
    </div>
  )
}