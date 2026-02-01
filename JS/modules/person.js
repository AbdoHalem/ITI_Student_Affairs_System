//? Abstract Class for inheritance
export class Person{
    id = 0;
    name = "";
    age = 0;
    salary = 0;
    phone = "";
    constructor(_id, _name, _age, _salary, _phone){
        this.ID = _id;
        this.Name = _name;
        this.Age = _age;
        this.Salary = _salary;
        this.Phone = _phone;
    }
    //^ Set & Get Accessories
    set ID(_id){
        if(_id > 0){
            this.id = _id;
        }
        else{
            console.log("ID must be greater than 0");
        }
    }
    get ID(){
        return this.id;
    }
    set Name(_name){
        this.name = _name;
    }
    get Name(){
        return this.name;
    }
    set Age(_age){
        if(_age > 0){
            this.age = _age;
        }
        else{
            console.log("Age must be greater than 0");
        }
    }
    get Age(){
        return this.age;
    }
    set Salary(_salary){
        if(_salary > 0){
            this.salary = _salary;
        }
        else{
            console.log("Salary must be greater than 0");
        }
    }
    get Salary(){
        return this.salary;
    }
    set Phone(_phone){
        if(_phone.length === 11){
            this.phone = _phone;
        }
        else{
            console.log("Phone must be consisted of 11 digits");
        }
    }
    get Phone(){
        return this.phone;
    }
}
