/**
 * Acciones que seran ejecutadas en el dispatch
 */

import { types } from "../types/types";
import { decodeToken } from "../utils/decode/decodeJWT";
import { LoginFetch } from "../utils/fetch/autenticacion";
import Swal from 'sweetalert2';

// Payload es un objeto con las mismas caracteristicas del state
export const Login = ( payload ) => {
    return {
        type: types.Login,
        payload
    }
}

// Funcion para ejecutar el login, esto es una operacion asincrona
// body: Objecto con los campos a enviar al back
export const startLogin = ( body ) => {
    return async ( dispatch ) => {
        const resp = await LoginFetch( body );

        Swal.fire({
            icon: !resp.token? 'error': 'success',
            titleText: `${resp.mensaje}`,
        })
        // si el token no ha venido en la peticion entonces salimos
        if ( !resp.token ) {
            return;
        }
        // decodificamos el token
        const payload = decodeToken( resp.token );

        // si el token es nulo entonces es un token no valido
        if ( !payload ) {
            Swal.fire({
                icon: 'error',
                titleText: 'Error del servidor',
            })
            return;
        }
        // eliminamos las propiedades de iat y exp
        delete payload.iat;
        delete payload.exp;

        // Guardamos en localstorage y actualizamos el state
        localStorage.setItem('token', resp.token);
        dispatch( Login( payload ) );
    }
}