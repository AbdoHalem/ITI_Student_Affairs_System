export class API{
    // Constructor: Sets the base URL.
    // Default is an empty string to allow relative paths, which is best for
    // the json-server static hosting method (frontend and backend on same origin).

    // constructor(baseURL = 'http://localhost:3000'){
    // constructor(baseURL = 'https://itistudentaffairssystem-production.up.railway.app') {
    constructor(baseURL = '') {
        this.baseURL = baseURL;
    }
    async get(endpoint){
        try{
            // Logic to handle full URLs vs relative endpoints
            // If endpoint starts with 'http', use it as is.
            // Otherwise, combine baseURL and endpoint.
            // Note: If baseURL is empty, this results in '/endpoint' (relative to root).

            // const separator = endpoint.includes('?') ? '&' : '?';
            //// let URL = `${this.baseURL}/${endpoint}${separator}_t=${Date.now()}`;
            // let URL = `${this.baseURL}/${endpoint}`;
            const URL = endpoint.startsWith('http') ? endpoint : 
                       (this.baseURL ? `${this.baseURL}/${endpoint}` : endpoint);
            let response = await fetch(URL);
            let data = await response.json();
            return data;
        }
        catch(error){
            console.error("GET Request Error:", error);
            throw error;
        }
    }
    async post(endpoint, data){
        try{
            // Construct the full URL
            const url = this.baseURL ? `${this.baseURL}/${endpoint}` : endpoint;
            // let response = await fetch(`${this.baseURL}/${endpoint}`, {
            let response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
            });
            return await response.json();
        }
        catch(error){
            console.error('Error adding row:', error);
            throw error;
        }
    }
    async delete(endpoint, id){
        try{
            // Construct the full URL with ID
            const url = this.baseURL ? `${this.baseURL}/${endpoint}/${id}` : `${endpoint}/${id}`;
            // let response = await fetch(`${this.baseURL}/${endpoint}/${id}`, {
            let response = await fetch(url, {
                method: 'DELETE'
            });
            return await response.json();
        }
        catch(error){
            console.error('Error deleting row:', error);
            throw error;
        }
    }
    async put(endpoint, id, data){
        try{
            // Construct the full URL with ID
            const url = this.baseURL ? `${this.baseURL}/${endpoint}/${id}` : `${endpoint}/${id}`;
            let response = await fetch(url, {
            // let response = await fetch(`${this.baseURL}/${endpoint}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            return await response.json();
        }
        catch(error){
            console.error('Error updating row:', error);
            throw error;
        }
    }
}