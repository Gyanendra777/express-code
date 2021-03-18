const express = require('express');
const fs  = require('fs');
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
 
  name = req.body.name
  lname = req.body.lname
  email = req.body.email
  number = req.body.number

  let outputToWring = `this name==${name}${lname},////email valid==${email},///number valid==${number}`
  fs.writeFileSync('output.txt',outputToWring)
  const params = {"massage":"complite in forme"}
  res.render('temp', params)
})



//start this server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})