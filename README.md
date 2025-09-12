# QR SafeShare
QR SafeShare helps you securely split and recover passwords, recovery phrases, and notes with QR codes.  
Everything runs locally in your browser; nothing is stored online.

## 🔐 Why QR SafeShare?
Anyone who owns crypto knows the importance of the recovery phrase. It’s the key to your wallet (for example, with a Ledger). If you lose it, or if someone else gets access to it, your crypto is gone. Storing these words safely is therefore crucial.  

With QR SafeShare you can split your recovery phrase into multiple encrypted QR codes. For example, you can create three QR codes but only need two of them to reconstruct the phrase. This gives you flexibility: one can be stored digitally, one printed on paper, and one placed in a safe or entrusted to someone you know. Without the required combination, the QR codes are useless, even a supercomputer can’t reconstruct the secret.  

There’s also a handy option if you only create two QR codes. You can generate a special link where one QR code is already “pre-scanned,” so the recipient only needs to scan the second one. This can be useful for sharing a password across two different channels (for example SMS and email). The advantage is that someone with access to just one channel cannot do anything with it; only when both parts are combined does it become usable.  

## 🚀 Live demo
Project is available at [https://qr.area404.nl](https://qr.area404.nl).

## ✨ Features
- Split **passwords**, **recovery phrases**, or **free text** into multiple QR codes.
- Two methods: **Shamir (n-of-k)** and **XOR (2-of-2)**.
- Recover by **scanning** with the camera or **uploading** an image/payload.
- **Offline/local-only**: no servers, no tracking.
- English and Dutch UI (separate pages; preference stored in `localStorage:qrs_lang`).

## 🔧 Local use
No toolchain required. Clone/download and open the HTML files directly, or serve the folder with any static web server.

## 🛡️ Security & privacy
- All operations run entirely in the browser.
- This project is designed for convenience; always verify your backups and your threat model.
- Be careful when sharing QR images or payload text: anyone with sufficient shares can reconstruct the secret.

## 📜 License
Licensed under the **MIT License**. See [`LICENSE`](LICENSE) for details.

## ☕ Support this project
If you find this project useful and want to support its development, you can [buy me a coffee](https://buymeacoffee.com/qrsafeshare).

[![Buy Me A Coffee](https://img.buymeacoffee.com/button-api/?text=Buy%20me%20a%20coffee&emoji=☕&slug=qrsafeshare&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff)](https://buymeacoffee.com/qrsafeshare)
