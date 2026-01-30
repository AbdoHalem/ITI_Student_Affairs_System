import {API} from '../services/API.js';
import {Student} from '../modules/student.js';
import {Instructor} from '../modules/instructor.js';
import {Course} from '../modules/course.js';

export class TableManager {
    /**
     * Creates a new TableManager instance.
     * @param {string} _entityName The entity endpoint name (e.g., 'students', 'instructors', 'courses').
     */
    constructor(_entityName) {
        this.api = new API();
        this.setEntity(_entityName);
        this.currentPage = 1;
        this.limit = 6;
        this.allData = [];

        this.filteredData = [];
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.sortBtn;
        this.pageInfo = document.getElementById('pageInfo');
        this.prevBtn.addEventListener('click', () => this.changePage(-1));
        this.nextBtn.addEventListener('click', () => this.changePage(1));
        this.searchBoxID = 'searchInput';   //* ID of the search input box
    }
    //^ =============== Methods ===============
    /**
     * Gets the total number of records currently loaded.
     * @returns {number} Total number of records in `allData`.
     */
    getTableLength(){
        return this.allData.length;
    }

    /**
     * Sets the active entity (API endpoint) and refreshes the table UI.
     * Resets pagination, loads data, rebuilds table headers, and applies search filtering.
     * @param {string} _entityName The entity endpoint name.
     * @returns {Promise<void>}
     */
    async setEntity(_entityName) {
        this.entityName = _entityName;
        this.currentPage = 1;                   //* Reset page to 1 when changing entity
        await this.loadData();                  //* Load the data from the server
        this.arrangeColumns(this.allData[0]);   //* Arrange columns in table header
        this.searchData();                      //* Read search input first then display data accordingly
    }

    /**
     * Changes the current page by a given direction and re-renders the table.
     * @param {number} _direction Page delta (e.g., -1 for previous, +1 for next).
     * @returns {void}
     */
    changePage(_direction) {
        this.currentPage += _direction;
        console.log('Current page: ', this.currentPage);
        this.displayData(this.filteredData);
    }

    /**
     * Builds the table header columns dynamically based on the keys of a sample data object.
     * @param {Object|null|undefined} data A representative record used to determine column names.
     * @returns {void}
     */
    arrangeColumns(data) {
        if (!data) {    //* If no data, return
            return;
        }
        let headerRow = document.getElementById('tableHeaderRow');

        //* Remove existing columns
        while (headerRow.children.length > 1) {
            headerRow.removeChild(headerRow.lastChild);
        }
        let newColumnsHTML = '';
        //* Loop through data and create columns
        for(let key in data){
            //* Capitalize the first letter of the key for display
            let header = key.charAt(0).toUpperCase() + key.slice(1);
            newColumnsHTML += `<th>${header}
                <i data-column="${key}" data-order="default" id="${key}" onclick="sortData('${key}')" class="fas fa-sort">&#9650</i>
                </th>`;
        }
        newColumnsHTML += `<th>Actions</th>`;
        headerRow.insertAdjacentHTML('beforeend', newColumnsHTML);
    }

    /**
     * Loads all records for the current entity from the API.
     * @returns {Promise<void>}
     * @throws {Error} Rethrows any API errors to allow callers to handle them.
     */
    async loadData() {
        // let endpoint = `${this.entityName}?_page=${this.currentPage}&_limit=${this.limit}`;
        let endpoint = this.entityName;
        try {
            this.allData = await this.api.get(endpoint);
        } catch (error) {
            console.error("Error loading data:", error);
            throw error;
        }
        console.log(this.allData);
    }

    /**
     * Updates pagination UI (page label, previous/next button disabled state) based on data size.
     * @param {Array} data The dataset currently being paginated.
     * @returns {void}
     */
    updatePaginationState(data){
        this.pageInfo.textContent = `Page ${this.currentPage}`;
        this.prevBtn.disabled = this.currentPage === 1;
        //* Calculate number of total pages
        const totalPages = Math.ceil(data.length / this.limit);
        this.nextBtn.disabled = this.currentPage >= totalPages;
    }

    /**
     * Sorts the currently filtered data by a given column and refreshes the table.
     * Toggles between ascending and descending order and updates the sort icon.
     * @param {string} columnKey The object key to sort by.
     * @returns {void}
     */
    sortData(columnKey){
        let arrow = document.getElementById(columnKey);
        let currentOrder = arrow.getAttribute('data-order');
        let newOrder = 'asc';

        //* Reverse the order
        if(currentOrder === 'asc'){
            newOrder = 'desc';
        }
        else{
            newOrder = 'asc';
        }

        //* Sort the data
        this.filteredData.sort((a, b) => {
            let val1 = a[columnKey];
            let val2 = b[columnKey];
            if(!isNaN(val1) && !isNaN(val2) && columnKey !== 'phone'){
                val1 = Number(val1);
                val2 = Number(val2);
                return newOrder === 'asc' ? val1 - val2 : val2 - val1;
            }
            else{
                val1 = a[columnKey].toString().toLowerCase();
                val2 = b[columnKey].toString().toLowerCase();
                if(val1 >= val2){
                    return newOrder === 'asc' ? 1 : -1;
                }
                else{
                    return newOrder === 'desc' ? 1 : -1;
                }
            }
        });

        //* Reset all the arrow icons
        let allArrows = document.querySelectorAll('.fa-sort, .fa-sort-up, .fa-sort-down');
        allArrows.forEach((arrow) => {
            //* Reset all arrows to default (asc)
            arrow.className = 'fas fa-sort';
            arrow.setAttribute('data-order', 'asc');
        });

        //* Update the clicked icon
        arrow.setAttribute('data-order', newOrder);
        if(newOrder === 'asc'){
            arrow.className = 'fas fa-sort-up';
            arrow.innerHTML = '&#9650';
        }
        else{
            arrow.className = 'fas fa-sort-down';
            arrow.innerHTML = '&#9660';
        }
        this.displayData(this.filteredData);
    }

    /**
     * Filters `allData` based on the current search input value and re-renders the table.
     * @returns {Promise<void>}
     */
    async searchData() {
        //& Query is the search term entered by user
        //* Get input search query and convert to lowercase for case-insensitive search
        let query = document.getElementById(this.searchBoxID).value.toLowerCase();
        this.currentPage = 1;   //* Reset to first page on new search
        if(!query){
            this.filteredData = this.allData;
            this.displayData(this.filteredData);        
        }
        else{
            console.log(query);
            this.filteredData = this.allData.filter((item) => {
                for(let key in item){
                    if(item[key].toString().toLowerCase().includes(query)){
                        return true;
                    }
                }
            });
            console.log('Filtered data: ', this.filteredData);
            this.displayData(this.filteredData);
        }
    }

    /**
     * Renders a paginated view of the provided dataset into the table body.
     * @param {Array} [data=this.allData] The dataset to display (usually `filteredData`).
     * @returns {Promise<void>}
     */
    async displayData(data = this.allData) {
        let tableBody = document.getElementById('tableBody');
        tableBody.innerHTML = '';               //* Clear table body
        //* Calculate start and end indices
        const startIndex = (this.currentPage - 1) * this.limit;
        const endIndex = startIndex + this.limit;
        //* Get selected data according to start and end indices
        const pageData = data.slice(startIndex, endIndex);
        this.updatePaginationState(data);       //* Update button states
        if(data.length > 0){                    //* Hide empty state if data exists
            document.getElementById('emptyState').style.display = 'none';
        }
        else{
            document.getElementById('emptyState').style.display = 'block';
            return;
        }
        //* Write table content
        let allRows = this.writeTableContent(pageData);
        //* Display data in table
        tableBody.innerHTML = allRows;
    }

    /**
     * Generates HTML rows for a dataset.
     * @param {Array} data Page-level dataset (already sliced for pagination).
     * @returns {string} HTML string containing all table rows.
     */
    writeTableContent(data){
        //* Make a string variable to concatenate the HTML code in it
        let allRows = '';
        let tableBody = document.getElementById('tableBody');
        tableBody.innerHTML = '';

        //* Loop through data and create rows
        data.forEach((item) => {
            //* Create a string variable to hold the HTML for each row
            let rowHTML = `
                <tr data-id="${item.id}"> <td width="50">
                        <input type="checkbox" class="row-checkbox" value="${item.id}"> 
                    </td>`;
            for(let key in item){
                rowHTML += `<td>${item[key]}</td>`;
            }
            rowHTML += `
                <td>
                    <div class="action-buttons">
                        <button class="icon-btn edit-btn" title="Edit Row" data-id="${item.id}">
                            <i class="fas fa-edit pointer-events-none"></i>
                        </button>
                        <button class="icon-btn delete-btn" title="Delete Row" data-id="${item.id}">
                            <i class="fas fa-trash-alt pointer-events-none"></i>
                        </button>
                    </div>
                </td>
            </tr>`;
            allRows += rowHTML;
        });
        return allRows;
    }

    /**
     * Generates the modal form inputs dynamically based on the current entity structure.
     * Uses the first record in `allData` as a schema reference.
     * @returns {void}
     */
    generateModalForm(){
        let dataHeaders = this.allData[0];
        if(!dataHeaders){
            console.error('Data header not found');
            return;
        }
        //* Get the entity name and capitalize it
        let tableName = this.entityName;
        tableName = tableName.at(0).toUpperCase() + tableName.slice(1, tableName.length - 1);
        document.getElementById('modalTitle').textContent = `Add New ${tableName}`;
        //* Get the form fields container and write the form fields
        let formFields = document.getElementById('dynamicInputsContainer');
        formFields.innerHTML = '';  //* Clear form fields
        for(let key in dataHeaders){
            if(key === 'id'){       //* Skip the id field as it is auto generated
                continue;  
            }
            //* Capitalize first litter in the key word
            let header = key.at(0).toUpperCase() + key.slice(1);
            formFields.innerHTML +=
                `<div class="form-group">
                    <label for="input${header}">${header} *</label>
                    <input type="text" id="input${header}" required>
                </div>`;
        }
    }

    /**
     * Reads values from dynamically generated form inputs and returns them in entity-field order.
     * @returns {Array} Array of field values aligned with the entity constructor arguments.
     */
    getFormData(){
        let dataHeaders = this.allData[0];
        let inputID = '';
        let formData = [];
        for(let key in dataHeaders){
            if(key === 'id'){
                formData.push(this.getTableLength() + 1);
                continue;
            }
            inputID = 'input' + key.charAt(0).toUpperCase() + key.slice(1);
            formData.push(document.getElementById(inputID).value);
        }
        return formData;
    }

    /**
     * Creates an entity instance (Student/Instructor/Course) based on the current entity name.
     * @param {Array} rowData The values used to construct the entity instance.
     * @returns {Student|Instructor|Course|null} The created entity instance or null if the entity name is invalid.
     */
    createEntityObject(rowData) {
        /**
         * A mapping of entity names to their corresponding entity classes.
         * @type {Object.<string, function>}
         */
        const entityClasses = {
            'students': Student,
            'instructors': Instructor,
            'courses': Course,
        };
        const EntityClass = entityClasses[this.entityName];
        if (EntityClass) {
            return new EntityClass(...rowData);
        } else {
            console.error('Invalid entity name');
            return null;
        }
    }

    /**
     * Adds a new record via the API, updates local cache, and refreshes the view.
     * @param {Object} newData The new record to add.
     * @returns {Promise<void>}
     */
    async addRow(newData){
        newData.id = String(Number(this.allData[this.allData.length - 1].id) + 1);
        let endpoint = this.entityName;
        try{
            let addedData = await this.api.post(endpoint, newData);
            console.log('Added data: ', addedData);
            this.allData.push(addedData);
            this.searchData();
        }
        catch(error){
            console.error("Error adding data:", error);
            throw error;
        }
    }

    /**
     * Deletes a record by id via the API, updates local cache, and refreshes the view.
     * @param {string|number} id Record identifier.
     * @returns {Promise<void>}
     */
    async deleteRow(id){
        console.log(typeof id);
        try{
            let deletedRow = await this.api.delete(this.entityName, id);
            console.log('Deleted row: ', deletedRow);
            this.allData.splice(this.allData.findIndex((item) => item.id === id), 1);
            this.searchData();
        }
        catch(error){
            console.error("Error deleting data:", error);
            throw error;
        }
    }

    /**
     * Updates a record by id via the API, updates local cache, and refreshes the view.
     * @param {string|number} id Record identifier.
     * @param {Object} modifiedData Updated record fields.
     * @returns {Promise<void>}
     */
    async editRow(id, modifiedData){
        console.log('Editing row:', id);
        let updatedRow = await this.api.put(this.entityName, id, modifiedData);
        console.log('Updated row: ', updatedRow);
        this.allData.splice(this.allData.findIndex((item) => item.id === id), 1, updatedRow);
        this.searchData();
    }

    /**
     * Populates modal form inputs with values from an existing record.
     * @param {string|number} id Record identifier.
     * @returns {void}
     */
    fillFormData(id){
        const item = this.allData.find((item) => String(item.id) === String(id));
        if(!item){
            console.error('Item not found');
            return;
        }
        for (let key in item) {
            if (key === 'id') continue;
            //* Capitalize first letter in the key word
            let inputId = 'input' + key.charAt(0).toUpperCase() + key.slice(1);
            let inputElement = document.getElementById(inputId);
            //* Set the value of the input element
            if (inputElement) {
                inputElement.value = item[key];
            }
        }
    }
}