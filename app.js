const express = require('express');
const fs  = require('fs');
var path = require('path');
const app = express();
const bodyparser = require('body-parser');
const port = 3000;

//data base ko seve kran our use kran yhi mathade h
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/traniosite', {useNewUrlParser: true, useUnifiedTopology: true});
const TranioSitesSchema = new mongoose.Schema({
  name: String,
  namee: String,
  lname: String,
  email: String,
  number: String,
});
const TranioSitesModel = mongoose.model('traniosites', TranioSitesSchema);
/////////////////////////////////////////////////////////////////////////////////////


app.use(express.urlencoded())

//jb hme user se data ko body se json formet me lete h to to use phle deliyar krt h to hm tata ko le sate h line 24
//is se h postmane tool me hm body ke row (json (application/json)) pe select krte h to kam krta h agr yh nme krte h to body me data kuchh nhi jata h 
app.use(bodyparser.json())


//express specific stuff
app.use('/static', express.static('public'))

//pug specific stuff
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//endpoints
app.get('/', function (req, res) {
  const params = {}
  res.status(200).render('temp.pug',params)
})
//data ko kese sennd krte h is post me h jo ke sbse phle hm post mathad de H OUT US E HM SEND KRTE H 

app.post('/', function (req, res) {

//traniositesmodel ke mtlb h ke body se data ko nikal kr bongod be data ko seve krna our 
  TranioSitesModel.create(req.body)
//ye mathed h data ko user ko data save hone ke bad mesage dete n ke ap ka data save ho gya h age is nhe va lkhate h to v mongod me data krta he ya keval user ko krta h k data save ho gya he
  .then(function()
 //   ye date eval user ke console pr dikhane ke liye hota h 
 {

  //yha se data ko lete h our data ko output.txt file me save kr data h 
    console.log(req.body); 
    namee = req.body.name
    lname = req.body.lname
    email = req.body.email
    number = req.body.number
  //yha pe file ko bnaya jata h our usme data ko save kiya jata h file ka name h output.txt h jsme outputtowring  ke farmet me data ko save kiya jata h 
    let outputToWring =
  `this name = ${namee}_${lname}
email valid = ${email}
number valid = ${number}`
    fs.writeFileSync('output.txt',outputToWring)
    const params = {"massage":"complite in forme"}
    res.render('temp', params)

  })
  })
app.put('/:id', function (req, res) {
   // 71 line me hm data ko jo hm /ke bad likhate h use console log pr dikhhata h 
  console.log(req.params.id);
//yha pr hm vo data likhhte h jse hm updata krna mota h mongo db ke id ko kapi kr our kata ko /ke bad lgate h jis se data ja kr mongod me data ko id ke  mach krta h our use update krta h  postmand me hm body me ja kr row me json(application/json)me mb {	"name":"hhhh"} likhhate h our name me chang mo jata h mtlb up data ho jata h 
  TranioSitesModel.findByIdAndUpdate({_id:req.params.id},req.body).then(function(){
    TranioSitesModel.findOne({_id:req.params.id},req.body).then(function(data){
      res.send(data)
    })
  })
  // res.send({type:'put'});
  // const params = {}
  // res.status(200).render('temp.pug',params)
})
app.delete('/:id', function (req, res) {
  // 76 line me hm data ko jo hm /ke bad likhate h use console log pr dikhhata h 
  console.log(req.params.id);

  //line 78 pe jo methad likhha h v keval mongod me ja kr data ko delet kr data h eske lia mthade h ke mongo db ke id ko kapi kr our kata ko /ke bad lgate h jis se data ja kr mongod me data ko id ke mam se mach krta h our use delet kr data h our use   then ki mdt se use apne brouger pr so kra lete h jsse pta chlta h ki vhi data delet ho gya h
  TranioSitesModel.findByIdAndDelete({_id:req.params.id},req.body).then(function(data){
    res.send(data)
  })
  
  // const params = {}
  // res.status(200).render('temp.pug',params)
})

app.post('/contact',(req, res)=> {
 var myData = new contact(req.body);
 myData.save().then(()=>{
   res.send('this item has been save to the database')
 }).catch(()=>{
   res.send('item was not save ')
 })
})

//start this server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})