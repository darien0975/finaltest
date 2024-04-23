import axios from "axios";
const API_URL = "http://localhost:8080/api/larpevent";

class LarpEventService{
    post(name , type , time , place, price , male , female , contact , note){
         let token;
         if(localStorage.getItem("user")){
            token = JSON.parse(localStorage.getItem("user")).token;
         }else{
            token = "";
         }
    
         console.log("Male Value:", male);
         console.log("Female Value:", female);
         console.log("Note Value" , note);

         return axios.post(API_URL , {name , type , time , place, price ,  male , female , contact, note  } , 
           {
             headers:{
                Authorization:token,
             }
           }
        ) 
    }
    
    //使用玩家id找到玩家參加的團
    getJoinedLarpEvent(_id){
      let token;
      if(localStorage.getItem("user")){
         token = JSON.parse(localStorage.getItem("user")).token;
      }else{
         token = "";
      }

      return axios.get(API_URL + "/player/" + _id ,{
         headers:{
           Authorization:token,
         },
      }
    )
    }
    
    //使用主持人id找到開團資訊
    get(_id){
        let token;
         if(localStorage.getItem("user")){
            token = JSON.parse(localStorage.getItem("user")).token;
         }else{
            token = "";
         }

         return axios.get(API_URL + "/gamemaster/" + _id ,{
            headers:{
              Authorization:token,
            },
         }
       )
    }

    getLarpByName(name){
      let token;
         if(localStorage.getItem("user")){
            token = JSON.parse(localStorage.getItem("user")).token;
         }else{
            token = "";
         }

         return axios.get(API_URL + "/findByName/" + name ,{
            headers:{
              Authorization:token,
            },
         }
       )
    }

    join(_id){
      let token;
         if(localStorage.getItem("user")){
            token = JSON.parse(localStorage.getItem("user")).token;
         }else{
            token = "";
         }

      return axios.post(API_URL + "/join/" + _id , {} , {
         headers:{
            Authorization:token,
          },
      })
    }
}

export default new LarpEventService();