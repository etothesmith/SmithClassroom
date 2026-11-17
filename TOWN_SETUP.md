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
