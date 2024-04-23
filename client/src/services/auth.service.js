import axios from "axios";
const API_URL = "http://localhost:8080/api/user";

class AuthService{
    login(username , password){
        return axios.post(API_URL + "/login" , {
             username,
             password,
        });
    }
    logout(){
        localStorage.removeItem("user");
    }
    register(username , name , password , contact , role , sex){
        return axios.post(API_URL + "/register" ,{
            username, 
            name, 
            password, 
            contact,
            role, 
            sex,
        });
    }

    getCurrentUser(){
        return JSON.parse(localStorage.getItem("user"));
    }
}

export default new AuthService();