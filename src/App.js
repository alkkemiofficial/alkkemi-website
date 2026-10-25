import React from 'react';
import { Link } from 'react-router-dom';
import SiteLayout from './SiteLayout';
import ReaderDemo from './ReaderDemo';
import { SignupLink } from './signup';

export default function App() {
  return <SiteLayout>
    <section className="hero section-shell">
      <div className="hero-copy">
        <p className="eyebrow"><span /> A new chapter in language learning</p>
        <h1>Little stories.<br />Real <em>progress.</em></h1>
        <p className="hero-description">Learn Japanese and Korean through books. Discover a new word, make it yours, and bring it to life with AI practice.</p>
        <div className="hero-actions"><SignupLink className="button button-primary">Create an account <span aria-hidden="true">↗</span></SignupLink><a className="text-link" href="#how-it-works">See how it works <span aria-hidden="true">↓</span></a></div>
        <p className="hero-note">Start here. Continue your learning in the Alkkemi app.</p>
        <div className="language-note"><span lang="ja">日本語</span><span className="note-divider" /><span lang="ko">한국어</span><span>Two languages. A world of stories.</span></div>
      </div>
      <div className="hero-visual"><div className="visual-orbit" /><div className="visual-caption"><span className="little-star" aria-hidden="true">✦</span> One page at a time.</div><ReaderDemo compact /><div className="reading-badge"><span aria-hidden="true">あ</span><div>A word today.<br /><strong>A little more confidence tomorrow.</strong></div></div></div>
    </section>
    <div className="belief-strip"><p>Less memorizing in isolation. <strong>More learning in context.</strong></p><span aria-hidden="true">✦</span><p>Read. Discover. Practice. Repeat.</p></div>
    <section id="how-it-works" className="section-shell journey-section"><div className="section-heading"><div><p className="eyebrow">From the page to your everyday</p><h2>A good story stays with you.<br /><em>So should the words.</em></h2></div><p>Follow your curiosity through a short story, then turn the words you find into language you can use.</p></div><ReaderDemo /></section>
    <section className="why-section"><div className="section-shell why-layout">
      <div className="why-art" aria-hidden="true"><div className="book-spine spine-one">A LITTLE EVERY DAY</div><div className="book-spine spine-two">THE NEXT CHAPTER</div><div className="book-cover"><span>THE ART OF</span><strong>small<br />beginnings.</strong><div className="cover-sun" /><span>A STORY WORTH STARTING</span></div><img src="/logo.png" alt="" loading="lazy" /></div>
      <div className="why-copy"><p className="eyebrow">Made for the way you learn</p><h2>Find your story.<br /><em>Build your rhythm.</em></h2><p>You don’t need to find hours in your day. You need something that makes you want to come back.</p>{[['Words with a world around them', 'Learn vocabulary inside a story, where the meaning has somewhere to belong.'], ['Your discoveries, your study set', 'Keep the words that catch your attention and come back to them when you’re ready.'], ['A little practice goes a long way', 'Use the words you’ve saved in AI practice, one small step at a time.']].map(([title, text], index) => <div className="benefit" key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></div>)}</div>
    </div></section>
    <section className="section-shell about-teaser"><p className="eyebrow">The heart of Alkkemi</p><h2>“It doesn’t have to be often,<br /><em>it just has to be consistent.”</em></h2><p>A belief that shapes what we build, and how we hope you’ll learn.</p><div className="hero-actions"><Link to="/our-story" className="text-link">Our story <span aria-hidden="true">↗</span></Link><Link to="/founders" className="text-link">Meet the founders <span aria-hidden="true">↗</span></Link></div></section>
    <section className="section-shell faq-section"><div><p className="eyebrow">A few things to know</p><h2>Your next chapter,<br /><em>explained.</em></h2></div><div className="faq-list">{[
      ['How do I learn with Alkkemi?', 'Start with a book or short story in the app. Explore a word as you read, add it to a study set, then practice using it with AI.'],
      ['Which languages can I learn?', 'Alkkemi focuses on Japanese and Korean.'],
      ['Can I read books on the website?', 'Reading and practice happen in the mobile app. Website signup is designed to help you set up your account and learning preferences before you sign in on your phone.'],
      ['Where can I get help?', 'Email alkkemi.official@gmail.com with questions about Alkkemi or your account.']
    ].map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>
    <section className="closing-cta"><div className="section-shell"><p className="eyebrow">Every story starts somewhere</p><h2>Let this be<br /><em>your first page.</em></h2><SignupLink className="button button-light">Create an account <span aria-hidden="true">↗</span></SignupLink><p>Set up here. Read and practice in the app.</p></div></section>
  </SiteLayout>;
}
