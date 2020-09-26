declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_KEY: string;
      API_KEY2: string;
    }
  }
}
  
export {}
  