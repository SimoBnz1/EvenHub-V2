const API_URL="http://127.0.0.1:8000/api";

export async function getPrestataire(id){
    const response=await fetch(API_URL+"/prestataires/"+id,{
        headers:{
            "Accept":"application/json"
        }
    });

    const data=await response.json();

    if(!response.ok){
        throw new Error(data.message || "Erreur lors du chargement du prestataire");
    }

    return data;
}