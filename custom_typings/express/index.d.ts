declare namespace Express {
    interface Request {
        uid?: string;
        usuario?: object | null;
    }
}
