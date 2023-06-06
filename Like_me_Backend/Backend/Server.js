const express = require('express')
const cors = require('cors')
const {getPosts, addPost, deletePost, likePost} = require('./Consultas')
const app = express()
const port = 3000

app.listen(port, console.log(`Servidor conectado en puerto ${port}`))
app.use(express.json())
app.use(cors())

app.get('/posts', async(req, res) => {
  try {
    const posts = await getPosts();
    res.json(posts)
  }
  catch (error){
    res.status(500).send(error)
    console.log(error.message)
  }
})

app.post('/posts', async(req, res) => {
  try{
    const {titulo, img, descripcion, likes = 0} = req.body
    const newPost = await addPost(titulo, img, descripcion, likes)
    const id = newPost.rows[0].id
    res.json({id, titulo, img, descripcion, likes})
    console.log("Post agregado")
  }
  catch (error){
    res.status(500).send(error)
    console.log(error.message)
  }
})

app.delete('/posts/:id', async(req, res) => {
  try{
    const {id} = req.params
    await deletePost(id)
    res.send("Post eliminado")
    console.log("Post eliminado")
  }
  catch (error){
    res.status(500).send(error)
    console.log(error.message)
  }
})

app.put('/posts/like/:id', async(req, res) => {
  try{
    const {id} = req.params
    const result = await likePost(id)
    res.json(result)
    console.log("Like!")
  }
  catch (error){
    res.status(500).send(error)
    console.log(error.message)
  }
})