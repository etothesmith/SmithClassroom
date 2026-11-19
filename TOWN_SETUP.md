# Going live with Grenadier Town (Firebase)

Until these steps are done, the Town runs in **practice mode**: everything works, but only on one device.

**Step 0: test the school network first.** On a school Chromebook on school Wi-Fi, open
<https://etothesmith.github.io/SmithClassroom/nettest.html> and send the screenshot to Claude.
Rows 1–4 need ✅. (gstatic is expected to be blocked; the Town doesn't use it.)

## 1. Create the Firebase project (about 15 minutes)
This is a **new project just for Smith's Classroom**, separate from Classroom Arena.

1. Go to <https://console.firebase.google.com>, then **Add project** and name it `smiths-classroom`. Google Analytics is optional.
2. **Build → Authentication → Get started → Sign-in method**, then enable:
   - **Anonymous** (students joining with a class code)
   - **Email/Password** (your teacher account)
3. **Authentication → Settings → Authorized domains → Add domain:** `etothesmith.github.io`
4. **Build → Firestore Database → Create database**, choose *Production mode* and location `nam5 (us-central)`.
5. **Firestore → Rules:** paste everything in `town/firestore.rules`, then **Publish**.
6. **Build → Realtime Database → Create database**, choose location *United States* and *Locked mode*.
7. **Realtime Database → Rules:** paste everything in `town/database.rules.json`, then **Publish**.
8. **Project settings (⚙️) → Your apps → Web (`</>`)**: register an app named `Smith's Classroom` and copy the `firebaseConfig` object. Make sure it includes `databaseURL`; if it doesn't, copy the URL shown at the top of the Realtime Database page and add it.

## 2. Connect the app
Send the `firebaseConfig` to Claude. Or paste it yourself into `town/config.js`, replacing `null`. GitHub Pages updates about a minute after the commit.

## 3. First class
1. Open Smith's Classroom, sign in to the **Teacher** tab, then go to **Town → Teacher: manage the Town**.
2. Choose **Create account** once with your school email and a password, then **New class period** for each period.
3. Put the 6-letter code on the board. Students go to **Town → Join your class** and enter the code, their first name and last initial, and a 4-digit PIN they make up.

## What it costs
The free **Spark** plan covers a class set: Firestore allows 50K reads and 20K writes a day, and the Realtime Database 10 GB a month of downloads. Plaza movement runs on the Realtime Database, which bills by data rather than by reads, so a full class walking around for a period stays well inside the free plan.

If the school blocks the Realtime Database (`*.firebaseio.com`), the plaza switches to Firestore on its own and updates more slowly. Heavy plaza use on several periods a day could then reach the daily Firestore limit. When that happens the Town pauses until midnight Pacific time, and your progress and saves are safe.

## Privacy and safety
- Students use their **first name and last initial only**. No email, no birthday, no photos.
- **Chat is preset phrases only.** Nobody can type free text. Each student sees phrases in their own language.
- You can **pause the Town**, **turn chat off**, **mute** a student, **reset a PIN**, **remove** a student, and **undo** any sale or trade.
- The chat log and every sale and trade are visible to you under **Town → Teacher: manage the Town**.
- Cloud saves hold the student's Smith's Classroom progress (coins, XP, certificates, avatar) and their game saves, keyed to the class code and name.

## Civic update (Town Hall, Bank, Jobs)
This update adds new Firestore collections, so the rules need to be published again: **Firestore Database → Rules**, paste everything in `town/firestore.rules`, then **Publish**. The Realtime Database rules didn't change.

Teacher controls live in **Town → Teacher: manage the Town**:
- **Class goal**: set a class XP target and pick the plaza upgrade it unlocks. The period-vs-period league updates on its own.
- **Economy events and the Fed**: set the weekly interest rate for the Town Bank, and start a one-day event (inflation, tariff, recession, boom or supply shock).
- **Elections and laws**: open sign-ups, open voting, then close the polls to count. When the mayor proposes a law, count the votes, or strike it down as the Supreme Court.
- **Plaza quiz**: pick a course, start a question, and reveal it. Use "Show on the board" to run it from the projector.

## Live, standards and the app (v2.1)

**Live tab (town/live.js).** Period Raids (Mon–Fri 7:00–1:30; right answers in class or in town hit the class boss), Quiz Duels, the weekly Town Feud debate, the weekly Mystery, high-fives, worker reviews, recommendation letters, "Jobs that fit you" and the Standards Passport.

- Teacher panel → **🔥 Live**: turn raids on/off, open raids all day (after school or for testing), and pick a **focus standard** (double raid damage, and it shows on every student's to-do).
- Teacher panel → **🛂 Standards**: class mastery for every standard, weakest first, with the names of students below 60%. 🎯 makes one the focus.
- Teacher panel → **⚖️ Feud arguments** and **⭐ Worker reviews**: read everything and delete anything.
- Job applications now show the student's match %, days of daily jobs finished, standards mastered, star reviews and letters.
- The projector board shows the raid boss and the top hitters above the chat.

**Standards.** `bank_plus.js` ties every question to a standard (Florida B.E.S.T. SS.912.E / FL / CG, or AP Macro / AP Gov course units) and adds 160 new questions (842 total).

**Firestore rules.** Publish `town/firestore.rules` again: it adds `raid`, `duels`, `feud`, `feudvotes`, `kudos`, `reviews` and `heist`.

**The app.** `manifest.webmanifest`, `sw.js` and `app.js` make the site installable (📲 in the top bar shows the steps for each device). Pages and scripts always load fresh from the network; the saved copy is only for offline use. Bump `VERSION` in `sw.js` and `APP_VERSION` + `NOTES` in `app.js` when you ship a new update, so students see "What's New" once.
