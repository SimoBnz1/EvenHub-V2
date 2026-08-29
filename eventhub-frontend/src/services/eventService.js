const API_URL = "http://127.0.0.1:8000/api";

export async function createEvent(data) {

    const token = localStorage.getItem("eventhub_token");

    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("type", data.type);
    formData.append("city", data.city);
    formData.append("capacity", data.capacity);
    formData.append("price", data.price);
    formData.append("description", data.description);

    if (data.image) {
        formData.append("image", data.image);
    }

    const response = await fetch(API_URL + "/events", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Authorization": "Bearer " + token
        },
        body: formData
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Erreur lors de la création");
    }

    return result;
}

export async function getMyEvents() {

    const token = localStorage.getItem("eventhub_token");

    const response = await fetch(API_URL + "/my-events", {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Authorization": "Bearer " + token
        }
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Erreur lors du chargement");
    }

    return result;
}

export async function deleteEvent(id) {

    const token = localStorage.getItem("eventhub_token");

    const response = await fetch(API_URL + "/events/" + id, {
        method: "DELETE",
        headers: {
            "Accept": "application/json",
            "Authorization": "Bearer " + token
        }
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Erreur lors de la suppression");
    }

    return result;
}

export async function getEvent(id) {

    const response = await fetch(API_URL + "/events/" + id, {
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Événement introuvable");
    }

    return result;
}


export async function updateEvent(id, data) {

    const token = localStorage.getItem("eventhub_token");

    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("type", data.type);
    formData.append("city", data.city);
    formData.append("capacity", data.capacity);
    formData.append("price", data.price);
    formData.append("description", data.description);

    if (data.image) {
        formData.append("image", data.image);
    }

    formData.append("_method", "PUT");

    const response = await fetch(API_URL + "/events/" + id, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Authorization": "Bearer " + token
        },
        body: formData
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Erreur lors de la modification");
    }

    return result;
}


export async function getEvents() {

    const response = await fetch(API_URL + "/events", {
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error("Erreur lors du chargement des événements");
    }

    return result;
}