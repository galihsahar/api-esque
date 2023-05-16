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

//user

const getUserByUsername = (request, response) => {
    const username = request.query.username

    pool.query('SELECT * FROM users WHERE username = $1', [username], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json({
            success: true,
            message: 'Berhasil ambil data!',
            data: results.rows
        })
    })
}

//achievement

const getDataAchievement = (request, response) => {
    pool.query('SELECT * FROM achievement ORDER BY achievement_id DESC', (error, results) => {
        if (error) {
            throw error
        }
        const mappedResults = results.rows.map(result => {
            return {
                achievementId: result.achievement_id,
                url: result.url,
                title: result.title,
                textAchievement: result.text_achievement
            }
        })
        response.status(200).json({
            success: true,
            message: 'Berhasil ambil data!',
            data: mappedResults
        })
    })
}

const addDataAchievement = (request, response) => {
    const { url, title, textAchievement } = request.body

    pool.query('INSERT INTO Achievement (url, title, text_achievement) VALUES ($1, $2, $3) RETURNING *', [url, title, textAchievement], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`User added with ID: ${results.rows[0].achievement_id}`)
    })
}

const editDataAchievement = (request, response) => {
    const achievementId = parseInt(request.body.achievementId)
    const { url, title, textAchievement } = request.body

    pool.query(
        'UPDATE Achievement SET url = $1, title = $2, text_achievement = $3  WHERE achievement_id = $4',
        [url, title, textAchievement, achievementId],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`User modified with ID: ${achievementId}`)
        }
    )
}

const deleteDataAchievement = (request, response) => {
    const id = parseInt(request.query.id)

    pool.query('DELETE FROM achievement WHERE achievement_id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`User deleted with ID: ${id}`)
    })
}

//actvity

const getDataActivity = (request, response) => {
    pool.query('SELECT * FROM activitys ORDER BY activity_id DESC', (error, results) => {
        if (error) {
            throw error
        }
        const mappedResults = results.rows.map(result => {
            return {
                activityId: result.activity_id,
                url: result.url,
                title: result.title,
                textActivity: result.text_activity
            }
        })
        response.status(200).json({
            success: true,
            message: 'Berhasil ambil data!',
            data: mappedResults
        })
    })
}

const addDataActivity = (request, response) => {
    const { url, title, textActivity } = request.body

    pool.query('INSERT INTO Activitys (url, title, text_activity) VALUES ($1, $2, $3) RETURNING *', [url, title, textActivity], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Activitys added with ID: ${results.rows[0].activity_id}`)
    })
}

const editDataActivity = (request, response) => {
    const activityId = parseInt(request.body.activityId)
    const { url, title, textActivity } = request.body

    pool.query(
        'UPDATE Activitys SET url = $1, title = $2, text_activity = $3  WHERE activity_id = $4',
        [url, title, textActivity, activityId],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Activitys modified with ID: ${activityId}`)
        }
    )
}

const deleteDataActivity = (request, response) => {
    const id = parseInt(request.query.id)

    pool.query('DELETE FROM Activitys WHERE activity_id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Activitys deleted with ID: ${id}`)
    })
}

//blog

const getDataBlog = (request, response) => {
    pool.query('SELECT * FROM Blogs ORDER BY blog_id DESC', (error, results) => {
        if (error) {
            throw error
        }
        const mappedResults = results.rows.map(result => {
            return {
                blogId: result.blog_id,
                url: result.url,
                title: result.title,
                textBlog: result.text_blog
            }
        })
        response.status(200).json({
            success: true,
            message: 'Berhasil ambil data!',
            data: mappedResults
        })
    })
}

const addDataBlog = (request, response) => {
    const { url, title, textBlog } = request.body

    pool.query('INSERT INTO Blogs (url, title, text_blog) VALUES ($1, $2, $3) RETURNING *', [url, title, textBlog], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Blogs added with ID: ${results.rows[0].blog_id}`)
    })
}

const editDataBlog = (request, response) => {
    const blogId = parseInt(request.body.blogId)
    const { url, title, textBlog } = request.body

    pool.query(
        'UPDATE Blogs SET url = $1, title = $2, text_blog = $3  WHERE blog_id = $4',
        [url, title, textBlog, blogId],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Blogs modified with ID: ${blogId}`)
        }
    )
}

const deleteDataBlog = (request, response) => {
    const id = parseInt(request.query.id)

    pool.query('DELETE FROM Blogs WHERE blog_id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Blogs deleted with ID: ${id}`)
    })
}

//team

const getDataTeam = (request, response) => {
    pool.query('SELECT * FROM Teams ORDER BY Team_id DESC', (error, results) => {
        if (error) {
            throw error
        }
        const mappedResults = results.rows.map(result => {
            return {
                teamId: result.team_id,
                url: result.url,
                title: result.title,
                textTeam: result.text_team
            }
        })
        response.status(200).json({
            success: true,
            message: 'Berhasil ambil data!',
            data: mappedResults
        })
    })
}

const addDataTeam = (request, response) => {
    const { url, title, textTeam, positions } = request.body

    pool.query('INSERT INTO Teams (url, title, text_team, positions) VALUES ($1, $2, $3, $4) RETURNING *', [url, title, textTeam, positions], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Teams added with ID: ${results.rows[0].team_id}`)
    })
}

const editDataTeam = (request, response) => {
    const teamId = parseInt(request.body.teamId)
    const { url, title, textTeam, positions } = request.body

    pool.query(
        'UPDATE Teams SET url = $1, title = $2, text_team = $3, positions = $4  WHERE team_id = $5',
        [url, title, textTeam, positions, teamId],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Teams modified with ID: ${teamId}`)
        }
    )
}

const deleteDataTeam = (request, response) => {
    const id = parseInt(request.query.id)

    pool.query('DELETE FROM Teams WHERE team_id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Teams deleted with ID: ${id}`)
    })
}

module.exports = {
    getUserByUsername,
    getDataAchievement,
    addDataAchievement,
    editDataAchievement,
    deleteDataAchievement,
    getDataActivity,
    addDataActivity,
    editDataActivity,
    deleteDataActivity,
    getDataBlog,
    addDataBlog,
    editDataBlog,
    deleteDataBlog,
    getDataTeam,
    addDataTeam,
    editDataTeam,
    deleteDataTeam
}