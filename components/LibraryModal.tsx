import React from 'react';
import { SavedQRCode } from '../types';
import QRCodeCanvas from './QRCodeCanvas';

interface LibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedQRs: SavedQRCode[];
  onLoad: (qr: SavedQRCode) => void;
  onDelete: (id: string) => void;
}

const LibraryModal: React.FC<LibraryModalProps> = ({ isOpen, onClose, savedQRs, onLoad, onDelete }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[80vh] flex flex-col">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-slate-800">My Saved QR Codes</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-500">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
          {savedQRs.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-400">
              <svg className="w-16 h-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
              <p className="text-lg font-medium">No saved QR codes yet</p>
              <p className="text-sm">Create and save your first design!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedQRs.map((qr) => (
                <div key={qr.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow group">
                  <div className="aspect-square bg-slate-100 flex items-center justify-center p-4 relative">
                     {/* Preview Generation */}
                     <div className="transform scale-75 origin-center pointer-events-none">
                       <QRCodeCanvas 
                         data="PREVIEW" // Data is irrelevant for visual preview in list if we just want to show style
                         styleOptions={{...qr.styleOptions, width: 200, height: 200}} 
                       />
                     </div>
                     <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                       <div>
                         <h3 className="font-bold text-slate-800 truncate pr-2">{qr.name}</h3>
                         <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-indigo-50 text-indigo-600 font-medium">{qr.contentType}</span>
                       </div>
                       <button 
                         onClick={(e) => { e.stopPropagation(); onDelete(qr.id); }}
                         className="text-slate-400 hover:text-red-500 transition-colors"
                         title="Delete"
                       >
                         <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                       </button>
                    </div>
                    <p className="text-xs text-slate-500 mb-4">
                      {new Date(qr.createdAt).toLocaleDateString()}
                    </p>
                    <button 
                      onClick={() => onLoad(qr)}
                      className="w-full py-2 bg-white border border-indigo-600 text-indigo-600 hover:bg-indigo-50 font-medium rounded-lg text-sm transition-colors"
                    >
                      Load Design
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LibraryModal;