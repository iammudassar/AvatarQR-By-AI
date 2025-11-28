# AvatarQR - QR Code Generator

AvatarQR is a React-based application that creates stunning, branded QR codes.

## 🚀 Key Features

- **Multi-Type Support:** Create QR codes for URLs, WiFi, vCards, Text, and Email.
- **Client-Side Persistence:** Users can create "accounts" (stored locally in the browser) to save and manage their QR designs.
- **Privacy Focused:** All QR generation happens in the browser; images and data are not stored on a central server.

## 🛠️ How to Host on Your Server

The project includes all necessary configuration files (`package.json`, `vite.config.ts`, `tsconfig.json`) to easily build and host it anywhere.

### 1. Prerequisites

- **Node.js** (v16 or higher) installed on your computer.

### 2. Installation

1. Download all the files in this project to a folder on your computer.
2. Open your terminal/command prompt in that folder.
3. Install the dependencies:
   ```bash
   npm install
   ```

### 3. Build for Production

Run the build command to generate the static files:

```bash
npm run build
```

This will create a `dist` folder in your project directory.

### 4. Deploy

The contents of the `dist` folder are all you need to host the app.

- **Standard Web Hosting (cPanel, Hostinger, GoDaddy):** Upload the contents of the `dist` folder to your `public_html` folder via File Manager or FTP.
- **Netlify / Vercel:** You can connect your GitHub repository and the build settings will be detected automatically (Build command: `npm run build`, Output directory: `dist`).
- **Apache / Nginx:** Serve the `dist` folder as static files.

That's it! Your QR Code generator is ready to use.