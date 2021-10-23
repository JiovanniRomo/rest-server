import jwt from 'jsonwebtoken';

export const generarJWT = (uid: string ): Promise<string> => {
    return new Promise((resolve, reject) => {
        const payload = { uid };

        jwt.sign(
            payload,
            process.env.SECRETKEY!,
            {
                expiresIn: '4h',
            },
            (err: any, token: any) => {
                if (err) {
                    console.log(err);
                    reject('No se pudo generar el token')
                } else {
                    resolve(token);
                }
            }
        );
    });
};
