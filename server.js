if(process.env.NODE_ENV !== "production"){
  require('dotenv').config()
}

const express = require('express')
const axios = require('axios')
const cors = require('cors')

const appKey = process.env.APP_KEY

const app = express()

const corsOptions = {
  origin: ['https://schedule-ku.vercel.app/', 'http://localhost'],
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use(express.json())

app.post('/login', async (req, res) => {
  try {
    const response = await axios.post('https://myapi.ku.th/auth/login', req.body, {
      headers: {
        'app-key': appKey
      }
    })
    res.json(response.data)
  } catch (e) {
    res.json(e)
  }
})

app.get('/getSchedule', async (req, res) => {
  const accessToken = req.headers['accesstoken']
  const { stdId } = req.query
  try {
    const response = await axios.get('https://myapi.ku.th/std-profile/getGroupCourse', {
      params: {
        academicYear: 2564,
        semester: 1,
        stdId
      },
      headers: {
        "x-access-token": accessToken,
        'app-key': appKey
      }
    })
    res.json(response.data.results[0].course)
  } catch (e) {
    res.json(e)
  }
})

app.listen(process.env.PORT, () => console.log('Connected'))