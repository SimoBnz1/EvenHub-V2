const API_URL="http://127.0.0.1:8000/api";

export async function getProfile(){
    const token=localStorage.getItem("eventhub_token");

    const response=await fetch(API_URL+"/profile",{
        headers:{
            "Accept":"application/json",
            "Authorization":"Bearer "+token
        }
    });

    const data=await response.json();

    if(!response.ok){
        throw new Error(data.message || "Erreur lors du chargement du profil");
    }

    return data;
}

export async function updateProfile(formData){
    const token=localStorage.getItem("eventhub_token");

    formData.append("_method","PUT");

    const response=await fetch(API_URL+"/profile/1",{
        method:"POST",
        headers:{
            "Accept":"application/json",
            "Authorization":"Bearer "+token
        },
        body:formData
    });

    const data=await response.json();

    if(!response.ok){
        throw new Error(data.message || "Erreur lors de la modification du profil");
    }

    return data;
}