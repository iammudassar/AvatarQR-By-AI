# AvatarQR - AI Powered QR Generator

AvatarQR is a React-based application that creates stunning, branded QR codes. It uses Google Gemini AI to analyze uploaded logos and automatically suggest matching color palettes.

## 🚀 Key Features

- **Multi-Type Support:** Create QR codes for URLs, WiFi, vCards, Text, and Email.
- **AI Color Matching:** Upload a logo, and the app auto-configures the QR code colors to match your brand.
- **Client-Side Persistence:** Users can create "accounts" (stored locally in the browser) to save and manage their QR designs.
- **Privacy Focused:** All QR generation happens in the browser; images and data are not stored on a central server.

## 🛠️ How to Host on Your Server

This is a **client-side Single Page Application (SPA)** built with React. To host it on a simple server (like Apache, Nginx, Hostinger, GoDaddy, Netlify, or Vercel), you need to build the project first.

The recommended way to host this source code is using **Vite**.

### 1. Prerequisites

- Node.js installed on your computer.
- A Google Gemini API Key.

### 2. Setup Project

1. Open your terminal.
2. Create a new Vite project:
   ```bash
   npm create vite@latest avatar-qr -- --template react-ts
   cd avatar-qr
   ```
3. Install the required dependencies:
   ```bash
   npm install @google/genai qr-code-styling lucide-react
   ```
   *(Note: Tailwind CSS is used via CDN in `index.html` for simplicity in this version, but you can also install it via npm if preferred).*

### 3. Copy Source Files

Copy the provided source files into your new Vite project's `src` folder:
- `App.tsx`
- `types.ts`
- `constants.ts`
- `services/` folder
- `components/` folder

Ensure your `index.html` (in the root) includes the Tailwind CDN:
```html
<script src="https://cdn.tailwindcss.com"></script>
```

### 4. Configure API Key

To enable the AI features (logo analysis), you need to provide your Google Gemini API Key.

1. Create a file named `.env` in the root of your project.
2. Add your key:
   ```
   VITE_API_KEY=your_google_api_key_here
   ```

The application is already configured to look for `VITE_API_KEY` when running in a Vite environment.

### 5. Build and Deploy

1. Run the build command:
   ```bash
   npm run build
   ```
2. This will create a `dist` folder.
3. **Upload the contents of the `dist` folder** to your web server's public directory (e.g., `public_html`).

That's it! Your app is now live.

## 📦 Deployment Options

- **Netlify/Vercel:** Simply connect your GitHub repository and set the `VITE_API_KEY` in the dashboard settings.
- **Shared Hosting (cPanel):** Upload the `dist` folder contents via FTP.
- **Docker:** Use a simple Nginx container to serve the `dist` folder.
