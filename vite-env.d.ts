// Manual type definitions for Vite environment to resolve "Cannot find type definition file for 'vite/client'"
interface ImportMetaEnv {
  readonly VITE_API_KEY: string;
  [key: string]: any;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
