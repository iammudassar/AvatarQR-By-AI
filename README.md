# AvatarQR - AI Powered QR Generator

AvatarQR is a React-based application that creates stunning, branded QR codes. It uses Google Gemini AI to analyze uploaded logos and automatically suggest matching color palettes.

## 🚀 Key Features

- **Multi-Type Support:** Create QR codes for URLs, WiFi, vCards, Text, and Email.
- **AI Color Matching:** Upload a logo, and the app auto-configures the QR code colors to match your brand.
- **Client-Side Persistence:** Users can create "accounts" (stored locally in the browser) to save and manage their QR designs.
- **Privacy Focused:** All QR generation happens in the browser; images and data are not stored on a central server.

## 🛠️ How to Host on Your Server

The project now includes all necessary configuration files (`package.json`, `vite.config.ts`, `tsconfig.json`) to easily build and host it anywhere.

### 1. Prerequisites

- **Node.js** (v16 or higher) installed on your computer.
- A **Google Gemini API Key** (Get one at [aistudio.google.com](https://aistudio.google.com/)).

### 2. Installation

1. Download all the files in this project to a folder on your computer.
2. Open your terminal/command prompt in that folder.
3. Install the dependencies:
   ```bash
   npm install
   ```

### 3. Configuration

Create a file named `.env` in the root folder and add your API Key. This is required for the "AI Logo Analysis" feature to work.

```env
VITE_API_KEY=your_actual_api_key_here
```

### 4. Build for Production

Run the build command to generate the static files:

```bash
npm run build
```

This will create a `dist` folder in your project directory.

### 5. Deploy

The contents of the `dist` folder are all you need to host the app.

- **Standard Web Hosting (cPanel, Hostinger, GoDaddy):** Upload the contents of the `dist` folder to your `public_html` folder via File Manager or FTP.
- **Netlify / Vercel:** You can connect your GitHub repository and the build settings will be detected automatically (Build command: `npm run build`, Output directory: `dist`). Remember to add `VITE_API_KEY` in the Environment Variables settings of your dashboard.
- **Apache / Nginx:** Serve the `dist` folder as static files.

That's it! Your AI-powered QR Code generator is ready to use.