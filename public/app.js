const API_URL = 'http://localhost:3000/users';
const userForm = document.getElementById('userForm');
const nameInput = document.getElementById('name');
const phoneInput = document.getElementById('phone');
const ageInput = document.getElementById('age');
const userList = document.getElementById('userList');
let editingUserId = null;

// Load User List
async function fetchUsers() {
    const response = await fetch(API_URL);
    const users = await response.json();
    displayUsers(users);
  }

  // Display User List
  function displayUsers(users) {
    userList.innerHTML = '';
    for (const user of users) {
      const userCard = document.createElement('div');
      userCard.className = 'user-card';

      const userDetails = document.createElement('div');
      userDetails.className = 'user-details';
      userDetails.innerHTML = `<strong>${user.name}</strong><br>${user.phone} / ${user.age}`;

      const userActions = document.createElement('div');
      userActions.className = 'user-actions';

      const editButton = document.createElement('button');
      editButton.className = 'edit';
      editButton.textContent = 'Edit';
      editButton.onclick = () => editUser(user);

      const deleteButton = document.createElement('button');
      deleteButton.className = 'delete';
      deleteButton.textContent = 'Delete';
      deleteButton.onclick = async () => {
          await deleteUser(user._id);
          await fetchUsers();  // Refresh the user list after deleting.
      };


      userActions.appendChild(editButton);
      userActions.appendChild(deleteButton);

      userCard.appendChild(userDetails);
      userCard.appendChild(userActions);
      userList.appendChild(userCard);
    }
  }

  // Add or Update User
userForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const user = {
        name: nameInput.value,
        phone: phoneInput.value,
        age: parseInt(ageInput.value) // Parse the age to an integer
    };

    if (editingUserId) {
      await fetch(`${API_URL}/${editingUserId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });
      editingUserId = null;
      userForm.querySelector('button').textContent = 'Add User';
    } else {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });
    }

  // reset input values
    nameInput.value = '';
    phoneInput.value = '';
    ageInput.value = '';
    fetchUsers();
  });


  // User Edit Mode
  function editUser(user) {
    nameInput.value = user.name;
    phoneInput.value = user.phone;
    ageInput.value = user.age;
    editingUserId = user._id;
    userForm.querySelector('button').textContent = 'Edit User';
  }

  // Delete User
  async function deleteUser(userId) {
      await fetch(`${API_URL}/${userId}`, {
          method: 'DELETE',
      });

  }


  // Initial load
  fetchUsers();