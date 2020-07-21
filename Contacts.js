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
    const newContactElement = document.createElement('li');
    newContactElement.innerHTML = `
      <div>
        <b>${name}</b>
        <p>${address.street}</p>
        <p>${address.city}</p>
        <p>${address.state}</p>
        <p>${address.zip}</p>
        <p>${phone}</p>
      </div>
    `;
    const contactsList = document.getElementById('contacts');
    contactsList.append(newContactElement);
};

const showContacts = () => {
    for (i = 0; i < contacts.length; i++) {
        console.log(contacts[i]);
        renderContact(contacts[i].name, contacts[i].address, contacts[i].phone)
    }
}
showContacts();

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
    showContacts();
    const addForm = document.getElementById('addForm');
    addForm.style.display = 'none';
    const contactsList = document.getElementById('contacts');
    contactsList.style.display = 'block';
}

addNewContactButton.addEventListener('click', displayForm);
cancelAddContactButton.addEventListener('click', cancelAddContact);
saveContactButton.addEventListener('click', saveContact);
