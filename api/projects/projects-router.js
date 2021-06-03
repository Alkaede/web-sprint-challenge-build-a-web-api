// Write your "projects" router here!
const express = require('express');
const Projects = require('./projects-model');

const router = express.Router();

router.get('/', (req, res)=> {
  Projects.get()
    .then(project => {
      if(!project){
        res.status(404).json({message: []})
      }else{
        // console.log(res.json(project))
        res.status(200).json(project)
      }
    })
    .catch(err => {
      console.log('catch errors: ', err)
      res.status(500).json({message: 'Error retrieving projects'})
    })
})

router.get('/:id', (req, res) => {
  const {id} = req.params
  Projects.get(id)
    .then(projectid => {
      if(projectid) {
        res.status(200).json(projectid) 
      }else{
        res.status(401).json({message: `Project does not exist with id of ${projectid}`})
      }
    })
    .catch(() => {
      res.status(500).json({message: `Error retrieving project with id of ${id}`})
    })
    
})

router.post('/', (req, res) => {
  const body = req.body
  Projects.insert(body)
    .then(project => {
        console.log(req.body)
        res.status(201).json(project)
    })
    .catch(() => {
      res.status(500).json({message: 'Error creating new project'})
    })
})

router.put('/:id', (req, res) => {
  const {id} = req.params
  const changes = req.body
  Projects.update(id, changes)
    .then(project => {
      if(!project){
        res.status(404).json({message: 'Project does not exist'})
      }else{
        res.status(201).json(project)
      }
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({message: 'Error updating post'})
    })
})

router.delete('/:id', (req, res) => {
  const {id} = req.params
  Projects.remove(id)
    .then(project => {
      if(project > 0){
        res.status(200).json({message: 'Post deleted'})
      }else{
        res.status(404).json({message: 'Post does not exist'})
      }
    })
    .catch(err => {
      console.log('catch error delete: ', err)
      res.status(500).json({message: 'Error removing post'})
    })
})

router.get('/:id/actions', (req, res)=>{
  const {id} = req.params
  Projects.getProjectActions(id)
    .then(actions => {
      if(actions.length > 0){
        res.status(200).json(actions)
      }else{
        res.status(404).json({message: 'Actions not found'})
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({message: 'Error retrieving actions'})
    })
})


module.exports = router;