const express=require("express")
const dayjs = require('dayjs')
var calendar = require('dayjs/plugin/calendar')
dayjs.extend(calendar)

const cal=require("./Routes/Calender")

const app=express()


app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use("/",cal)

app.get("/",(req,res)=>{
    res.status(200).send("welcome to App's calender")
})


console.log(dayjs().add(3, 'month').daysInMonth())
app.listen(8080,()=>{
    console.log("Server started!!")
})