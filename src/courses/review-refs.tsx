import { useState } from "react";
import { Verse } from "../types";
import { shuffleArray } from "../util/shuffle-array";
import { buildMatchContent } from "../challenges/match-content-builder";
import { MatchReference } from "../challenges/match-reference";
import { MatchContent } from "../challenges/match-content";
import { buildMatchRefs } from "../challenges/match-reference-builder";

type Props = {
    verses: Verse[],
    back: () => void
}

export const ReviewRefCourse = ({verses, back}: Props) => {
  const [step, setStep] = useState(0);
   
  const steps = [
    ...verses.map(verse => buildMatchRefs(verse, verses)),
    ...verses.map(verse => buildMatchContent(verse, verses)),
    // ...verses.map(verse => buildKeywords(verse.keywords, verse)),
    // ...verses.map(verse => buildKeywords(verse.keywords2, verse)),
    // ...verses.map(verse => buildKeywords(verse.keywords3, verse)),
    // ...verses.map(verse => buildSections(verse)),
  ];
  shuffleArray(steps);
  const maxStep = steps.length < 9 ? steps.length - 1 : 9;
  
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
      {steps[step].type === 'matchcontent' && <MatchContent   step={steps[step]} next={next} back={back} stepi={step} maxSteps={steps.length} />}
      {/* {steps[step].type === 'keywords'  && <Keywords step={steps[step]} next={next} back={back} stepi={step} maxSteps={maxStep + 1} />} */}
    </div>
  ) 
}