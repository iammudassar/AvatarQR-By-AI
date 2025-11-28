export enum QRContentType {
  URL = 'URL',
  WIFI = 'WIFI',
  VCARD = 'VCARD',
  TEXT = 'TEXT',
  EMAIL = 'EMAIL'
}

export type WifiSecurity = 'WPA' | 'WEP' | 'nopass';

export interface WifiData {
  ssid: string;
  password: string;
  encryption: WifiSecurity;
  hidden: boolean;
}

export interface VCardData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  org: string;
  title: string;
  website: string;
  street: string;
  city: string;
  country: string;
}

export interface QRStyleOptions {
  width: number;
  height: number;
  margin: number;
  dotsColor: string;
  backgroundColor: string;
  cornerDotColor: string;
  cornerSquareColor: string;
  image?: string; // Base64 or URL
  dotType: 'square' | 'dots' | 'rounded' | 'classy' | 'classy-rounded' | 'extra-rounded';
  cornerSquareType: 'square' | 'dot' | 'extra-rounded';
  cornerDotType: 'square' | 'dot';
}

export interface AIColorSuggestion {
  primary: string;
  secondary: string;
  accent: string;
}

export interface User {
  email: string;
  name: string;
}

export interface SavedQRCode {
  id: string;
  name: string;
  createdAt: number;
  contentType: QRContentType;
  // We save the raw input data so we can repopulate the form
  data: {
    url?: string;
    text?: string;
    email?: string;
    wifi?: WifiData;
    vCard?: VCardData;
  };
  styleOptions: QRStyleOptions;
}