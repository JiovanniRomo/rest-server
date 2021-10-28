

declare namespace Express {
    interface IUsuario {
        nombre: string,
        correo: string,
        rol: string,
        estado: boolean,
        google: boolean
    }
    interface Request {
        uid?: string;
        usuario?: IUsuario | null ;
    }
}
