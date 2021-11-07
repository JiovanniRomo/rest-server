

declare namespace Express {

    interface IUsuario {
        nombre: string,
        correo: string,
        rol: string,
        estado: boolean,
        google: boolean
        _id?: any
    }
    interface Request {
        uid?: string;
        usuario?: IUsuario | null ;
    }
}
