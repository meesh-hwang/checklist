// Select items

const alert = document.querySelector('.alert');
const form = document.querySelector('.list-form');
const listInput = document.getElementById('list-input');
const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.list-container');
const list = document.querySelector('.list');
const clearBtn = document.querySelector('.clear-btn');
const appTitle = document.querySelector('.app-title');
const textCursor = document.querySelector('.blinking-cursor');


// edit option

let editElement;
let editFlag = false;

// -----------event listeners---------

// edit list title
appTitle.addEventListener('click', removeBlink);

// submit form
form.addEventListener('submit', addItem)

// clear items
clearBtn.addEventListener('click', clearItems);

// ----------functions--------------

// display alert
function displayAlert(text, action) {
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);

    // remove alert
    setTimeout(function() {
        alert.textContent = "";
        alert.classList.add(`alert-${action}`);
    }, 1000);
    setBackToDefault();
}

function addItem(e) {
    e.preventDefault();

    const value = listInput.value;

    if(value && !editFlag){
        const element = document.createElement("article");
        // add class .list-item (each individual list item) to article
        element.classList.add('list-item');
        
        // Insert the html including the delete and edit buttons into the article
        element.innerHTML = `<p class="title">${value}</p>
                            <div class="btn-container">
                                <button type="button" class="edit-btn"><img src="img/edit.svg" class="edit-img icon" alt="edit icon">
                                </button>
                                <button type="button" class="delete-btn">
                                    <img src="img/delete.svg" class="delete-img icon" alt="delete icon">
                                </button>
                            </div>`;

        // delete and edit buttons
        const deleteBtn = element.querySelector('.delete-btn');
        const editBtn = element.querySelector('.edit-btn');
        deleteBtn.addEventListener('click', deleteItem);
        editBtn.addEventListener('click', editItem);

        // append child (attach list item to list)
        list.appendChild(element);
        // display alert
        displayAlert('item added to the list', 'success')
        // show container
        container.classList.add('show-container');
        // set back to default
        setBackToDefault();
    } 
    
    else if(value && editFlag) {
        editElement.innerHTML = value;
        displayAlert('value changed', 'success');

        setBackToDefault();
    } else {
        displayAlert("please enter value", "danger")
    }
}



// clear items
function clearItems() {
    const items = document.querySelectorAll('.list-item');

    if(items.length > 0) {
        items.forEach(function(item) {
            list.removeChild(item);
            setBackToDefault;
        });
    }
    container.classList.remove('show-container');
    displayAlert('empty list', 'danger');
    setBackToDefault();
}

// delete function
function deleteItem(e) {
    const element = e.currentTarget.parentElement.parentElement;
    // class delete-btn is a child of the class btn-container which is a child of the article class 'list-item'
    // element = ".list-item"
    list.removeChild(element);
    if(list.children.length === 0) {
        container.classList.remove('show-container');
    }
    displayAlert('item removed', 'danger');
    setBackToDefault();

}
// edit function
function editItem(e) {
    const element = e.currentTarget.parentElement.parentElement;
    // set edit item
    editElement = e.currentTarget.parentElement.previousElementSibling;
    // set form value
    listInput.value = editElement.innerHTML;
    editFlag = true;
    submitBtn.textContent = "edit";
}

function removeBlink(e) {
    appTitle.removeChild(textCursor); 
}

// set back to default
function setBackToDefault() {
    listInput.value = '';
    editFlag = false;
    submitBtn.textContent = "submit";
}