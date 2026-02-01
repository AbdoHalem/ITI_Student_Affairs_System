import {Person} from "./person.js";

export class Student extends Person {
    email = "";
    department = "";
    constructor(_id, _name, _age, _salary, _phone, _email, _department) {
        super(_id, _name, _age, _salary, _phone);
        this.Email = _email;
        this.Department = _department;
    }
    //^ Set & Get Accessories
    set Email(_email){
        this.email = _email;
    }
    get Email(){
        return this.email;
    }
    set Department(_department){
        this.department = _department;
    }
    get Department(){
        return this.department;
    }
}
