import React from 'react';
import { 
  QRContentType, 
  WifiData, 
  VCardData, 
  QRStyleOptions, 
  AIColorSuggestion 
} from '../types';
import { CONTENT_TYPES, DOT_TYPES, CORNER_SQUARE_TYPES } from '../constants';

interface ControlsProps {
  contentType: QRContentType;
  setContentType: (type: QRContentType) => void;
  url: string;
  setUrl: (val: string) => void;
  text: string;
  setText: (val: string) => void;
  email: string;
  setEmail: (val: string) => void;
  wifiData: WifiData;
  setWifiData: (data: WifiData) => void;
  vCardData: VCardData;
  setVCardData: (data: VCardData) => void;
  styleOptions: QRStyleOptions;
  setStyleOptions: (opts: QRStyleOptions) => void;
  onAnalyzeLogo: (file: File) => void;
  isAnalyzing: boolean;
}

const Controls: React.FC<ControlsProps> = ({
  contentType, setContentType,
  url, setUrl,
  text, setText,
  email, setEmail,
  wifiData, setWifiData,
  vCardData, setVCardData,
  styleOptions, setStyleOptions,
  onAnalyzeLogo, isAnalyzing
}) => {

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setStyleOptions({ ...styleOptions, image: event.target.result as string });
          // Trigger AI Analysis
          onAnalyzeLogo(file);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    setStyleOptions({ ...styleOptions, image: undefined });
  };

  return (
    <div className="space-y-8">
      
      {/* 1. Content Type Selector */}
      <div className="space-y-3">
        <label className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Content Type</label>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
          {CONTENT_TYPES.map((type) => (
            <button
              key={type.id}
              onClick={() => setContentType(type.id)}
              className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all duration-200 ${
                contentType === type.id 
                ? 'bg-indigo-50 border-indigo-500 text-indigo-700 shadow-sm' 
                : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-300 hover:bg-slate-50'
              }`}
            >
              <span className="text-2xl mb-1">{type.icon}</span>
              <span className="text-xs font-medium">{type.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 2. Content Inputs */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-lg font-medium text-slate-800 border-b border-slate-100 pb-2">Enter Content</h3>
        
        {contentType === QRContentType.URL && (
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Website URL</label>
            <input 
              type="url" 
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-white"
            />
          </div>
        )}

        {contentType === QRContentType.TEXT && (
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Plain Text</label>
            <textarea 
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={4}
              placeholder="Enter your message here..."
              className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-white"
            />
          </div>
        )}

        {contentType === QRContentType.EMAIL && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="contact@example.com"
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-white"
              />
            </div>
          )}

        {contentType === QRContentType.WIFI && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Network Name (SSID)</label>
              <input 
                type="text" 
                value={wifiData.ssid}
                onChange={(e) => setWifiData({...wifiData, ssid: e.target.value})}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <input 
                type="text" 
                value={wifiData.password}
                onChange={(e) => setWifiData({...wifiData, password: e.target.value})}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Encryption</label>
                <select 
                  value={wifiData.encryption}
                  onChange={(e) => setWifiData({...wifiData, encryption: e.target.value as any})}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
                >
                  <option value="WPA">WPA/WPA2</option>
                  <option value="WEP">WEP</option>
                  <option value="nopass">None</option>
                </select>
              </div>
              <div className="flex items-end mb-3">
                 <label className="flex items-center space-x-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={wifiData.hidden}
                      onChange={(e) => setWifiData({...wifiData, hidden: e.target.checked})}
                      className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500 bg-white"
                    />
                    <span className="text-sm text-slate-700">Hidden Network</span>
                 </label>
              </div>
            </div>
          </div>
        )}

        {contentType === QRContentType.VCARD && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-1">
                <label className="block text-xs font-medium text-slate-500 uppercase">First Name</label>
                <input type="text" value={vCardData.firstName} onChange={e => setVCardData({...vCardData, firstName: e.target.value})} className="mt-1 w-full px-3 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white" />
            </div>
            <div className="col-span-1">
                <label className="block text-xs font-medium text-slate-500 uppercase">Last Name</label>
                <input type="text" value={vCardData.lastName} onChange={e => setVCardData({...vCardData, lastName: e.target.value})} className="mt-1 w-full px-3 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white" />
            </div>
            <div className="col-span-1">
                <label className="block text-xs font-medium text-slate-500 uppercase">Phone</label>
                <input type="tel" value={vCardData.phone} onChange={e => setVCardData({...vCardData, phone: e.target.value})} className="mt-1 w-full px-3 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white" />
            </div>
            <div className="col-span-1">
                <label className="block text-xs font-medium text-slate-500 uppercase">Email</label>
                <input type="email" value={vCardData.email} onChange={e => setVCardData({...vCardData, email: e.target.value})} className="mt-1 w-full px-3 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white" />
            </div>
            <div className="col-span-2">
                <label className="block text-xs font-medium text-slate-500 uppercase">Organization</label>
                <input type="text" value={vCardData.org} onChange={e => setVCardData({...vCardData, org: e.target.value})} className="mt-1 w-full px-3 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white" />
            </div>
             <div className="col-span-2">
                <label className="block text-xs font-medium text-slate-500 uppercase">Website</label>
                <input type="url" value={vCardData.website} onChange={e => setVCardData({...vCardData, website: e.target.value})} className="mt-1 w-full px-3 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white" />
            </div>
          </div>
        )}
      </div>

      {/* 3. Branding & Logo */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-lg font-medium text-slate-800 border-b border-slate-100 pb-2">Branding</h3>
        
        <div className="flex items-start space-x-4">
            <div className="flex-1">
                <label className="block text-sm font-medium text-slate-700 mb-2">Upload Logo</label>
                <div className="relative">
                    <input 
                        type="file" 
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 bg-white rounded-lg border border-slate-100"
                    />
                </div>
                <p className="mt-2 text-xs text-slate-500">Supported: PNG, JPG, SVG.</p>
            </div>
            
            {styleOptions.image && (
                <div className="relative group w-16 h-16 rounded-lg border border-slate-200 p-1 flex items-center justify-center bg-slate-50">
                    <img src={styleOptions.image} alt="Logo" className="max-w-full max-h-full object-contain" />
                    <button 
                        onClick={removeLogo}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>
            )}
        </div>

        {styleOptions.image && (
          <div className="bg-indigo-50 rounded-lg p-3 flex items-center justify-between">
             <div className="flex items-center space-x-2">
                <div className="p-1.5 bg-indigo-100 rounded-md">
                   <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                </div>
                <div className="text-sm text-indigo-900 font-medium">AI Style Match</div>
             </div>
             {isAnalyzing ? (
                 <span className="text-xs text-indigo-500 animate-pulse font-medium">Analyzing logo...</span>
             ) : (
                <span className="text-xs text-indigo-400">Colors updated automatically</span>
             )}
          </div>
        )}
      </div>

      {/* 4. Appearance */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-lg font-medium text-slate-800 border-b border-slate-100 pb-2">Appearance</h3>
        
        <div className="grid grid-cols-2 gap-4">
             <div>
                <label className="block text-xs font-medium text-slate-500 uppercase mb-1">Dots Style</label>
                <select 
                    value={styleOptions.dotType} 
                    onChange={e => setStyleOptions({...styleOptions, dotType: e.target.value as any})}
                    className="w-full text-sm border-slate-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white"
                >
                    {DOT_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                </select>
             </div>
             <div>
                <label className="block text-xs font-medium text-slate-500 uppercase mb-1">Corner Style</label>
                <select 
                    value={styleOptions.cornerSquareType} 
                    onChange={e => setStyleOptions({...styleOptions, cornerSquareType: e.target.value as any})}
                    className="w-full text-sm border-slate-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white"
                >
                    {CORNER_SQUARE_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                </select>
             </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
             <div>
                <label className="block text-xs font-medium text-slate-500 uppercase mb-2">Dots Color</label>
                <div className="flex items-center space-x-2">
                    <input 
                        type="color" 
                        value={styleOptions.dotsColor}
                        onChange={e => setStyleOptions({...styleOptions, dotsColor: e.target.value})}
                        className="h-8 w-8 rounded overflow-hidden border-0 cursor-pointer"
                    />
                    <span className="text-xs font-mono text-slate-500">{styleOptions.dotsColor}</span>
                </div>
             </div>
             <div>
                <label className="block text-xs font-medium text-slate-500 uppercase mb-2">Corner Color</label>
                 <div className="flex items-center space-x-2">
                    <input 
                        type="color" 
                        value={styleOptions.cornerSquareColor}
                        onChange={e => setStyleOptions({...styleOptions, cornerSquareColor: e.target.value, cornerDotColor: e.target.value})}
                        className="h-8 w-8 rounded overflow-hidden border-0 cursor-pointer"
                    />
                     <span className="text-xs font-mono text-slate-500">{styleOptions.cornerSquareColor}</span>
                </div>
             </div>
             <div>
                <label className="block text-xs font-medium text-slate-500 uppercase mb-2">Background</label>
                 <div className="flex items-center space-x-2">
                    <input 
                        type="color" 
                        value={styleOptions.backgroundColor}
                        onChange={e => setStyleOptions({...styleOptions, backgroundColor: e.target.value})}
                        className="h-8 w-8 rounded overflow-hidden border-0 cursor-pointer"
                    />
                     <span className="text-xs font-mono text-slate-500">{styleOptions.backgroundColor}</span>
                </div>
             </div>
        </div>
      </div>

    </div>
  );
};

export default Controls;