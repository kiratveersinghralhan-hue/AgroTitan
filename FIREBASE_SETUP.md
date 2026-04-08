# Firebase setup for v68

This build is wired for Firebase Firestore, but you must paste your own Firebase project keys.

## 1. Create a Firebase project
- Open Firebase console
- Create a project
- Add a web app

## 2. Enable Firestore Database
- Create Firestore in production or test mode
- Create these collections automatically through the site:
  - `contactLeads`
  - `sellerLeads`
  - `callbacks`

## 3. Paste config into `backend-config.js`
Replace all placeholder values:
- `apiKey`
- `authDomain`
- `projectId`
- `storageBucket`
- `messagingSenderId`
- `appId`

## 4. Firestore rules for quick testing
Use restrictive rules later. For initial testing, you can temporarily use something like:

```txt
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

## 5. Deploy
After adding valid keys, the site will try Firebase first and only fall back to local storage if Firebase is unavailable.

## Important
This build does not include secure admin authentication yet.
Next step after this should be:
- Firebase Authentication
- admin-only dashboard rules
- protected writes/reads
