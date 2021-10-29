const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


interface IGoogleUser {
    nombre: string,
    correo: string,
    img: string,
}

export async function googleVerify(token: string = ''): Promise<IGoogleUser> {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    const { name, picture, email } = payload;

    return {
        nombre: name,
        img: picture,
        correo: email,
    };
}