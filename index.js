const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const db = require('./queries') 
const cors = require('cors')

app.use(cors());

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({ 
    extended: true,
  })
)

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/user/findByUserName', db.getUserByUsername)

//achievement
app.get('/achievement/findAllOrderBy', db.getDataAchievement)
app.post('/achievement/post', db.addDataAchievement);
app.put('/achievement/update', db.editDataAchievement);
app.delete('/achievement/delete', db.deleteDataAchievement);

//activitys
app.get('/activity/findAllOrderBy', db.getDataActivity);
app.post('/activity/post', db.addDataActivity);
app.put('/activity/update', db.editDataActivity);
app.delete('/activity/delete', db.deleteDataActivity);

//blog
app.get('/blog/findAllOrderBy', db.getDataBlog);
app.post('/blog/post', db.addDataBlog);
app.put('/blog/update', db.editDataBlog);
app.delete('/blog/delete', db.deleteDataBlog);

//team
app.get('/team/findAllOrderBy', db.getDataTeam);
app.post('/team/post', db.addDataTeam);
app.put('/team/update', db.editDataTeam);
app.delete('/team/delete', db.deleteDataTeam);

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})