# Alkkemi launch handoff

This redesign is a local draft. Signup, onboarding questions, and reading visuals
are explicitly placeholders, as requested. No account creation or live AI calls
take place. Existing legal text is preserved.

## Replacement map

| Item | Where to replace | Needed |
| --- | --- | --- |
| Brand colors | `src/App.css`, `:root` | Approved blue, orange, light blue and backgrounds. Current colors are sampled approximately from the existing mascot. Update theme colors in `public/index.html` and `public/manifest.json` to match. |
| Hero reading preview | `src/ReaderDemo.js`, `compact` branch and `StoryPage` | Approved book-reading screenshot. Current art and story are illustrative HTML/CSS, not app screenshots. |
| Four-step product tour | `src/ReaderDemo.js` | Screenshots showing reading, tapping a word, saving to a study set, and practicing the saved word with AI. Keep image descriptions and responsive dimensions. Remove concept labels only after using actual app media. |
| Optional video | Replace the demo-screen region in `src/ReaderDemo.js` | A captioned clip and poster. If autoplay is used, play muted/inline only while in view; pause when offscreen and respect reduced motion. Screenshots are the current chosen approach. |
| Real signup | `src/signup.js` and `src/CreateAccount.js` | Same authentication provider and identities as the phone app, including email verification, errors, existing users and sessions. Set `REACT_APP_SIGNUP_URL` to the real HTTPS hosted signup URL to redirect all CTAs, OR integrate the app's SDK/API into CreateAccount. |
| Real onboarding | `src/CreateAccount.js` | Exact app questions, validation, order, and server persistence. Current language/goal choices demonstrate layout only. |
| Mobile handoff | Final step in `src/CreateAccount.js` | Approved app store URLs/deep links. Show real account success only after server confirmation; never show the app home page on the website. |
| Founder photos/bios | `src/Founders.js` | Existing photos and qualifications are retained. Replace with approved new assets/bios if needed. |
| Origin story | `src/OurStory.js` | Approved account of how the founders met and Alkkemi began. Current text reflects the existing mission and does not invent a founding history. |

## Routes

- `/`: book-focused landing page with interactive concept demo.
- `/our-story`: mission and values.
- `/founders`: founder profiles.
- `/create-account`: explicitly labelled, in-memory onboarding preview.
- `/privacy-policy`, `/terms-conditions`: existing legal documents in the new shell.
- Other routes: not-found page.

The previous waitlist form and unrelated product promotions have been removed.
The dictionary is not promoted. Existing old mockups remain in `public/` but are
not displayed, since they describe outdated offerings.

## Development and deployment

Run `npm start`, `npm test -- --watchAll=false`, and `npm run build`.
On this machine Node is installed in `C:\Program Files\nodejs`; restart the
terminal or add that directory to its PATH if `node`/`npm` are not recognized.
Serve `build/` with an SPA rewrite to `/index.html` so direct links to the new
routes work on the existing hosting provider. No new hosting service is required.

`REACT_APP_*` settings are public build-time values. Never place private API keys
or server credentials in them. Signup URL changes require a rebuild.

Google Analytics' existing tag remains in `public/index.html`. Old waitlist event
handlers were removed with the old page. Define the launch signup/conversion
events when integrating the real account flow, and do not include personal data.

The Jest module-name mapping in `package.json` lets Create React App's older Jest
resolver load React Router 7's real DOM exports. It does not mock routing. Tests
cover the reading journey, keyboard tabs, mobile navigation, page links, and the
signup preview. Remove this compatibility mapping when upgrading the test runner
to one that understands package subpath exports.
