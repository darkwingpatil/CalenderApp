const{Router}=require("express")
const dayjs = require('dayjs')
var calendar = require('dayjs/plugin/calendar')

const {setDate,putAll}=require('../Functions/Logic')
dayjs.extend(calendar)
const cal=Router()


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


module.exports=cal