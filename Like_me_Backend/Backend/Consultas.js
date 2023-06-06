const {Pool} = require('pg')

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'postgresql',
    database: 'likeme',
    allowExitOnIdle: true,
})

const getPosts = async() => {
    const {rows} = await pool.query('SELECT * FROM posts ORDER BY id')
    return(rows)
}

const addPost = async(titulo, img, descripcion, likes) => {
    const consulta = 'INSERT INTO posts VALUES (DEFAULT, $1, $2, $3, $4) returning id'
    const values = [titulo, img, descripcion, likes]
    return await pool.query(consulta, values)
}

const deletePost = async(id) => {
    const consulta = 'DELETE FROM posts WHERE id = $1'
    const values = [id]
    await pool.query(consulta, values)
}

const likePost = async(id) => {
    const updateLikes = 'UPDATE posts SET likes = likes + 1 WHERE id = $1'
    const updateValues = [id]
    await pool.query(updateLikes, updateValues)    
}

module.exports = {getPosts, addPost, deletePost, likePost}