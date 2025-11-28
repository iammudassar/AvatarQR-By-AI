// Manual type definitions for Vite environment to resolve "Cannot find type definition file for 'vite/client'"
interface ImportMetaEnv {
  [key: string]: any;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}