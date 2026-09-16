const API_URL = "http://127.0.0.1:8000/api";

export async function getEquipment() {

    const token = localStorage.getItem("eventhub_token");

    const response = await fetch(API_URL + "/equipment", {
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






export async function createEquipment(name, quantity) {

    const token = localStorage.getItem("eventhub_token");

    const response = await fetch(API_URL + "/equipment", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify({
            name: name,
            total_quantity: quantity
        })
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Erreur lors de l'ajout");
    }

    return result;
}


export async function updateEquipment(id, name, quantity) {

    const token = localStorage.getItem("eventhub_token");

    const response = await fetch(API_URL + "/equipment/" + id, {
        method: "PUT",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify({
            name: name,
            total_quantity: quantity
        })
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Erreur lors de la modification");
    }

    return result;
}


export async function deleteEquipment(id) {

    const token = localStorage.getItem("eventhub_token");

    const response = await fetch(API_URL + "/equipment/" + id, {
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