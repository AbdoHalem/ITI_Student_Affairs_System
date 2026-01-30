export class API{
    constructor(baseURL = 'http://localhost:3000'){
        this.baseURL = baseURL;
    }
    async get(endpoint){
        try{
            const separator = endpoint.includes('?') ? '&' : '?';
            // let URL = `${this.baseURL}/${endpoint}${separator}_t=${Date.now()}`;
            let URL = `${this.baseURL}/${endpoint}`;
            let response = await fetch(URL);
            let data = await response.json();
            return data;
        }
        catch(error){
            throw error;
        }
    }
    async post(endpoint, data){
        try{
            let response = await fetch(`${this.baseURL}/${endpoint}`, {
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
            let response = await fetch(`${this.baseURL}/${endpoint}/${id}`, {
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
            let response = await fetch(`${this.baseURL}/${endpoint}/${id}`, {
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