import { Verse } from "../../types";
import { KeywordsStep, Part } from "./keywords-builder";

const parseSections = (verse: Verse) => {
  const words = [];
  let i = 0;
  let currentWord = "";
  //   let t = 0;
  while (i < verse.sections.length) {
    const index1 = verse.sections.indexOf("[", i);
    if (index1 < 0) {
      currentWord += verse.sections.substring(i);
      if (currentWord) words.push(currentWord);
      break;
    }
    currentWord += verse.sections.substring(i, index1);
    if (currentWord) words.push(currentWord);

    const index2 = verse.sections.indexOf("]", index1);
    const innerWord = verse.sections.substring(index1, index2 + 1);

    words.push(innerWord);
    currentWord = "";
    i = index2 + 1;
    // t++;
    // if (t > 100) break;
  }
  //   console.log("sections:", words);
  return words;
};

export const buildSections = (verse: Verse): KeywordsStep => {
  const words = parseSections(verse);

  const parts: Part[] = [];
  const keywords: string[] = [];
  let currentPart = "";
  words.forEach((word) => {
    if (word.includes("[")) {
      currentPart += " " + word.split("[")[0];
      parts.push({
        type: "text",
        value: currentPart,
      });
      currentPart = word.split("]")[1];
      const keyword = word.split("[")[1].split("]")[0];
      parts.push({
        type: "keyword",
        value: keyword,
      });
      keywords.push(keyword);
    } else {
      currentPart += " " + word;
    }
  });

  if (currentPart !== "") {
    parts.push({
      type: "text",
      value: currentPart,
    });
  }

  return {
    verse,
    parts,
    keywords,
    type: "keywords" as const,
  };
};
