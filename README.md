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

## 🚀 Live demo
Project is available at [https://qr.area404.nl](https://qr.area404.nl).

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

## 🔧 Local use
No toolchain required. Clone/download and open the HTML files directly, or serve the folder with any static web server.

## 🛡️ Security & privacy
- All operations run entirely in the browser.  
- Designed for **convenience**, not as an ultimate vault. Always verify your backups and assess your threat model.  
- Be cautious when sharing QR images or payload text: anyone with sufficient shares can reconstruct the secret.  

## 📜 License
Licensed under the **MIT License**. See [`LICENSE`](LICENSE) for details.

## ☕ Support this project
If you find this project useful and want to support its development, you can [buy me a coffee](https://buymeacoffee.com/qrsafeshare).

[![Buy Me A Coffee](https://img.buymeacoffee.com/button-api/?text=Buy%20me%20a%20coffee&emoji=☕&slug=qrsafeshare&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff)](https://buymeacoffee.com/qrsafeshare)
