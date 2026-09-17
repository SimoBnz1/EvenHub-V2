const API_URL="http://127.0.0.1:8000/api";

export async function createReview(data){
    const token=localStorage.getItem("eventhub_token");

    const response=await fetch(API_URL+"/reviews",{
        method:"POST",
        headers:{
            "Accept":"application/json",
            "Content-Type":"application/json",
            "Authorization":"Bearer "+token
        },
        body:JSON.stringify({
            event_id:data.event_id,
            rating:data.rating,
            comment:data.comment
        })
    });

    const result=await response.json();

    if(!response.ok){
        throw new Error(result.message || "Erreur lors de l'ajout de l'avis");
    }

    return result;
}