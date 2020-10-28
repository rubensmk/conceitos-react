import React, { useState, useEffect } from 'react';
import api from './services/api';
import './App.css';
import Header from './components/Header';
import backgroundImage from './assets/backgroundimage.jpg';


function App(){

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        api.get('projects').then(response => {
            setProjects(response.data);
        })
    }, [] 
    );

    async function handleAddProject() {
        // setProjects([...projects, `Novo Projeto ${Date.now()}`]);
    
        const response = await api.post('projects', {
          title: `Novo Projeto ${Date.now()}`,
          owner: 'Rubens Mititaka Kishimoto'
        });

        const project = response.data;
    
        setProjects([...projects, project]);

        console.log(response.body);
      }    

      

    return (
        <>
            <Header title="Projects" />

            <img width={200} src={backgroundImage}/>

            <ul>
    {projects.map(project => (<li key={project.id}> {project.title}</li>))}
            </ul>

            <button type="button" onClick={handleAddProject}>Adicionar Projeto</button>
        </>
       
       
    ); 
}

export default App;