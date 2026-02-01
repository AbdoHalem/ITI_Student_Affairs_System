import { Person } from "./person.js";

export class Employee extends Person {
    username = "";
    password = "";
    role = "";
    constructor(_id, _name, _age, _salary, _phone, _username, _password, _role) {
        super(_id, _name, _age, _salary, _phone);
        this.Username = _username;
        this.Password = _password;
        this.Role = _role;
    }
    //^ Set & Get Accessories
    set Username(_username){
        this.username = _username;
    }
    get Username(){
        return this.username;
    }
    set Password(_password){
        this.password = _password;
    }
    get Password(){
        return this.password;
    }
    set Role(_role){
        this.role = _role;
    }
    get Role(){
        return this.role;
    }
}