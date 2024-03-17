interface Error {
  status: number;
  isJoi: boolean
}

declare namespace Express {
  export interface Request {
    payload: {
      userId: string;
    };
  }
}
