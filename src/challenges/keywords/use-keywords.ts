import { useEffect, useState } from "react";
import { shuffleArray } from "../../util/shuffle-array";
import { KeywordsStep } from "./keywords-builder";
import { useResult } from "../use-result";

export const useKeywords = (step: KeywordsStep) => {
  const { verse, parts, keywords } = step;
  const { result, setResult } = useResult(step);

  const a1 = [...keywords];
  shuffleArray(a1);
  const [answers, setAnswers] = useState(a1);
  const [slots, setSlots] = useState<string[]>(keywords.map((_) => ""));
  const [slotIndex, setSlotIndex] = useState<number>(0);

  useEffect(() => {
    const a1 = [...keywords];
    shuffleArray(a1);
    setAnswers(a1);
    setSlots(keywords.map((_) => ""));
    setSlotIndex(0);
  }, [step]);

  const clickAnswer = (answer: string) => {
    const newSlots = [...slots];
    newSlots[slotIndex] = answer;
    setSlots(newSlots);

    const newSlotIndex = newSlots.findIndex((s) => s === "");
    setSlotIndex(newSlotIndex);

    const newAnswers = [...answers];
    newAnswers.splice(answers.indexOf(answer), 1);
    setAnswers(newAnswers);
  };

  const returnAnswer = (index: number) => {
    const answer = slots[index];

    const newSlots = [...slots];
    newSlots[index] = "";
    setSlots(newSlots);

    const newSlotIndex = newSlots.findIndex((s) => s === "");
    setSlotIndex(newSlotIndex);

    const newAnswers = [...answers];
    newAnswers.push(answer);
    setAnswers(newAnswers);
  };

  const check = () => {
    let correct = 0;
    keywords.forEach((keyword, kindex) => {
      if (keyword === slots[kindex]) correct++;
    });
    if (correct === keywords.length) {
      setResult("Correct");
    } else {
      setResult("Incorrect");
    }
  };

  return {
    clickAnswer,
    returnAnswer,
    check,
    slots,
    verse,
    parts,
    keywords,
    answers,
    result,
  };
};
