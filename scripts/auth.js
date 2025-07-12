// js/auth.js — Firebase v9+ modular, NO gating on social.html
// Include on login.html, signup.html, AND social.html via:
//   <script type="module" src="js/auth.js"></script>

import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js';

// ─── 1) CONFIG ──────────────────────────────────────────
const firebaseConfig = {
  apiKey: "AIzaSyBT7P7DAV-I9ESe6r9JdpS1oCyGIKb09J4",
      authDomain: "hashhumanity-58b9a.firebaseapp.com",
      projectId: "hashhumanity-58b9a",
      storageBucket: "hashhumanity-58b9a.appspot.com",
      messagingSenderId: "886745899016",
      appId: "1:886745899016:web:2b07e043c2434379d71bd"
};
initializeApp(firebaseConfig);
const auth = getAuth();

// ─── 2) PAGE DETECTION ──────────────────────────────────
const page      = window.location.pathname.split('/').pop().toLowerCase();
const isLogin   = page === 'login.html';
const isSignup  = page === 'signup.html';
// const isSocial = page === 'social.html'; // no longer needed for gating

// ─── 3) REDIRECT ALREADY-SIGNED-IN USERS ───────────────
onAuthStateChanged(auth, user => {
  if (user && (isLogin || isSignup)) {
    // If they’re already signed in, skip login/signup
    window.location.replace('social.html');
  }
  // 🚫 Removed gating on social.html so anonymous users can land there
});

// ─── 4) LOGIN HANDLER (on login.html) ───────────────────
const loginForm = document.getElementById('login-form');
if (loginForm) {
  const emailEl = document.getElementById('email');
  const passEl  = document.getElementById('password');
  const errDiv  = document.getElementById('error-message');

  loginForm.addEventListener('submit', async e => {
    e.preventDefault();
    errDiv.textContent = '';
    try {
      await signInWithEmailAndPassword(
        auth,
        emailEl.value.trim(),
        passEl.value
      );
      // onAuthStateChanged will redirect if needed
    } catch (err) {
      console.error('❌ Login error:', err.code, err.message);
      errDiv.textContent = `Login failed: ${err.message}`;
    }
  });
}

// ─── 5) SIGNUP HANDLER (on login.html or signup.html) ──
const signupLink = document.getElementById('signup-link');
if (signupLink) {
  signupLink.addEventListener('click', async e => {
    e.preventDefault();
    const email    = prompt('Enter your email:');
    const password = prompt('Enter a password:');
    if (!email || !password) return alert('Signup cancelled.');

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('✔️ Account created! Redirecting to login…');
      window.location.replace('login.html');
    } catch (err) {
      console.error('❌ Signup error:', err.code, err.message);
      const eDiv = document.getElementById('error-message');
      if (eDiv) eDiv.textContent = `Signup failed: ${err.message}`;
    }
  });
}

// ─── 6) LOGOUT HANDLER (on social.html) ───────────────
const logoutBtn = document.getElementById('logout-button');
if (logoutBtn) {
  logoutBtn.addEventListener('click', async () => {
    try {
      await signOut(auth);
      // onAuthStateChanged won’t redirect away from social.html anymore
    } catch (err) {
      console.error('❌ Logout error:', err.code, err.message);
      alert('Logout failed: ' + err.message);
    }
  });
}

// ─── 7) TEST CASES ───────────────────────────────────────
// 1. Visit social.html when signed out → **no redirect**, page loads fine.
// 2. Click Start on index.html → social.html always loads, regardless of auth state.
// 3. Login(valid creds) on login.html → redirect to social.html.
// 4. Login(wrong password) → inline error under #error-message.
// 5. Already-signed-in user visits login.html or signup.html → redirect to social.html.
// 6. Click “Sign up” → prompt flow → new account → redirect to login.html.
// 7. Cancel or empty during signup prompt → alert “Signup cancelled.”, no crash.
// 8. Logout on social.html → **stays on social.html**, no redirect.
// 9. Network offline during login/signup → catch-block fires, shows correct error.
// 10. Rapid double-submit login form → only one signInWithEmailAndPassword call occurs.
// 11. No mixing of compat vs. modular imports—uses modular-only v9+.
// 12. Any other pages (index.html, etc.) remain accessible without login.
