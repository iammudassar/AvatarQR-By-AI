import React, { useState, useMemo, useEffect } from 'react';
import { 
  QRContentType, 
  WifiData, 
  VCardData, 
  QRStyleOptions,
  User,
  SavedQRCode
} from './types';
import { DEFAULT_STYLE, INITIAL_WIFI, INITIAL_VCARD } from './constants';
import Controls from './components/Controls';
import QRCodeCanvas from './components/QRCodeCanvas';
import AuthModal from './components/AuthModal';
import LibraryModal from './components/LibraryModal';

const App: React.FC = () => {
  // --- Auth State ---
  const [user, setUser] = useState<User | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showLibraryModal, setShowLibraryModal] = useState(false);
  const [savedQRs, setSavedQRs] = useState<SavedQRCode[]>([]);

  // --- QR Content State ---
  const [contentType, setContentType] = useState<QRContentType>(QRContentType.URL);
  const [url, setUrl] = useState<string>('https://google.com');
  const [text, setText] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [wifiData, setWifiData] = useState<WifiData>(INITIAL_WIFI);
  const [vCardData, setVCardData] = useState<VCardData>(INITIAL_VCARD);

  // --- Styling State ---
  const [styleOptions, setStyleOptions] = useState<QRStyleOptions>(DEFAULT_STYLE);
  
  // --- App UX State ---
  const [downloadTrigger, setDownloadTrigger] = useState(0);

  // --- Auth & Persistence Logic ---
  useEffect(() => {
    // Check for active session
    const session = localStorage.getItem('avatarqr_session');
    if (session) {
      const activeUser = JSON.parse(session);
      setUser(activeUser);
      loadUserLibrary(activeUser.email);
    }
  }, []);

  const loadUserLibrary = (userEmail: string) => {
    const libraryKey = `avatarqr_library_${userEmail}`;
    const data = localStorage.getItem(libraryKey);
    if (data) {
      setSavedQRs(JSON.parse(data));
    } else {
      setSavedQRs([]);
    }
  };

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
    localStorage.setItem('avatarqr_session', JSON.stringify(loggedInUser));
    loadUserLibrary(loggedInUser.email);
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('avatarqr_session');
    setSavedQRs([]);
    setShowLibraryModal(false);
  };

  const handleSaveQR = () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    const name = prompt("Name your QR Code design:", "My Awesome QR");
    if (!name) return;

    const newQR: SavedQRCode = {
      id: crypto.randomUUID(),
      name,
      createdAt: Date.now(),
      contentType,
      data: { url, text, email, wifi: wifiData, vCard: vCardData },
      styleOptions
    };

    const updatedLibrary = [newQR, ...savedQRs];
    setSavedQRs(updatedLibrary);
    localStorage.setItem(`avatarqr_library_${user.email}`, JSON.stringify(updatedLibrary));
    alert("Saved to library!");
  };

  const handleLoadQR = (qr: SavedQRCode) => {
    setContentType(qr.contentType);
    setStyleOptions(qr.styleOptions);
    
    // Restore specific data fields
    if (qr.data.url) setUrl(qr.data.url);
    if (qr.data.text) setText(qr.data.text);
    if (qr.data.email) setEmail(qr.data.email);
    if (qr.data.wifi) setWifiData(qr.data.wifi);
    if (qr.data.vCard) setVCardData(qr.data.vCard);

    setShowLibraryModal(false);
  };

  const handleDeleteQR = (id: string) => {
    if (!user) return;
    if (!confirm("Are you sure you want to delete this design?")) return;

    const updatedLibrary = savedQRs.filter(q => q.id !== id);
    setSavedQRs(updatedLibrary);
    localStorage.setItem(`avatarqr_library_${user.email}`, JSON.stringify(updatedLibrary));
  };

  // --- Content Generation Logic ---
  const qrData = useMemo(() => {
    switch (contentType) {
      case QRContentType.URL:
        return url;
      case QRContentType.TEXT:
        return text;
      case QRContentType.EMAIL:
        return `mailto:${email}`;
      case QRContentType.WIFI:
        const { ssid, password, encryption, hidden } = wifiData;
        return `WIFI:T:${encryption};S:${ssid};P:${password};H:${hidden};;`;
      case QRContentType.VCARD:
        const { firstName, lastName, phone, email: vEmail, org, title, website, street, city, country } = vCardData;
        return `BEGIN:VCARD
VERSION:3.0
N:${lastName};${firstName};;;
FN:${firstName} ${lastName}
ORG:${org}
TITLE:${title}
TEL:${phone}
EMAIL:${vEmail}
URL:${website}
ADR:;;${street};${city};;;${country}
END:VCARD`;
      default:
        return url;
    }
  }, [contentType, url, text, email, wifiData, vCardData]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      
      {/* Modals */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
        onLogin={handleLogin} 
      />
      <LibraryModal 
        isOpen={showLibraryModal} 
        onClose={() => setShowLibraryModal(false)}
        savedQRs={savedQRs}
        onLoad={handleLoadQR}
        onDelete={handleDeleteQR}
      />

      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
           <div className="flex items-center space-x-4">
              <img 
                src="https://www.avatardesk.com/wp-content/uploads/2022/07/Avatardesk-Logo-New.svg" 
                alt="AvatarQR Logo" 
                className="h-8 md:h-10"
              />
              <span className="text-xl font-bold text-slate-800 tracking-tight hidden sm:block border-l pl-4 border-slate-200">
                QR Generator
              </span>
           </div>
           
           <div className="flex items-center space-x-3">
             {user ? (
               <>
                 <button 
                    onClick={() => setShowLibraryModal(true)}
                    className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                 >
                    <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                    <span>My Library</span>
                 </button>
                 <div className="h-6 w-px bg-slate-200 mx-2"></div>
                 <div className="flex items-center space-x-3">
                    <div className="text-right hidden md:block">
                        <p className="text-sm font-medium text-slate-800">{user.name}</p>
                        <p className="text-xs text-slate-500">Free Account</p>
                    </div>
                    <button 
                        onClick={handleLogout}
                        className="text-sm text-red-500 hover:text-red-700 font-medium"
                    >
                        Sign Out
                    </button>
                 </div>
               </>
             ) : (
               <button 
                  onClick={() => setShowAuthModal(true)}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-lg shadow-lg shadow-indigo-500/20 transition-all"
               >
                  Login / Sign Up
               </button>
             )}
           </div>
        </div>
      </header>

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Controls */}
          <div className="lg:col-span-7 space-y-6">
             <Controls 
               contentType={contentType} setContentType={setContentType}
               url={url} setUrl={setUrl}
               text={text} setText={setText}
               email={email} setEmail={setEmail}
               wifiData={wifiData} setWifiData={setWifiData}
               vCardData={vCardData} setVCardData={setVCardData}
               styleOptions={styleOptions} setStyleOptions={setStyleOptions}
             />
          </div>

          {/* Right Column: Preview (Sticky) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
             <div className="bg-slate-800 rounded-2xl p-6 shadow-xl text-center text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                   <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2-1-10-5-10 5 2 1zm0 2l-10 5 10 5 10-5-10-5z"/></svg>
                </div>

                <h2 className="text-lg font-semibold mb-4 opacity-90 relative z-10">Live Preview</h2>
                
                <QRCodeCanvas 
                  data={qrData} 
                  styleOptions={styleOptions} 
                  onDownloadTrigger={downloadTrigger}
                />

                <div className="mt-6 grid grid-cols-2 gap-3">
                   <button 
                     onClick={handleSaveQR}
                     className="py-3 px-4 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-lg transition-colors flex items-center justify-center space-x-2 border border-slate-600"
                   >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>
                      <span>Save</span>
                   </button>
                   <button 
                     onClick={() => setDownloadTrigger(prev => prev + 1)}
                     className="py-3 px-4 bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 text-white font-bold rounded-lg transition-colors shadow-lg shadow-indigo-500/30 flex items-center justify-center space-x-2"
                   >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                      <span>Download</span>
                   </button>
                </div>
                <p className="mt-4 text-xs text-slate-400">
                  Login to save your designs and edit them later.
                </p>
             </div>
          </div>

        </div>
      </main>

    </div>
  );
};

export default App;