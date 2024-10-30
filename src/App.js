import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');

  // Fetch all users on component mount
  useEffect(() => {
    axios.get('http://localhost:5000/api/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the users!', error);
      });
  }, []);

  // Add a new user
  const addUser = () => {
    if (name.trim() === '') {
      alert('Name cannot be empty');
      return;
    }
    axios.post('http://localhost:5000/api/users', { name })
      .then(response => {
        setUsers([...users, response.data]);  // Update the users list with the new user
        setName('');  // Clear the input field after adding
      })
      .catch(error => {
        console.error('There was an error adding the user!', error);
      });
  };

  return (
    <div className="App">
      <h1>Users List</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Enter user name"
      />
      <button onClick={addUser}>Add User</button>
    </div>
  );
}

export default App;
