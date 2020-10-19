const express = require("express");
const cors = require("cors");

 const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs} = request.body;

  repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };

  repositories.push(repository);
  return response.json(repository);

});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const {title, url, techs} = request.body

  const findRepository = repositories.findIndex(repository => repository.id === id)

  if(findRepository < 0){
    return response.status(400).send({error: "Repository does not exists"})
  }

  repository = {
    id,
    title,
    url,
    techs,
    likes: repositories[findRepository].likes
  }

  repositories[findRepository] = repository
  return response.json(repository)

});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const findRepositoryIndex = repositories.findIndex(repository => repository.id === id);

  if(findRepositoryIndex >= 0 ){
    repositories.splice(findRepositoryIndex, 1);
  }else{
    return response.status(400).send({error: "Repository does not exists"});
  }

  return response.status(204).send();

});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const findRepositoryIndex = repositories.findIndex(repository => repository.id === id);

  if( findRepositoryIndex < 0){
    return response.status(400).json({ error: "Repository does not exists!!!"});
  }

  repositories[findRepositoryIndex].likes++;

  return response.json(repositories[findRepositoryIndex]);



});

module.exports = app;
