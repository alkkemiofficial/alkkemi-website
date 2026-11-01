import React, { useState } from 'react';

const steps = [
  {
    label: 'Read a story',
    text: 'A quiet moment. A new world.',
    description: 'Start with a short story and meet new words in the places they naturally belong.',
    image: '/app-reader.png',
    alt: 'Alkkemi reader showing a Japanese story with a word selected'
  },
  {
    label: 'Discover a word',
    text: 'Follow a little curiosity.',
    description: 'Open a word to see its reading, meaning, and context without losing your place.',
    image: '/app-word-detail.png',
    alt: 'Alkkemi word detail screen for a word selected from a story'
  },
  {
    label: 'Save it for later',
    text: 'Make the words yours.',
    description: 'Keep unfamiliar words in a study set so you can return to them beyond the page.',
    image: '/app-study-set.png',
    alt: 'Alkkemi study set containing a saved Japanese vocabulary word'
  },
  {
    label: 'Practice your word',
    text: 'From knowing to using.',
    description: 'Choose a focused exercise and practice recalling or applying the words you saved.',
    image: '/app-practice.png',
    alt: 'Alkkemi practice screen with word typing, fill in the blank, and translation exercises'
  }
];

function PhoneMockup({ image, alt, featured = false }) {
  return <div className={`phone-scene${featured ? ' phone-scene-featured' : ''}`}>
    <span className="phone-scene-glow" aria-hidden="true" />
    <div className="iphone-mockup">
      <span className="iphone-button iphone-button-action" aria-hidden="true" />
      <span className="iphone-button iphone-button-volume-up" aria-hidden="true" />
      <span className="iphone-button iphone-button-volume-down" aria-hidden="true" />
      <span className="iphone-button iphone-button-power" aria-hidden="true" />
      <div className="iphone-screen">
        <img src={image} alt={alt} />
        <span className="dynamic-island" aria-hidden="true"><i /></span>
        <span className="screen-glass" aria-hidden="true" />
      </div>
    </div>
  </div>;
}

export default function ReaderDemo({ compact = false }) {
  const [step, setStep] = useState(0);

  if (compact) {
    return <div className="hero-reader">
      <div className="reader-topbar"><span>alkkemi<span className="brand-dot">.</span></span><span>INSIDE THE APP</span></div>
      <div className="hero-app-screen"><PhoneMockup image={steps[0].image} alt={steps[0].alt} featured /></div>
      <p className="demo-label">Captured from the Alkkemi iOS app</p>
    </div>;
  }

  function chooseStep(index) {
    setStep(index);
  }

  return <div className="journey-demo">
    <div className="journey-controls" role="tablist" aria-label="Explore the reading journey">
      {steps.map((item, index) => <button
        key={item.label}
        id={`journey-tab-${index}`}
        role="tab"
        aria-selected={step === index}
        aria-controls="journey-panel"
        tabIndex={step === index ? 0 : -1}
        className={step === index ? 'selected' : ''}
        onClick={() => chooseStep(index)}
        onKeyDown={event => {
          let next;
          if (event.key === 'ArrowRight') next = (index + 1) % steps.length;
          if (event.key === 'ArrowLeft') next = (index + steps.length - 1) % steps.length;
          if (event.key === 'Home') next = 0;
          if (event.key === 'End') next = steps.length - 1;
          if (next !== undefined) {
            event.preventDefault();
            chooseStep(next);
            document.getElementById(`journey-tab-${next}`)?.focus();
          }
        }}
      ><span>0{index + 1}</span>{item.label}<span className="step-arrow" aria-hidden="true">↗</span></button>)}
    </div>
    <div id="journey-panel" role="tabpanel" aria-labelledby={`journey-tab-${step}`} tabIndex="0" className="journey-panel">
      <div className="demo-screen">
        <div className="demo-window-bar"><span className="window-dots" aria-hidden="true">● ● ●</span><span>THE ALKKEMI READING JOURNEY</span><span aria-hidden="true">✦</span></div>
        <div className="app-screenshot"><PhoneMockup image={steps[step].image} alt={steps[step].alt} /></div>
      </div>
      <div className="demo-explanation">
        <p className="eyebrow">0{step + 1} / A little progress</p>
        <h3>{steps[step].text}</h3>
        <p>{steps[step].description}</p>
        {step < steps.length - 1 && <button className="text-link" onClick={() => chooseStep(step + 1)}>Next step <span aria-hidden="true">→</span></button>}
        <p className="demo-disclaimer">Screens captured from the Alkkemi iOS app. Content and availability may change.</p>
      </div>
    </div>
  </div>;
}
