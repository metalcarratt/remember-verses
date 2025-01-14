import { useState } from "react";
import { Keywords } from "../challenges/keywords/keywords";
import { MatchReference } from "../challenges/match-reference";
import { Verse } from "../types";
import { buildMatchRefs } from "../challenges/match-reference-builder";
import { buildKeywords } from "../challenges/keywords/keywords-builder";
import { buildSections } from "../challenges/keywords/sections-builder";
import { shuffleArray } from "../util/shuffle-array";

type Props = {
    verses: Verse[],
    back: () => void
}

export const ReviewCourse = ({verses, back}: Props) => {
  const [step, setStep] = useState(0);
   
  const steps = [
    ...verses.map(verse => buildMatchRefs(verse, verses)),
    ...verses.map(verse => buildKeywords(verse.keywords, verse)),
    ...verses.map(verse => buildKeywords(verse.keywords2, verse)),
    ...verses.map(verse => buildKeywords(verse.keywords3, verse)),
    ...verses.map(verse => buildSections(verse)),
  ];
  shuffleArray(steps);
  const maxStep = steps.length < 19 ? steps.length - 1 : 19;
  
  const next = () => {
    // const maxStep = steps.length < 19 ? steps.length - 1 : 19;
    if (step === maxStep) {
      setStep(0);
      back();
    }
      
    setStep(step + 1);
  }
  
  return (
    <div className="bg">
      {steps[step].type === 'matchref'  && <MatchReference step={steps[step]} next={next} back={back} stepi={step} maxSteps={maxStep + 1} />}
      {steps[step].type === 'keywords'  && <Keywords step={steps[step]} next={next} back={back} stepi={step} maxSteps={maxStep + 1} />}
    </div>
  ) 
}