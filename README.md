# QR SafeShare
QR SafeShare helps you securely split and recover passwords, recovery phrases, and notes with QR codes.  
Everything runs locally in your browser; nothing is stored online.

## 🔐 Why QR SafeShare?
Anyone in crypto knows: your recovery phrase **is the key** to your wallet (e.g., Ledger).  
Lose it, or let someone else get it, and your funds are gone. Storing it safely is therefore essential.  

With QR SafeShare, you can split your recovery phrase into multiple encrypted QR codes.  
- Example: create 3 codes but require only 2 to reconstruct (n-of-k).  
- Store one digitally, print one on paper, and put another in a safe or with someone you trust.  
- Without the required combination, the codes are useless — even a supercomputer cannot recover the secret.  

There’s also a convenient option when creating only **two QR codes**:  
You can generate a special link where one code is already “pre-scanned.” The recipient only needs to scan the second one.  
This allows you to share a password securely across **two separate channels** (e.g., SMS and email). One channel alone is useless; only both combined make it usable.  

## ✨ Features
- Split and recover passwords, recovery phrases, or free text.  
- **Two methods available:**  
  - Shamir Secret Sharing (n-of-k).  
  - XOR (2-of-2).  
- Recover secrets by scanning with the camera or uploading an image/payload.  
- **Offline & local-only**: no servers, no tracking.  
- **Multi-language support**: English and Dutch UI (preference stored in `localStorage:qrs_lang`).  
- **3D printing support**: export QR codes as **3MF files** ready for direct 3D printing.  
- **Flexible sharing**: generate secure links for 2-part secrets across multiple channels.

## 🚀 Live demo
Project is available at [https://qr.area404.nl](https://qr.area404.nl).

## 📱 Use as an App (PWA)  

QR SafeShare can also be installed as a **Progressive Web App (PWA)** for quick access, just like a native app.  

### On Android (Chrome / Edge / Brave)  
1. Open [qr.area404.nl](https://qr.area404.nl) in your browser.  
2. Tap the ⋮ menu and choose **“Add to Home screen”**.  
3. The app will now appear on your home screen and can run fullscreen.  

### On iOS (Safari)  
1. Open [qr.area404.nl](https://qr.area404.nl) in Safari.  
2. Tap the **Share** button (square with an arrow).  
3. Select **“Add to Home Screen”**.  
4. The app will now be available like a normal app.  

### On Desktop (Chrome / Edge / Brave)  
1. Open [qr.area404.nl](https://qr.area404.nl) in your browser.  
2. Click the **install icon** in the address bar (a little computer with a download arrow).  
   - Alternatively, open the ⋮ menu → **Install app**.  
3. QR SafeShare will be installed as a standalone application and can be launched directly from your Start menu or applications list.  

👉 Once installed, QR SafeShare can also be used **completely offline**, since all features run locally in your browser.  

## 🔧 Local use
No toolchain required. Clone/download and open the HTML files directly, or serve the folder with any static web server.

## 🛡️ Security & privacy
- All operations run entirely in the browser.  
- Designed for **convenience**, not as an ultimate vault. Always verify your backups and assess your threat model.  
- Be cautious when sharing QR images or payload text: anyone with sufficient shares can reconstruct the secret.  

## 📜 License  
This project is licensed under the **QR SafeShare License (Non-Commercial)**.  
See [LICENSE](./LICENSE) for full details.  

⚠️ Important:  
- Free for personal, educational, and research use.  
- Commercial use is **not allowed** without permission.  
- The original “Buy me a coffee” donation link must remain visible in all redistributions or forks.  

## ☕ Support this project
If you find this project useful and want to support its development, you can [buy me a coffee](https://buymeacoffee.com/qrsafeshare).

[![Buy Me A Coffee](https://img.buymeacoffee.com/button-api/?text=Buy%20me%20a%20coffee&emoji=☕&slug=qrsafeshare&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff)](https://buymeacoffee.com/qrsafeshare)
