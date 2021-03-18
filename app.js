const express = require('express')
var path = require('path');
const app = express()
const port = 3000

app.use(express.urlencoded())

//express specific stuff
app.use('/static', express.static('public'))

//pug specific stuff
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//endpoints
app.get('/', function (req, res) {
  const conttont = "helo and pug me hm html usg kr skte h ";
  const params = {"title":"pug html", "contant": conttont}
  res.render('temp', params)
})

app.post('/',  (req, res)=> {
  console.log(req.body)
  const params = {"massage":"complite in forme"}
  res.render('temp', params)
})



//start this server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})