import { TheaterIcon } from "lucide-react";

const API_URL = "http://127.0.0.1:8000/api";

export async function loginUser(data) {
    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(data)
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.messg);
    }

    return result;
}

export async function registerUser(data) {
    const response=await fetch(API_URL+"/register",{
        method:"POST",
        headers:{
            "Accept":"application/json",
            "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
    });

    const result=await response.json();

    if(!response.ok){
        throw new Error(result.message || "Erreur lors de l'inscription");
    }

    return result;
}