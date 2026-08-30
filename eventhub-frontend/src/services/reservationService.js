const API_URL = "http://127.0.0.1:8000/api";

export async function createReservation(data) {

    const token = localStorage.getItem("eventhub_token");

    console.log("TOKEN:", token);

    const response = await fetch(API_URL + "/reservations", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            event_id: data.event_id,
            event_date: data.event_date,
            location: data.location,
            guest_count: data.guest_count
        })
    });

    const result = await response.json();

    console.log("STATUS:", response.status);
    console.log("RESPONSE:", result);

    if (!response.ok) {
        throw new Error(result.message || "Erreur lors de la réservation");
    }

    return result;
}

export async function getReservations() {

    const token = localStorage.getItem("eventhub_token");

    const response = await fetch(API_URL + "/reservations", {
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


export async function updateReservationStatus(id, status) {

    const token = localStorage.getItem("eventhub_token");

    const response = await fetch(API_URL + "/reservations/" + id, {
        method: "PUT",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify({
            status: status
        })
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Erreur lors de la modification");
    }

    return result;
}