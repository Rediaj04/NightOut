// src/env.d.ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_URL: string;
    readonly VITE_APP_NAME: string;
    readonly VITE_APP_VERSION: string;
    // Agrega aquí cualquier otra variable de entorno que uses
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  