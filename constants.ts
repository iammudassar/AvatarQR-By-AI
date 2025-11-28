import { QRStyleOptions, QRContentType, WifiData, VCardData } from './types';

export const DEFAULT_STYLE: QRStyleOptions = {
  width: 300,
  height: 300,
  margin: 10,
  dotsColor: '#000000',
  backgroundColor: '#ffffff',
  cornerDotColor: '#000000',
  cornerSquareColor: '#000000',
  dotType: 'rounded',
  cornerSquareType: 'extra-rounded',
  cornerDotType: 'dot',
  image: undefined,
};

export const INITIAL_WIFI: WifiData = {
  ssid: '',
  password: '',
  encryption: 'WPA',
  hidden: false,
};

export const INITIAL_VCARD: VCardData = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  org: '',
  title: '',
  website: '',
  street: '',
  city: '',
  country: '',
};

export const DOT_TYPES = [
  { value: 'square', label: 'Square' },
  { value: 'dots', label: 'Dots' },
  { value: 'rounded', label: 'Rounded' },
  { value: 'classy', label: 'Classy' },
  { value: 'classy-rounded', label: 'Classy Rounded' },
  { value: 'extra-rounded', label: 'Extra Rounded' },
];

export const CORNER_SQUARE_TYPES = [
  { value: 'square', label: 'Square' },
  { value: 'dot', label: 'Dot' },
  { value: 'extra-rounded', label: 'Extra Rounded' },
];

export const CONTENT_TYPES = [
  { id: QRContentType.URL, label: 'Website URL', icon: '🌐' },
  { id: QRContentType.WIFI, label: 'WiFi Network', icon: '📶' },
  { id: QRContentType.VCARD, label: 'vCard Contact', icon: '👤' },
  { id: QRContentType.EMAIL, label: 'Send Email', icon: '✉️' },
  { id: QRContentType.TEXT, label: 'Plain Text', icon: '📝' },
];
