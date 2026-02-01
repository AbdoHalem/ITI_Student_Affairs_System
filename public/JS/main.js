//? First part: login form validation
import { LoginService } from "./services/LoginService.js";

let loginService = new LoginService();

//& Hide error message on input
document.getElementById('username').addEventListener('input', function() {
    document.getElementById('wrong-msg').hidden = true;
});
document.getElementById('password').addEventListener('input', function() {
    document.getElementById('wrong-msg').hidden = true;
});

//& Check login validation at submit
document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();     //* Prevent form submission
    try{
        //* Get input data
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        let valid = await loginService.login(username, password);
        //* Redirect or show error based on validation
        if(valid){
            window.location.href = "index.html";
        }
        else{
            document.getElementById('wrong-msg').textContent = "Invalid Email or Password!";
            document.getElementById('wrong-msg').hidden = false;
        }
    }
    catch(error){       //* Handle server errors
        console.log("Login Error:", error);
        document.getElementById('wrong-msg').textContent = "Server Error! Please try again."
        document.getElementById('wrong-msg').hidden = false;
    }
    
});