const express = require('express')
const app = express()

const cors = require('cors')
const morgan = require('morgan')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(morgan('dev'))

app.listen(5000, () => {
  console.log("Listening on Port 5000")
})


app.get('/', (req, res) => {
  try {
    res.send({
      status: 200,
      message: 'API is Connected'
    })
  }
  catch(err) {
    res.status(500).send(err)
  }
})

