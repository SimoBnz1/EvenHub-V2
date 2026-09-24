const API_URL="http://127.0.0.1:8000/api";

export async function getFavorites(){
    const token=localStorage.getItem("eventhub_token");

    const response=await fetch(API_URL+"/favorites",{
        headers:{
            "Accept":"application/json",
            "Authorization":"Bearer "+token
        }
    });

    const data=await response.json();

    if(!response.ok){
        throw new Error(data.message || "Erreur lors du chargement des favoris");
    }

    return data;
}

export async function addFavorite(eventId){
    const token=localStorage.getItem("eventhub_token");

    const response=await fetch(API_URL+"/favorites",{
        method:"POST",
        headers:{
            "Accept":"application/json",
            "Content-Type":"application/json",
            "Authorization":"Bearer "+token
        },
        body:JSON.stringify({
            event_id:eventId
        })
    });

    const data=await response.json();

    if(!response.ok){
        throw new Error(data.message || "Erreur lors de l'ajout aux favoris");
    }

    return data;
}

export async function deleteFavorite(id){
    const token=localStorage.getItem("eventhub_token");

    const response=await fetch(API_URL+"/favorites/"+id,{
        method:"DELETE",
        headers:{
            "Accept":"application/json",
            "Authorization":"Bearer "+token
        }
    });

    const data=await response.json();

    if(!response.ok){
        throw new Error(data.message || "Erreur lors de la suppression");
    }

    return data;
}