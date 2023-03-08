declare namespace Express {
  interface Claim {
    iss: string;
    exp: number;
    sub: string;
    email: string;
  }

  interface Request {
    email: string;
  }
}
