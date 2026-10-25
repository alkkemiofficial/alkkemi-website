import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import CreateAccount from './CreateAccount';
import Founders from './Founders';
import OurStory from './OurStory';

function renderWebsite(path = '/') {
  return render(<MemoryRouter initialEntries={[path]}><Routes><Route path="/" element={<App />} /><Route path="/create-account" element={<CreateAccount />} /><Route path="/founders" element={<Founders />} /><Route path="/our-story" element={<OurStory />} /></Routes></MemoryRouter>);
}

test('a visitor can follow a word from a story into a study set and example practice', () => {
  renderWebsite();
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Little stories.Real progress.');
  expect(screen.queryByText(/join the waitlist/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/dictionary/i)).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: /explore the word/i }));
  fireEvent.click(screen.getByRole('button', { name: /add to study set/i }));
  expect(screen.getByText('Added to your example study set.')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: /practice this word/i }));
  fireEvent.click(screen.getByRole('button', { name: /show an example answer/i }));
  expect(screen.getByText('この物語が好きです。')).toBeInTheDocument();
});

test('tour tabs support keyboard navigation', () => {
  renderWebsite();
  const first = screen.getByRole('tab', { name: /read a story/i });
  first.focus();
  fireEvent.keyDown(first, { key: 'ArrowRight' });
  const second = screen.getByRole('tab', { name: /discover a word/i });
  expect(second).toHaveFocus();
  expect(second).toHaveAttribute('aria-selected', 'true');
  expect(screen.getByRole('tabpanel')).toHaveAttribute('aria-labelledby', second.id);
});

test('signup preview preserves chosen preferences without claiming account creation', () => {
  renderWebsite();
  fireEvent.click(screen.getAllByRole('link', { name: /create an account/i })[0]);
  expect(screen.getByText('Signup preview · No account will be created')).toBeInTheDocument();
  expect(screen.queryByLabelText(/password/i)).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('radio', { name: /korean/i }));
  fireEvent.click(screen.getByRole('button', { name: /continue preview/i }));
  fireEvent.click(screen.getByRole('radio', { name: /build everyday confidence/i }));
  fireEvent.click(screen.getByRole('button', { name: /preview app handoff/i }));
  expect(screen.getByText('Korean', { selector: 'strong' })).toBeInTheDocument();
  expect(screen.getByText(/No account or preferences have been saved/)).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: /restart preview/i }));
  expect(screen.getByRole('radio', { name: /korean/i })).toBeChecked();
});

test('mobile menu supports Escape and links reach the separate pages', () => {
  renderWebsite();
  const menu = screen.getByRole('button', { name: /menu/i });
  fireEvent.click(menu);
  expect(menu).toHaveAttribute('aria-expanded', 'true');
  fireEvent.keyDown(document, { key: 'Escape' });
  expect(menu).toHaveAttribute('aria-expanded', 'false');
  expect(menu).toHaveFocus();
  fireEvent.click(screen.getAllByRole('link', { name: /the founders/i })[0]);
  expect(screen.getByRole('heading', { name: /rachel krantz/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /deepak pagadala/i })).toBeInTheDocument();
  fireEvent.click(screen.getAllByRole('link', { name: /^our story$/i })[0]);
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Built arounda simple belief.');
});
