// auth.js — Firebase v9+ Modular SDK (via CDN)

// 1) CDN imports (browser must use <script type="module">)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";

// 2) Your Firebase project configuration
const firebaseConfig = {
  apiKey:      "YOUR_API_KEY",
  authDomain:  "YOUR_AUTH_DOMAIN",
  projectId:   "YOUR_PROJECT_ID",
  storageBucket:"YOUR_STORAGE_BUCKET",
  messagingSenderId:"YOUR_MESSAGING_SENDER_ID",
  appId:       "YOUR_APP_ID"
};

// 3) Initialize App & Auth
const app  = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 4) Element references
const loginForm   = document.getElementById("login-form");
const emailInput  = document.getElementById("email");
const passInput   = document.getElementById("password");
const errorDiv    = document.getElementById("error-message");
const signupLink  = document.getElementById("signup-link");
const logoutBtn   = document.getElementById("logout-button");
const statusLabel = document.getElementById("login-status");

// 5) Login flow
if (loginForm) {
  loginForm.addEventListener("submit", async e => {
    e.preventDefault();
    errorDiv.textContent = "";
    const email    = emailInput.value.trim();
    const password = passInput.value;

    console.log("🔐 Attempting login:", email);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("✅ Login successful");
      window.location.href = "social.html";
    } catch (err) {
      console.error("❌ Login error:", err.code, err.message);
      errorDiv.textContent = "Login failed: " + err.message;
    }
  });
}

// 6) Signup flow (popup)
if (signupLink) {
  signupLink.addEventListener("click", async e => {
    e.preventDefault();
    const email    = prompt("Enter your email:");
    const password = prompt("Enter a password:");
    if (!email || !password) return alert("Signup cancelled.");

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("✔️ Account created! Please log in.");
      window.location.href = "login.html";
    } catch (err) {
      console.error("❌ Signup error:", err.code, err.message);
      errorDiv.textContent = "Signup failed: " + err.message;
    }
  });
}

// 7) Logout flow
if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    try {
      await signOut(auth);
      alert("✔️ Logged out.");
      window.location.href = "login.html";
    } catch (err) {
      console.error("❌ Logout error:", err.code, err.message);
      errorDiv.textContent = "Logout failed: " + err.message;
    }
  });
}

// 8) Track auth state to update UI
onAuthStateChanged(auth, user => {
  if (user) {
    statusLabel.textContent = `Logged in as ${user.email}`;
    logoutBtn.style.display = "inline-block";
  } else {
    statusLabel.textContent = "Not logged in";
    logoutBtn.style.display = "none";
  }
});

// ──────────── Test Cases ────────────
// (Replace these with real automated tests when possible)
// 1. Login with valid credentials → redirect to social.html.
// 2. Login with wrong password → show error in #error-message.
// 3. Click “Sign up” and create new user → alert success, redirect to login.
// 4. Logout when logged in → alert success, redirect to login.
// 5. Auth persistence: reload page when logged in → statusLabel shows user.
// 6. Attempt login/signup with empty fields → should be cancelled/not crash.
// 7. Ensure `onAuthStateChanged` toggles visibility of logoutBtn correctly.
// 8. Simulate network failure (turn off Internet) → catch-block fires on login/signup.
// 9. Rapidly click login twice → only one network request should proceed.
// 10. Ensure console logs (“🔐 Attempting login”, “✅ Login successful”) appear as expected.

