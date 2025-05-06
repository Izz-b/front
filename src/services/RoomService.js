// RoomService.js

import { request } from "./axios_helper"; // même base que pour Exam

const API_BASE_URL = "/api/rooms";

// Créer une salle
export const createRoom = async (roomData) => {
    try {
        const response = await request("post", API_BASE_URL, roomData);
        return response.data;
    } catch (error) {
        handleRequestError(error, "Erreur lors de la création de la salle.");
    }
};

// Récupérer une salle par ID
export const getRoomById = async (id) => {
    try {
        const response = await request("get", `${API_BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        handleRequestError(error, `Erreur lors de la récupération de la salle avec l'ID ${id}.`);
    }
};

// Récupérer toutes les salles
export const getAllRooms = async () => {
    try {
        const response = await request("get", API_BASE_URL);
        return response.data;
    } catch (error) {
        handleRequestError(error, "Erreur lors de la récupération des salles.");
    }
};

// Mettre à jour une salle
export const updateRoom = async (id, updatedRoom) => {
    try {
        const response = await request("put", `${API_BASE_URL}/${id}`, updatedRoom);
        return response.data;
    } catch (error) {
        handleRequestError(error, `Erreur lors de la mise à jour de la salle avec l'ID ${id}.`);
    }
};

// Supprimer une salle
export const deleteRoom = async (id) => {
    try {
        const response = await request("delete", `${API_BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        handleRequestError(error, `Erreur lors de la suppression de la salle avec l'ID ${id}.`);
    }
};

// Gestion d'erreurs commune
const handleRequestError = (error, defaultMessage) => {
    if (error.response) {
        console.error("Erreur API :", error.response.data);
        throw new Error(error.response.data.message || defaultMessage);
    } else if (error.request) {
        console.error("Aucune réponse du serveur.");
        throw new Error("Aucune réponse du serveur. Veuillez vérifier votre connexion.");
    } else {
        console.error("Erreur lors de la configuration de la requête :", error.message);
        throw new Error(defaultMessage);
    }
};
