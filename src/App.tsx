import { useState } from 'react';
import './App.css'
import { VerseReference } from './challenges/reference';
import { MatchReference } from './challenges/match-reference';
import { buildMatchRefs, MatchRefStep } from './challenges/match-reference-builder';
import { buildReferences, ReferenceStep } from './challenges/reference-builder';
import { buildKeywords, KeywordsStep } from './challenges/keywords/keywords-builder';
import { Keywords } from './challenges/keywords/keywords';
import { buildSections } from './challenges/keywords/sections-builder';

const verses = [
  {
    reference: 'John 3:16',
    verse: 'For God so loved the world that He gave His only begotten Son, that everyone who believes into Him would not perish, but would have eternal life.',
    keywords: 'For God so loved the [world] that He gave His only begotten [Son], that everyone who [believes] into Him would not perish, but would have [eternal] life.',
    sections: '[For God] [so loved] [the world] [that He gave] [His only begotten Son], [that everyone] [who believes] [into Him] [would not perish], [but would have] [eternal life].'
  },
  {
    reference: 'Romans 5:8',
    verse: 'But God commends His own love to us in that while we were yet sinners, Christ died for us.',
    keywords: 'But God commends His own [love] to us in that while we were yet [sinners], Christ [died] for [us].',
    sections: '[But God] [commends] [His own love] [to us] [in that while] [we were] [yet sinners], [Christ died] [for us].'
  },
  {
    reference: 'Ephesians 2:4',
    verse: 'But God, being rich in mercy, because of His great love with which He loved us,',
    keywords: 'But [God], being rich in [mercy], because of His great [love] with which He [loved] us,',
    sections: '[But God], [being rich] [in mercy], [because of] [His great love] [with which] [He loved us],'
  },
  {
    reference: 'Titus 3:4',
    verse: 'But when the kindness and the love to man of our Savior God appeared,',
    keywords: 'But when the [kindness] and the [love]to man of our [Savior] God [appeared],',
    sections: '[But when] [the kindness] [and] [the love] [to man] [of our] [Savior God] [appeared],'
  },
  {
    reference: '1 John 4:10',
    verse: 'Herein is love, not that we have loved God but that He loved us and sent His Son as a propitiation for our sins.',
    keywords: 'Herein is [love], not that we have loved [God] but that He loved [us] and sent His Son as a propitiation for our [sins].',
    sections: '[Herein] [is love], [not that] [we have] [loved God] [but that] [He loved us] [and sent] [His Son] [as a propitiation] [for our sins].',
  }
]

type Step = ReferenceStep | MatchRefStep | KeywordsStep;

const calculateSteps = (): Step[] => {
  return [
    ...verses.map(verse => buildReferences(verse)),
    ...verses.map(verse => buildMatchRefs(verse, verses)),
    ...verses.map(verse => buildKeywords(verse)),
    ...verses.map(verse => buildSections(verse)),
  ];
}

function App() {

  const [step, setStep] = useState(0);

  const steps = calculateSteps();

  const next = () => {
    const maxStep = steps.length - 1;
    if (step === maxStep) {
      setStep(0);
      return;
      // or, exit
    }
    
    setStep(step + 1);
  }

  return (
    <div className="bg">
      {steps[step].type === 'reference' && <VerseReference step={steps[step]} next={next} />}
      {steps[step].type === 'matchref'  && <MatchReference step={steps[step]} next={next} />}
      {steps[step].type === 'keywords'  && <Keywords step={steps[step]} next={next} />}
    </div>
  )
}

export default App
