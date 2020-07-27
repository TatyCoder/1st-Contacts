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
        <button id="deleteContactButton" onclick="deleteContact('${name}')">Delete</button>
        <button class="updateContactButton" id="updateContactButton${randomID}">Update</button>
      </div>
    `;
    const contactsList = document.getElementById('contacts');
    contactsList.append(newContactElement);
    const updateContactButton = document.getElementById('updateContactButton'+randomID);
    updateContactButton.addEventListener('click', updateContact.bind(null, name));
    console.log(name, address, phone);
};

const showContacts = () => {
    for (i = 0; i < contacts.length; i++) {
        // console.log(contacts[i]);
        renderContact(contacts[i].name, contacts[i].address, contacts[i].phone)
    }
}

const displayForm = () => {
    const addForm = document.getElementById('addForm');
    addForm.style.display = 'block';
    const contacts = document.getElementById('contacts');
    contacts.style.display = 'none';
}

const cancelAddContact = () => {
    const addForm = document.getElementById('addForm');
    addForm.style.display = 'none';
    const contacts = document.getElementById('contacts');
    contacts.style.display = 'block';
}

const saveContact = () => {
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

const deleteContact = (name) => {
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

const updateContact = (name) => {
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
    saveContactButton.removeEventListener('click', saveContact);
    saveContactButton.addEventListener('click', saveExistingContact.bind(null, contactIndex));
    displayForm();
}

const saveExistingContact = (index) => {
    contacts[index].name = document.getElementById('name').value;
    contacts[index].address.street = document.getElementById('street').value;
    contacts[index].address.city = document.getElementById('city').value;
    contacts[index].address.state = document.getElementById('state').value;
    contacts[index].address.zip = document.getElementById('zip').value;
    contacts[index].phone = document.getElementById('phone').value;
    console.log(contacts[index]);
}

showContacts();

addNewContactButton.addEventListener('click', displayForm);
cancelAddContactButton.addEventListener('click', cancelAddContact);
saveContactButton.addEventListener('click', saveContact);