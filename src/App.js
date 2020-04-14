import React, { useState, useEffect } from "react";

import "./styles.css";

import api from "./services/api";

function App() {
  const [repositories,setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response =>{
      setRepositories(response.data)
    })
  },[repositories])

  async function handleAddRepository() {
    const response = await api.post('repositories',{
      title: `Título com Data ${ Date.now()}`,
      url: `Url com Data ${Date.now()}`,
      techs: `Techs com Data ${Date.now()}`,
    });

    const repositorie = response.data;

    setRepositories([...repositories,repositorie]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo =>
        <li key={repo.id}>
          {repo.title}
          <button onClick={() => handleRemoveRepository(repo.id)}>
            Remover
          </button>
        </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
