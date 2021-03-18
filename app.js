const express = require('express')
var path = require('path');
const app = express()
const port = 3000

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.get('/pugw', function (req, res) {
  res.render('temp', { title: 'express', message: 'fist file creat in express pug' })
})

app.use('/static', express.static('public'))

app.get('/s', (req, res) => {
  var a = req.query.name;
  res.send('Hello World!'+"___"+ a)
})

app.post('/postt',(req,res)=>{
  res.status(200).send("hello post request methade")
})
app.get('/postt',(req,res)=>{
  res.send("hello get  request methade")
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})