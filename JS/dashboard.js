//? First (Security Check): check if user is logged in or not using sessionStorage
let currentUser = sessionStorage.getItem('currentUser'); 
if(!currentUser){
    window.location.href = "login.html";
}

//? Second part: Dashboard functionalities
import {TableManager} from './components/TableManager.js';
//& Table Manager
//^ Display the students table as initial table
let tableManager = new TableManager('students');

//^ Get the selected entity from the sidebar
let tableChoice = document.getElementById('tableSelect');
//^ Add event listener to update the table content based on table choice
tableChoice.addEventListener('change', async () => {
    await tableManager.setEntity(tableChoice.value);
})

//^ Search functionality
let searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', () => tableManager.searchData());

//^ Sorting functionality
function sortData(columnKey){
    tableManager.sortData(columnKey);
}
window.sortData = sortData;

//^ Add row functionality - Modal handling
let addRowBtn = document.getElementById('addRowBtn');
let rowModal = document.getElementById('rowModal');     //* modal class
let rowForm = document.getElementById('rowForm');       //* form id
let cancelModalBtn = document.getElementById('cancelModalBtn');

//^ Function to open modal
function openModal() {
    rowModal.style.display = 'flex';
    //^ Generate modal form fields based on selected table
    tableManager.generateModalForm();
}

//^ Function to close modal
function closeModal() {
    rowModal.style.display = 'none';
    rowForm.reset();    //* reset form fields
}

//^ Close modal when cancel button is clicked
cancelModalBtn.addEventListener('click', () => {
    closeModal();
});

//^ Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === rowModal) {
        closeModal();
    }
});

//^ Open modal when Add Row button is clicked
//! State variables to track editing mode
let isEditing = false;
let currentEditedID = null;
addRowBtn.addEventListener('click', () => {
    isEditing = false;
    currentEditedID = null;
    //* Open modal and generate form fields
    openModal();
});

//^ Handle form submission
rowForm.addEventListener('submit', async (e) => {
    e.preventDefault();     //* prevent default form submission refresh
    let newData = tableManager.getFormData();
    console.log("New input data: ", newData);

    try{
        let classObject = tableManager.createEntityObject(newData);
        if(isEditing){
            console.log("Updated object: ", classObject);
            classObject.id = currentEditedID;
            await tableManager.editRow(currentEditedID, classObject);
        }
        else{
            console.log("New object: ", classObject);
            await tableManager.addRow(classObject);
        }
        closeModal();
    }
    catch(error){
        console.error('Error saving row:', error);
        alert('Failed to save data. Please try again.');
    }
})

//^ Make 'select all' input checkbox to select all rows
document.getElementById('selectAll').addEventListener('change', () => {
    let allCheckboxes = document.querySelectorAll('input[type="checkbox"]');
    allCheckboxes.forEach((checkbox) => {
        checkbox.checked = document.getElementById('selectAll').checked;
    })
    //* Display the delete selected button if selected all 
    if(document.getElementById('selectAll').checked){
        document.getElementById('deleteSelectedBtn').style.display = 'inline-flex';
    }
    else{
        document.getElementById('deleteSelectedBtn').style.display = 'none';
    }

})

//^ Handle Interactions inside the table (Event Delegation)
let tableBody = document.getElementById('tableBody');

tableBody.addEventListener('click', async (e) => {
    e.preventDefault();
    console.log(e.target);
    //* Check if a checkbox is clicked
    if (e.target.type === 'checkbox') {
        if(document.querySelectorAll('.row-checkbox:checked').length > 0){
            document.getElementById('deleteSelectedBtn').style.display = 'inline-flex';
        }
        else{
            document.getElementById('deleteSelectedBtn').style.display = 'none';
        }
    }
    //* Check if a delete button is clicked
    if (e.target.closest('.delete-btn')) {
        const btn = e.target.closest('.delete-btn');
        const id = btn.getAttribute('data-id');
        console.log('Deleting row:', id);
        if(confirm(`Are you sure you want to delete item with ID: ${id}?`)){
            deleteElement(id);
        }
    }
    //* Check if an edit button is clicked
    if (e.target.closest('.edit-btn')) {
        const btn = e.target.closest('.edit-btn');
        const id = btn.getAttribute('data-id');
        console.log('Editing row:', id);
        //* Set editing mode and current ID
        isEditing = true;
        currentEditedID = id;
        openModal();
        let title = tableManager.entityName;
        //* Capitalize the first letter in the title
        title = title.at(0).toUpperCase() + title.slice(1, title.length - 1);
        document.getElementById('modalTitle').textContent = `Edit ${title}`;
        tableManager.fillFormData(id);
    }
});

//^ Handling 'Delete selected' button
document.getElementById('deleteSelectedBtn').addEventListener('click', async () => {
    let selectedRows = document.querySelectorAll('.row-checkbox:checked');
    if(confirm(`Are you sure you want to delete the selected rows ?`)){
        selectedRows.forEach((row) => {
            deleteElement(row.value);
        })
    }
})

async function deleteElement(id){
    await tableManager.deleteRow(id);
    console.log('Deleting row:', id);
}
