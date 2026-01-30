import {API} from './API.js';

export class LoginService{
    constructor(){
        this.api = new API();
    }
    async login(username, password){
        let user = await this.api.get(`employees?username=${username}&password=${password}`);
        if(user.length > 0){
            sessionStorage.setItem('currentUser', JSON.stringify(user[0]));
            return true;
        }
        else{
            return false;
        }
    }
    logout() {
        localStorage.removeItem('currentUser');
        window.location.href = "login.html";
    }
}