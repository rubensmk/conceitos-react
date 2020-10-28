const express = require('express');
const {uuid, isUuid} = require('uuidv4');
const cors = require('cors');


const app = express();
app.use(express.json());

app.use(cors());



const projects = [];

//CRUD (Create, Read , Update e Delete)

// Middleware request logs
function logRequests(request, response, next){
    const {method, url} =  request;

    const logLabel = `[${method.toUpperCase()}] ${url}`;

    //console.log(logLabel);
    console.time(logLabel);

    //return next();
    next();

    console.timeEnd(logLabel);
}

//Middleware validate id
function validateProjectID(request, response, next){
    const {id} = request.params;

    if(!isUuid(id)){
        return response.status(400).json({error:'Invalid project ID'});
    }
    return next();
}

app.use(logRequests);
app.use('/projects/:id', validateProjectID);
//GET
app.get('/projects', (request, response) => {
    const {title, owner} = request.query;

    const results = title
    ?projects.filter(project => project.title.includes(title))
    :projects;

    return response.json(results)
});

//POST
app.post('/projects', (request, response) => {
    const {title, owner} = request.body;

    //console.log(title, owner);

    const project = {id:uuid(), title, owner}
    projects.push(project);

    return response.json(projects)
});

//PUT-PATCH
app.put('/projects/:id', (request, response) => {
    const {id} = request.params;
    const {title,owner} = request.body;

    //console.log('id:', id);

    const projectIndex = projects.findIndex(project => project.id === id);

    //(projectIndex < 0)? response.status(400).json({error:'Project not found!'}):'error';
    console.log(projectIndex);

    if (projectIndex < 0){
        return response.status(400).json({error:'Project not found!'})
    }
    

    const project ={
        id,
        title,
        owner
    }

    projects[projectIndex] = project;


    return response.json(project)
});

//DELETE
app.delete('/projects/:id', (request, response) => {
    const {id} = request.params;

    const projectIndex = projects.findIndex(project => project.id === id);

    if (projectIndex < 0){
        return response.status(400).json({error:'Project not found!'})
    }

    projects.splice(projectIndex, 1);

    return response.status(204).send();
});





app.listen(3333, () =>{
    console.log('🚀 Backend started!')
} );
