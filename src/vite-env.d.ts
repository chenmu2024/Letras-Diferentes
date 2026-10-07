/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SHOW_AD_PLACEHOLDERS?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
