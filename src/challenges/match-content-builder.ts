import { Verse } from "../types";
import { shuffleArray } from "../util/shuffle-array";

export type MatchContentStep = {
  verse: Verse;
  type: "matchcontent";
  answers: string[];
};

export const buildMatchContent = (
  verse: Verse,
  verses: Verse[]
): MatchContentStep => {
  const contents = verses
    .map((verse2) =>
      verse2.reference !== verse.reference ? verse2.verse : undefined
    )
    .filter((v) => v !== undefined);
  shuffleArray(contents);
  const conts2 = [verse.verse, contents[0], contents[1], contents[2]];
  shuffleArray(conts2);
  return {
    verse,
    type: "matchcontent" as const,
    answers: conts2,
  };
};
