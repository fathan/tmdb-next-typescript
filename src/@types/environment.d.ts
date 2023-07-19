export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      API_URL: string;
      TMDB_API_KEY: string;
      TMDB_ACCESS_TOKEN: string;
      NEXT_PUBLIC_TMDB_ASSET_IMAGE_URL: string;
    }
  }
}