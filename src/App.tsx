import { useState } from 'react';
import './App.css'
import { Verse } from './types';
import { LearnCourse } from './courses/learn';
import { ReviewCourse } from './courses/review-verses';
import { ReviewRefCourse } from './courses/review-refs';

const verses = [
  {
    reference: 'John 3:16',
    verse: 'For God so loved the world that He gave His only begotten Son, that everyone who believes into Him would not perish, but would have eternal life.',
    keywords: 'For God so loved the [world] that He gave His only begotten [Son], that everyone who [believes] into Him would not perish, but would have [eternal] life.',
    keywords2: 'For God so [loved] the world that He gave His [only] begotten Son, that everyone who believes into Him would not [perish], but would have eternal [life].',
    keywords3: 'For [God] so loved the world that He gave His only [begotten] Son, that [everyone] who believes into Him would not perish, but [would] have eternal life.',
    sections: '[For God] [so loved] [the world] [that He gave] [His only begotten Son], [that everyone] [who believes] [into Him] [would not perish], [but would have] [eternal life].'
  },
  {
    reference: 'Romans 5:8',
    verse: 'But God commends His own love to us in that while we were yet sinners, Christ died for us.',
    keywords: 'But God commends His own [love] to us in that while we were yet [sinners], Christ [died] for [us].',
    keywords2: '[But] God commends His [own] love to us in that [while] we were yet sinners, [Christ] died for us.',
    keywords3: 'But God [commends] His own love to [us] in that while we were [yet] sinners, Christ died [for] us.',
    sections: '[But God] [commends] [His own love] [to us] [in that while] [we were] [yet sinners], [Christ died] [for us].'
  },
  {
    reference: 'Ephesians 2:4',
    verse: 'But God, being rich in mercy, because of His great love with which He loved us,',
    keywords: 'But [God], being rich in [mercy], because of His great [love] with which He [loved] us,',
    keywords2: 'But [God], being [rich] in mercy, because of His [great] love with which He loved [us],',
    keywords3: '[But] God, [being] rich in mercy, [because] of His great love [with] which He loved us,',
    sections: '[But God], [being rich] [in mercy], [because of] [His great love] [with which] [He loved us],'
  },
  {
    reference: 'Titus 3:4',
    verse: 'But when the kindness and the love to man of our Savior God appeared,',
    keywords: 'But when the [kindness] and the [love] to man of our [Savior] God [appeared],',
    keywords2: 'But [when] the kindness [and] the love to [man] of our Savior [God] appeared,',
    keywords3: '[But] when [the] kindness and the love [to] man of [our] Savior God appeared,',
    sections: '[But when] [the kindness] [and] [the love] [to man] [of our] [Savior God] [appeared],'
  },
  {
    reference: '1 John 4:10',
    verse: 'Herein is love, not that we have loved God but that He loved us and sent His Son as a propitiation for our sins.',
    keywords: 'Herein is [love], not that we have loved [God] but that He loved [us] and sent His Son as a propitiation for our [sins].',
    keywords2: '[Herein] is love, not that we have [loved] God but that He loved us and sent His [Son] as a propitiation for [our] sins.',
    keywords3: 'Herein is love, [not] that we have loved God [but] that He [loved] us and sent His Son as a [propitiation] for our sins.',
    sections: '[Herein] [is love], [not that] [we have] [loved God] [but that] [He loved us] [and sent] [His Son] [as a propitiation] [for our sins].',
  }
]

type Page = 'learn' | 'review' | 'reviewref' | 'overview';

function App() {
  const [page, setPage] = useState<Page>('overview');
  const [selectedVerse, setSelectedVerse] = useState<Verse | undefined>(undefined);

  const back = () => {
    setPage('overview');
    setSelectedVerse(undefined);
  }

  if (page === 'overview') {
    return  (
      <div className="bg">
        <div className="verse">
          <h2><span />Learn</h2>
          { verses.map(verse => {
            const score = localStorage.getItem(`score:${verse.reference}`) || '';
            return (
              <div className="menuItem" onClick={() => {setPage('learn'); setSelectedVerse(verse);}}>
                <span>{verse.reference} ▶</span>
                <span>{score ? score + '%' : ''}</span>
              </div>
            )
          })}
          <h2><span />Review</h2>
          <div className="menuItem" onClick={() => {setPage('review')}}>Review verses ▶</div>
          <div className="menuItem" onClick={() => {setPage('reviewref')}}>Review verse references ▶</div>
        </div>
      </div>
    );
  }

  if (page === 'learn' && selectedVerse) {
    return  (
      <div className="bg">
        <LearnCourse verse={selectedVerse} otherVerses={verses} back={back} />
      </div>
    );
  }

  if (page === 'review') {
    return (
      <div className="bg">
        <ReviewCourse verses={verses} back={back} />
      </div>
    )
  }

  if (page === 'reviewref') {
    return (
      <div className="bg">
        <ReviewRefCourse verses={verses} back={back} />
      </div>
    )
  }
}

export default App;
