import React from "react";

import "./styles.css";
import { useState } from "react";
import api from "./services/api"
import { useEffect } from "react";

function App() {
  const [repositories,setRepositories] = useState([]);

  useEffect(() =>{
    api.get('repositories').then(response =>{
      setRepositories(response.data)
    })
  },[])


  async function handleAddRepository() {
    const response = await api.post('repositories',{
      id: "123",
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    });
    
    const repo = response.data;
    setRepositories([...repositories,repo]);
  }

  async function handleRemoveRepository(id) {

    await api.delete(`repositories/${id}`);

    const newRepo = repositories.filter(
      repo => repo.id !== id
    )
    setRepositories(newRepo)
    
  }

  return (
    <div>
      <ul data-testid="repository-list">
          {repositories.map(repo => (
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>))
          }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
