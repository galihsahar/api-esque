const Pool = require('pg').Pool
const pool = new Pool({
    host: "ep-crimson-voice-979661-pooler.ap-southeast-1.postgres.vercel-storage.com",
    user: "default",
    port: 5432,
    password: "bM8OZAW2kwSh",
    database: "verceldb",
    ssl: { 
        rejectUnauthorized: false,
        sslmode: 'require'
    }
})

const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY user_id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getUserById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM users WHERE user_id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createUser = (request, response) => {
    const { username, password } = request.body

    pool.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *', [username, password], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`User added with ID: ${results.rows[0].user_id}`)
    })
}

const updateUser = (request, response) => {
    const user_id = parseInt(request.params.id)
    const { username, password } = request.body

    pool.query(
        'UPDATE users SET username = $1, password = $2 WHERE user_id = $3',
        [username, password, user_id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`User modified with ID: ${user_id}`)
        }
    )
}

const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM users WHERE user_id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`User deleted with ID: ${id}`)
    })
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
}