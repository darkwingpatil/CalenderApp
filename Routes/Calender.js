const{Router}=require("express")
const dayjs = require('dayjs')
var calendar = require('dayjs/plugin/calendar')
const nodemailer = require("nodemailer");
const hbs=require("handlebars")

let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "chaya.gorczany@ethereal.email", // generated ethereal user
      pass: "MTudwQB1gVyd32hZ4G", // generated ethereal password
    },
  });

const {setDate,putAll}=require('../Functions/Logic')
dayjs.extend(calendar)
const cal=Router()

let events=[]
var year=dayjs().get("year")
var month=dayjs().get("month")

cal.post("/today",(req,res)=>{
    let {count,yea}=req.body
    
    month=(month+count)
    if(month==11)
    {
        month=0;
        year=year+1
    }
    if(month==-1)
    {
        month=11        
        year=year-1
    }

    let data=putAll(year,month)
    res.send(data)
})

cal.post("/modifi",(req,res)=>{
    let{val}=req.body
    year=dayjs(`${val}-${month+1}-1`).get("year")
    res.send({message:"success!!"})
})

cal.post("/message",async(req,res)=>{
try{
    const body=req.body
    let date_ob = new Date();
let hours = date_ob.getHours();
let minutes = date_ob.getMinutes();
let seconds = date_ob.getSeconds();
let system=""
if(hours>=12)
{
    system="PM";
}
else
{
    system="AM"
}
let currtime=`${hours}-${minutes}-${seconds} ${system}`

body.time=currtime

events.push(body)

const content=`
<div>
<h1>heloo world</h1>
<p>thank for singing in {{email}}</p>
<p>your event has been successfully added.</p>
<p>Task: {{message}}</p>
</div>`

const template=hbs.compile(content)
    let info = await transporter.sendMail({
        from: ' <foo@example.com>', // sender address
        to: "akashpatil0820@gmail.com", // list of receivers
        subject: "Events reminder! ✔", // Subject line
        html: template({email:body.email,message:body.message}), // html body
      });

      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

      res.send({events:events})
}
catch(e)
{
    res.send({events:[]})
}


})


module.exports=cal