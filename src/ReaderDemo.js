import React, { useState } from 'react';

// REPLACE FOR LAUNCH: the illustrated reader and sample text are placeholders.
// Replace with approved book screenshots/video: read -> tap word -> save -> AI.
// Keep the tabs, explanations, accessible controls, and reduced-motion behavior.
const steps = [
  { label: 'Read a story', text: 'A quiet moment. A new world.', description: 'Start with a short story and meet new words in the places they naturally belong.' },
  { label: 'Discover a word', text: 'Follow a little curiosity.', description: 'Tap a word to explore its meaning without losing your place in the story.' },
  { label: 'Save it for later', text: 'Make the words yours.', description: 'Add a word to your study set so you can return to it beyond the page.' },
  { label: 'Practice with AI', text: 'From knowing to using.', description: 'Practice putting your saved words into sentences with AI.' }
];
function StoryPage({ onWord, interactive = true }) {
  return <div className="story-page"><div className="story-meta"><span>SHORT STORY · 日本語</span><span>01 / 08</span></div><div className="story-landscape" aria-hidden="true"><div className="landscape-sun" /><div className="landscape-hill hill-back" /><div className="landscape-hill hill-front" /><span>小さな旅</span></div><p className="story-kicker">CHAPTER ONE</p><h3>A small journey</h3><div lang="ja" className="japanese-story"><p>朝、私は小さな本屋に行きました。</p><p>窓のそばで、一冊の本を見つけました。</p><p>今日は新しい{interactive ? <button className="word-highlight" onClick={onWord} aria-label="Explore the word 物語, story">物語</button> : <mark className="word-highlight">物語</mark>}の始まりです。</p></div><div className="story-bottom"><span>Take your time. Enjoy the story.</span><span aria-hidden="true">↗</span></div></div>;
}
export default function ReaderDemo({ compact = false }) {
  const [step, setStep] = useState(0);
  const [saved, setSaved] = useState(false);
  const [showExample, setShowExample] = useState(false);
  if (compact) return <div className="hero-reader"><div className="reader-topbar"><span>alkkemi<span className="brand-dot">.</span></span><span>YOUR READING MOMENT</span></div><StoryPage interactive={false} /><p className="demo-label">Illustrative reading preview</p></div>;
  function chooseStep(index) { setStep(index); setShowExample(false); }
  return <div className="journey-demo"><div className="journey-controls" role="tablist" aria-label="Explore the reading journey">{steps.map((item, index) => <button key={item.label} id={`journey-tab-${index}`} role="tab" aria-selected={step === index} aria-controls="journey-panel" tabIndex={step === index ? 0 : -1} className={step === index ? 'selected' : ''} onClick={() => chooseStep(index)} onKeyDown={event => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % steps.length;
    if (event.key === 'ArrowLeft') next = (index + steps.length - 1) % steps.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = steps.length - 1;
    if (next !== undefined) { event.preventDefault(); chooseStep(next); document.getElementById(`journey-tab-${next}`)?.focus(); }
  }}><span>0{index + 1}</span>{item.label}<span className="step-arrow" aria-hidden="true">↗</span></button>)}</div><div id="journey-panel" role="tabpanel" aria-labelledby={`journey-tab-${step}`} tabIndex="0" className="journey-panel"><div className="demo-screen"><div className="demo-window-bar"><span className="window-dots" aria-hidden="true">● ● ●</span><span>THE ALKKEMI READING JOURNEY</span><span aria-hidden="true">✦</span></div>
    {step < 2 ? <><StoryPage onWord={() => chooseStep(1)} />{step === 1 && <div className="word-popover"><span className="eyebrow">A new word to know</span><h4 lang="ja">物語 <small>ものがたり</small></h4><p><strong>monogatari</strong> · noun</p><p>A story; a tale; a narrative.</p><button className="button button-primary button-small" onClick={() => { setSaved(true); chooseStep(2); }}>Add to study set <span aria-hidden="true">+</span></button></div>}</> : step === 2 ? <div className="study-screen"><p className="eyebrow">Your study set</p><h3>Words from your stories</h3><div className="saved-word"><span lang="ja">物語</span><div><strong>monogatari</strong><p>story · tale · narrative</p></div><span className="saved-check" aria-hidden="true">✓</span></div><p className="saved-status">{saved ? 'Added to your example study set.' : 'An example of a word saved from your story.'}</p><button className="button button-primary button-small" onClick={() => chooseStep(3)}>Practice this word <span aria-hidden="true">↗</span></button></div> : <div className="practice-screen"><p className="eyebrow">AI practice · example conversation</p><h3>Give your new word a voice.</h3><div className="chat-message"><span className="chat-avatar" aria-hidden="true">a.</span><p>Let’s use <strong lang="ja">物語</strong> (story). How would you say “I like this story” in Japanese?</p></div>{showExample ? <><div className="chat-message chat-user"><p lang="ja">この物語が好きです。</p></div><div className="chat-message"><span className="chat-avatar" aria-hidden="true">a.</span><p>That’s right! “この物語が好きです” means “I like this story.” You’ve used 物語 in a sentence.</p></div></> : <button className="button button-outline button-small" onClick={() => setShowExample(true)}>Show an example answer <span aria-hidden="true">↗</span></button>}</div>}
  </div><div className="demo-explanation"><p className="eyebrow">0{step + 1} / A little progress</p><h3>{steps[step].text}</h3><p>{steps[step].description}</p>{step === 0 && <button className="text-link" onClick={() => chooseStep(1)}>Try the highlighted word <span aria-hidden="true">↗</span></button>}{step > 0 && step < 3 && <button className="text-link" onClick={() => chooseStep(step + 1)}>Next step <span aria-hidden="true">→</span></button>}<p className="demo-disclaimer">Interactive concept demo. Sample story and AI responses illustrate the flow; the app’s appearance may differ.</p></div></div></div>;
}
