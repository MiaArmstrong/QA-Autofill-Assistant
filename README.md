# QA Autofill Assistant

A Chrome extension that lets QA engineers quickly autofill input fields with realistic test data using Faker.

---

## 🚀 Features
- One-click autofill for names, emails, VINs, tire sizes, etc.
- Supports React/Angular input fields
- Faker.js-powered test data
- Toggle extension on/off easily

---

## 📦 Installation
1. Clone or download this repo
2. Run the build:
   ```bash
   npm install
   npm run build
   ```
3. Go to `chrome://extensions`
4. Enable **Developer Mode**
5. Click **Load Unpacked** and select the project folder

---

## 🔧 Dev Scripts
- `npm run build` — bundles faker for use in the extension

---

## 🗂 Files to Include When Sharing
```
background.js
content.js
popup.js
popup.html
highlight.css
icon.png
manifest.json
faker-bundle.js
```
> Do not include `node_modules`, `src`, or `package.json` in production zip

---

## ✅ Usage
1. Click into an input field on any website
2. Click the extension icon
3. Select the test data type from dropdown
4. Field gets auto-filled!

---