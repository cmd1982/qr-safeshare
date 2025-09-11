# QR SafeShare
QR SafeShare helps you securely split and recover passwords, recovery phrases, and notes with QR codes. Everything runs locally in your browser nothing is stored online.
Supports **Shamir Secret Sharing (n‑of‑k)** and a **2‑of‑2 XOR** method. Nothing is uploaded; all QR logic runs in your browser.

## 🚀 Live demo
Project is served at https://qr.area404.nl .

## ✨ Features
- Split **passwords**, **recovery phrases**, or **free text** into multiple QR codes.
- Two methods: **Shamir (n of k)** and **XOR (2 of 2)**.
- Recover by **scanning** with the camera or **uploading** an image / payload.
- **Offline/Local‑only**: no servers, no tracking.
- **English and Dutch** UI (separate pages; preference stored in `localStorage:qrs_lang`).

## 📂 Project structure (actual)
```
/
├─ combine.html          # NL: Combine secrets from QRs (camera + upload)
├─ combine-en.html       # EN: Combine secrets from QRs (camera + upload)
├─ index.html            # NL: Home
├─ index-en.html         # EN: Home
├─ split.html            # NL: Split secrets into QR codes
├─ split-en.html         # EN: Split secrets into QR codes
├─ uitleg.html           # NL: Guide / documentation
├─ uitleg-en.html        # EN: Guide / documentation
├─ favicon.ico
├─ logo.svg
├─ whatsapp.svg
├─ images/
│  ├─ voorbeeld-samenvoegen.png
│  ├─ voorbeeld-shamir.png
│  └─ voorbeeld-splitsen.png
└─ lib/                  # Vendored dependencies (no build step)
   ├─ tailwind.min.css   # Styling
   ├─ secrets.min.js     # Shamir Secret Sharing
   ├─ qrcode.min.js      # QR generation
   ├─ html5-qrcode.min.js# Camera scanner (NL combine page)
   └─ jsqr.min.js        # Image QR decoding (fallback / uploads)
```

## 🧩 How it works (high‑level)
- **Split**: Your input is normalized and then either:
  - **Shamir**: converted to bytes → hex → split into `n` shares with threshold `k`.  
  - **XOR**: a random pad is generated and XORed with the secret to create two complementary parts.
- Each share is embedded as a **JSON payload** and rendered into a QR code.
- **Combine**: The app scans JSON payloads from QR codes (camera or upload) and reconstructs the secret locally.

### QR payload format (for interoperability)
All payloads are **JSON** strings embedded in the QR.

- **Shamir (n‑of‑k)**
  ```json
  { "t":"s", "c":"password|crypto|note", "n":3, "k":2, "i":1, "id":"<random>", "d":"<share-hex>" }
  ```

- **XOR (2‑of‑2)**
  ```json
  { "t":"x", "c":"password|crypto|note", "i":1, "id":"<random>", "d":"<base64url-bytes>" }
  ```

Fields:
- `t`: type (`"s"` = Shamir, `"x"` = XOR)  
- `c`: category (`password`, `crypto` [recovery phrase], or `note`)  
- `n`, `k`: total shares and threshold (Shamir only)  
- `i`: 1‑based index of the share  
- `id`: random identifier to group shares belonging to the same secret  
- `d`: share data (hex for Shamir, base64url for XOR)

## 🔧 Local use
No toolchain needed. Clone/download and open the HTML files directly, or serve the folder with any static web server.

## 🌐 Deploy (GitHub Pages)
- Put the contents in your repository root.

## 🛡️ Security & privacy
- All operations run **entirely in the browser**. No network calls are required for splitting/combining.  
- This tool is designed for convenience; **always** verify your backups and threat model.  
- Be careful when sharing QR images and payload text; anyone with sufficient shares can reconstruct the secret.

## 🧱 Dependencies (vendored in `/lib`)
- `tailwind.min.css` – UI styling  
- `secrets.min.js` – Shamir Secret Sharing (threshold crypto)  
- `qrcode.min.js` – QR code generation  
- `html5-qrcode.min.js` – Camera‑based QR scanner (combine page)  
- `jsqr.min.js` – QR decoding from images (uploads / fallback)

## 📜 License
Licensed under the **MIT License**. See [`LICENSE`](LICENSE) for details

## ☕ Support this project

If you find this project useful and want to support its development, you can [buy me a coffee](https://buymeacoffee.com/qrsafeshare).

[![Buy Me A Coffee](https://img.buymeacoffee.com/button-api/?text=Buy%20me%20a%20coffee&emoji=☕&slug=qrsafeshare&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff)](https://buymeacoffee.com/qrsafeshare)

