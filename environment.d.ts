
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JWT_SECRET: string;
      DB_HOST: string;
      DB_USER: string;
      DB_PASS: string;
      DB_NAME: string;
      FTP_HOST: string;
      FTP_USER: string
      FTP_PASS: string
    }
  }
}

export {}