const API_URL="http://127.0.0.1:8000/api";

export async function getTopPrestataires(){
    const response=await fetch(API_URL+"/top-prestataires");

    const data=await response.json();

    if(!response.ok){
        throw new Error("Erreur lors du chargement des prestataires");
    }

    return data;
}