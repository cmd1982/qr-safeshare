# QR SafeShare

QR SafeShare is a free and open source tool that lets you split and combine secrets (passwords, recovery phrases, or notes) into multiple QR codes.  
It supports **XOR splitting** and **Shamir’s Secret Sharing** for secure and flexible backups.  
All processing happens fully locally in your browser — nothing is ever sent to a server.

👉 Live demo: [https://qrsafeshare.com](https://qrsafeshare.com)

---

## ✨ Key Features

- **Split secrets into QR codes**  
  Works with passwords, recovery phrases, or any text.

- **Recover easily**  
  Scan or upload the required QR codes to restore the original secret.

- **Runs locally**  
  All encryption and splitting happens in your browser. Nothing is sent or stored online.

- **3D-print export**  
  Create durable, physical backups of your QR codes with 3MF files.

- **Extra protection**  
  Use the lockable QR SafeShare Sleeve (available on Printables) to prevent unwanted scanning.

---

## 🔐 Use Cases

- **Protecting a crypto recovery phrase**  
  Use Shamir’s Secret Sharing (3-2) to create three QR codes where any two are enough to recover your phrase.  
  Store them in different places (safe, digital, trusted contact). Even if one is stolen, it’s useless on its own.

- **Sending a password securely to a client**  
  With XOR 2-2 splitting, you can send one part via WhatsApp/SMS (special link) and the other via email.  
  Only by combining them locally can the password be reconstructed.

- **Dead man’s switch for a password vault**  
  Store one QR on a USB stick with your vault, and have a dead man’s switch send the other QR to a family member if you stop responding.  
  Alone, each part is worthless — but together they unlock the vault.

---

## 📱 Install as an App (PWA)

QR SafeShare can be installed as a **Progressive Web App (PWA)** for quick access, just like a native app.

- **On Android (Chrome / Edge / Brave):** Open [qrsafeshare.com](https://qrsafeshare.com), tap the ⋮ menu, and choose “Add to Home screen”.  
- **On iOS (Safari):** Open [qrsafeshare.com](https://qrsafeshare.com), tap Share → “Add to Home Screen”.  
- **On Desktop (Chrome / Edge / Brave):** Open [qrsafeshare.com](https://qrsafeshare.com), click the install icon in the address bar or go to ⋮ → Install app.

Once installed, QR SafeShare runs fullscreen and can also be used completely offline.

---

## 🔒 Security

- Each QR code on its own is mathematically worthless.  
- The secret can only be reconstructed when the required number of QR codes are combined.  
- Even with a supercomputer or a future quantum computer, a single part reveals nothing.  
- All code is open source, transparent, and reviewable.

---

## ⚠️ Disclaimer

QR SafeShare is provided *as is*. Use is entirely at your own risk.

- All processing happens locally in your browser, but you are solely responsible for managing and backing up your secrets.  
- Losing access to your shares may result in permanent loss of your data (e.g., crypto wallets).  
- The creators of QR SafeShare accept no liability for any damages or losses resulting from the use of this tool.  

By using QR SafeShare, you agree to these terms.

---

## 📜 License

This project is licensed under the **QR SafeShare License (Non-Commercial)**.  
You are free to use, copy, modify, and distribute the software for personal, educational, or research purposes.  

Commercial use is **not permitted** without prior written permission from the copyright holder.  
See [LICENSE.md](LICENSE.md) for full details.

---

## 🙌 Support the Project

If you find QR SafeShare useful, please consider supporting development and new features here:  
[https://donate.qrsafeshare.com/](https://donate.qrsafeshare.com/)

