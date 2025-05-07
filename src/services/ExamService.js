import { request } from "./axios_helper";

const API_BASE_URL = "/api/exams";

// Créer un nouvel examen
export const createExam = async (examData) => {
    try {
        const response = await request("post", API_BASE_URL, examData);
        return response.data;
    } catch (error) {
        handleRequestError(error, "Erreur lors de la création de l'examen.");
    }
};

// Récupérer un examen par son ID
export const getExamById = async (id) => {
    try {
        const response = await request("get", `${API_BASE_URL}/${id}`,null);
        return response.data;
    } catch (error) {
        handleRequestError(error, `Erreur lors de la récupération de l'examen avec l'ID ${id}.`);
    }
};

// Récupérer tous les examens
export const getAllExams = async () => {
    try {
        const response = await request("get", API_BASE_URL, null);
        return response.data;
    } catch (error) {
        handleRequestError(error, "Erreur lors de la récupération de tous les examens.");
    }
};

// Mettre à jour un examen
export const updateExam = async (id, updatedData) => {
    try {
        const response = await request("put", `${API_BASE_URL}/${id}`, updatedData);
        return response.data;
    } catch (error) {
        handleRequestError(error, `Erreur lors de la mise à jour de l'examen avec l'ID ${id}.`);
    }
};

// Supprimer un examen
export const deleteExam = async (id) => {
    try {
        const response = await request("delete", `${API_BASE_URL}/${id}`,null);
        return response.data; // Contient généralement "Exam deleted successfully!"
    } catch (error) {
        handleRequestError(error, `Erreur lors de la suppression de l'examen avec l'ID ${id}.`);
    }
};

export const getAllSubjects = async () => {
    try {
        console.log("gyyyyyyyg");
        const response = await request("get", `${API_BASE_URL}/subjects`,null);
        console.log("heoolllll");
        return response.data;
    } catch (error) {
        handleRequestError(error, "Erreur lors de la récupération de tous les matiéres.");
    }
};

// Fonction utilitaire pour la gestion des erreurs
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
