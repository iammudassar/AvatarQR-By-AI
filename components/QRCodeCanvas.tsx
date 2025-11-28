import React, { useEffect, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling'; 
import { QRStyleOptions } from '../types';

interface QRCodeCanvasProps {
  data: string;
  styleOptions: QRStyleOptions;
  extension?: 'png' | 'jpeg' | 'webp' | 'svg';
  onDownloadTrigger?: number; // Increment to trigger download
}

const QRCodeCanvas: React.FC<QRCodeCanvasProps> = ({ data, styleOptions, onDownloadTrigger }) => {
  const ref = useRef<HTMLDivElement>(null);
  const qrCode = useRef<QRCodeStyling | null>(null);

  useEffect(() => {
    // Initialize standard QR Code Styling
    qrCode.current = new QRCodeStyling({
      width: styleOptions.width,
      height: styleOptions.height,
      margin: styleOptions.margin,
      image: styleOptions.image,
      dotsOptions: {
        color: styleOptions.dotsColor,
        type: styleOptions.dotType as any,
      },
      backgroundOptions: {
        color: styleOptions.backgroundColor,
      },
      imageOptions: {
        crossOrigin: "anonymous",
        margin: 5,
        imageSize: 0.4
      },
      cornersSquareOptions: {
        color: styleOptions.cornerSquareColor,
        type: styleOptions.cornerSquareType as any,
      },
      cornersDotOptions: {
        color: styleOptions.cornerDotColor,
        type: styleOptions.cornerDotType as any,
      }
    });

    if (ref.current) {
      // Cleanup previous children to prevent duplicates in Strict Mode
      ref.current.innerHTML = '';
      qrCode.current.append(ref.current);
    }
  }, []);

  // Update logic
  useEffect(() => {
    if (!qrCode.current) return;
    qrCode.current.update({
      data: data,
      image: styleOptions.image,
      dotsOptions: {
        color: styleOptions.dotsColor,
        type: styleOptions.dotType as any,
      },
      backgroundOptions: {
        color: styleOptions.backgroundColor,
      },
      cornersSquareOptions: {
        color: styleOptions.cornerSquareColor,
        type: styleOptions.cornerSquareType as any,
      },
      cornersDotOptions: {
        color: styleOptions.cornerDotColor,
        type: styleOptions.cornerDotType as any,
      }
    });
  }, [data, styleOptions]);

  // Handle download trigger
  useEffect(() => {
    if (onDownloadTrigger && onDownloadTrigger > 0 && qrCode.current) {
      qrCode.current.download({
        name: "avatar-qr-code",
        extension: "png"
      });
    }
  }, [onDownloadTrigger]);

  return (
    <div className="flex justify-center items-center p-6 bg-white rounded-xl shadow-sm border border-slate-100">
      <div ref={ref} />
    </div>
  );
};

export default QRCodeCanvas;