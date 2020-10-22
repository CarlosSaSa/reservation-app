/**
 * Funciones para hacer peticiones fetch al servidor
 * 
 */

import { URL } from "../../config/config"

export const getAllReservatios = async (page = 1, size = 10) => {

    try {
        const resp = await fetch(`${URL}/user/getAllReservations?page=${page}&size=${size}`);
        const data = await resp.json();
        return data;
    } catch (error) {
        throw new Error('Error', error);
    }

}

// Funcion para obtener todos los salones
export const getAllClassRoom = async () => {
    try {
        const resp = await fetch(`${URL}/user/obtenerSalones`);
        const data = await resp.json();
        return data;
    } catch (error) {
        throw new Error('Error', error);
    }
}

export const getReservationsById = async ( idClassRoom, token, page = 1, size = 10 ) => {

    const URI = `${URL}/user/obtenerReservaciones?salon=${idClassRoom}&page=${page}&limit=${size}`;

    try {

        //opciones para la peticion
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        }

        const resp = await fetch(URI, options);
        const data = await resp.json();
        return data;
    } catch (error) {
        throw new Error('Error', error);
    }


}

export const getClassRoomById = async (id) => {

    const URI = `${URL}/user/obtenerSalon/${id}`;
    
    try {
        const resp = await fetch(URI);
        const data = await resp.json();
        return data;
    } catch (error) {
        throw new Error('Error', error);
    }

}