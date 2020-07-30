const contacts = [{
        name: "Name1",
        address: {
            street: "Street1",
            city: "City1",
            state: "State1",
            zip: "Zip1"
        },
        phone: "Phone1"
    },
    {
        name: "Name2",
        address: {
            street: "Street2",
            city: "City2",
            state: "State2",
            zip: "Zip2",
        },
        phone: "Phone2"
    },
    {
        name: "Name3",
        address: {
            street: "Street3",
            city: "City3",
            state: "State3",
            zip: "Zip3",
        },
        phone: "Phone3"
    }
]

const addNewContactButton = document.getElementById('addNewContactButton');
const cancelAddContactButton = document.getElementById('cancelAddContactButton');
const saveContactButton = document.getElementById('saveContactButton');
let saveButtonAction = null;
 
// This displays a single contact on the page and adds 2 buttons.
// One button to delete the contact and another to update it.
const renderContact = (name, address, phone) => {
    const randomID = Math.random().toString();
    const newContactElement = document.createElement('div');
    newContactElement.innerHTML = `
      <div class='contact-element'>
        <b>${name}</b>
        <p>${address.street}</p>
        <p>${address.city}</p>
        <p>${address.state}</p>
        <p>${address.zip}</p>
        <p>${phone}</p>
        <button id="deleteContactButton" onclick="deleteContactHandler('${name}')">Delete</button>
        <button class="updateContactButton" id="updateContactButton${randomID}">Update</button>
      </div>
    `;
    const contactsList = document.getElementById('contacts');
    contactsList.append(newContactElement);
    const updateContactButton = document.getElementById('updateContactButton' + randomID);
    updateContactButton.addEventListener('click', updateContactHandler.bind(null, name));
    console.log(name, address, phone);
};

// Iterate through the array of contacts and display each one on the page.
const showAllContacts = () => {
    for (i = 0; i < contacts.length; i++) {
        // console.log(contacts[i]);
        renderContact(contacts[i].name, contacts[i].address, contacts[i].phone)
    }
}

// Display the edit form and hide the list so the user can either add a new contact or 
// update an existing one.
const displayFormHandler = () => {
    const addForm = document.getElementById('addForm');
    addForm.style.display = 'block';
    const contacts = document.getElementById('contacts');
    contacts.style.display = 'none';
}

// Display the list and hide the edit form. Opposite of displayFormHandler().
const cancelAddContactHandler = () => {
    const addForm = document.getElementById('addForm');
    addForm.style.display = 'none';
    const contacts = document.getElementById('contacts');
    contacts.style.display = 'block';
    const addNewContactButton = document.getElementById('addNewContactButton');
    addNewContactButton.style.display = 'block';
    document.getElementById('form').reset();
}

// Event handler for adding a new contact.
const saveContactHandler = () => {
    const newContact = {
        name: document.getElementById('name').value,
        address: {
            street: document.getElementById('street').value,
            city: document.getElementById('city').value,
            state: document.getElementById('state').value,
            zip: document.getElementById('zip').value
        },
        phone: document.getElementById('phone').value
    };
    contacts.push(newContact);
    renderContact(newContact.name, newContact.address, newContact.phone);
    const addForm = document.getElementById('addForm');
    addForm.style.display = 'none';
    const contactsList = document.getElementById('contacts');
    contactsList.style.display = 'block';
}

// Event handler for deleting a contact.
const deleteContactHandler = (name) => {
    let contactIndex = 0;
    for (const contact of contacts) {
        if (contact.name === name) {
            break;
        }
        contactIndex++;
    }
    contacts.splice(contactIndex, 1);
    const listRoot = document.getElementById('contacts');
    listRoot.children[contactIndex].remove();
    console.log(name);
}

// Event handler for updating an existing contact. This populates the input fields
// with values from the contact to be edited.
const updateContactHandler = (name) => {
    let contactIndex = 0;
    for (const contact of contacts) {
        if (contact.name === name) {
            break;
        }
        contactIndex++;
    }
    const contact = contacts[contactIndex];
    document.getElementById('name').value = contact.name;
    document.getElementById('street').value = contact.address.street;
    document.getElementById('city').value = contact.address.city;
    document.getElementById('state').value = contact.address.state;
    document.getElementById('zip').value = contact.address.zip;
    document.getElementById('phone').value = contact.phone;
    saveContactButton.removeEventListener('click', saveContactHandler);
    saveButtonAction = saveUpdatedContactHandler.bind(null, contactIndex);
    saveContactButton.addEventListener('click', saveButtonAction);
    const addNewContactButton = document.getElementById('addNewContactButton');
    addNewContactButton.style.display = 'none';
    displayFormHandler();
}

// Event handler for saving an existing contact after it has been edited. 
const saveUpdatedContactHandler = (index) => {
    contacts[index].name = document.getElementById('name').value;
    contacts[index].address.street = document.getElementById('street').value;
    contacts[index].address.city = document.getElementById('city').value;
    contacts[index].address.state = document.getElementById('state').value;
    contacts[index].address.zip = document.getElementById('zip').value;
    contacts[index].phone = document.getElementById('phone').value;
    console.log(contacts[index]);
    const updateList = document.getElementById('contacts');
    removeAllChildNodes(updateList);
    const addForm = document.getElementById('addForm');
    addForm.style.display = 'none';
    const contactsList = document.getElementById('contacts');
    contactsList.style.display = 'block';
    showAllContacts();
    saveContactButton.removeEventListener('click', saveButtonAction);
    saveContactButton.addEventListener('click', saveContactHandler);
    document.getElementById('form').reset();
    const addNewContactButton = document.getElementById('addNewContactButton');
    addNewContactButton.style.display = 'block';
}

const removeAllChildNodes = (parent) => {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

showAllContacts();

addNewContactButton.addEventListener('click', displayFormHandler);
cancelAddContactButton.addEventListener('click', cancelAddContactHandler);
saveContactButton.addEventListener('click', saveContactHandler);