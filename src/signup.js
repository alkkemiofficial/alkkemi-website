import React from 'react';
import { Link } from 'react-router-dom';

// REPLACE FOR LAUNCH: set REACT_APP_SIGNUP_URL to the mobile app's real HTTPS
// signup/onboarding entry point, or integrate its auth SDK in CreateAccount.js.
// This must use the SAME identity system as the phone app.
export const signupUrl = (() => {
  const value = process.env.REACT_APP_SIGNUP_URL;
  if (!value) return null;
  try { const url = new URL(value); return url.protocol === 'https:' ? url.href : null; }
  catch { return null; }
})();
export function SignupLink({ children, ...props }) {
  return signupUrl ? <a href={signupUrl} {...props}>{children}</a> : <Link to="/create-account" {...props}>{children}</Link>;
}
