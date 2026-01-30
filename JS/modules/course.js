export class Course {
    id;
    name;
    duration;
    instructor;
    constructor(_id, _name, _duration, _instructor){
        this.ID = _id;
        this.Name = _name;
        this.Duration = _duration;
        this.Instructor = _instructor;
    }
    //^ Set & Get Accessories
    set ID(_id) {
        if(_id > 0){
            this.id = _id;
        }
        else{
            console.error("ID must be greater than 0");
        }
    }
    get ID() {
        return this.id;
    }
    set Name(_name) {
        this.name = _name;
    }
    get Name() {
        return this.name;
    }
    set Duration(_duration) {
        if(_duration > 0){
            this.duration = _duration;
        }
        else{
            console.error("Duration must be greater than 0");
        }
    }
    get Duration() {
        return this.duration;
    }
    set Instructor(_instructor) {
        this.instructor = _instructor;
    }
    get Instructor() {
        return this.instructor;
    }
}