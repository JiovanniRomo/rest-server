import { validarCampos as validaCampos } from '../middlewares/validar-campos';
import { validarJWT as validaJWT} from '../middlewares/validar-jsonwebtoken';
import { esAdminRole as esAdmin, tieneRole as tieneUnRole } from '../middlewares/validar-role';

export {    
    validaCampos,
    validaJWT,
    esAdmin,
    tieneUnRole
}