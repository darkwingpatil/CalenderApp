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
// console.log(dayjs())
// console.log(dayjs().daysInMonth())
// console.log(dayjs().get("day"))
// console.log(dayjs().get("month"))
// console.log(dayjs().get("year"))




// let day={0:"Sunday",1:"Monday",2:"Tuesday",3:"Wednesday",4:"Thursday",5:"Friday",6:"Saturday"}

// var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
// var year=dayjs().get("year")
// var month=dayjs().get("month")

// console.log(dayjs(`${year}-${month+1}-1`),"from 1-30")
// console.log(dayjs(`${year}-${month+1}-1`).daysInMonth(),"no of days")
// function setDate(year,month)
// {
//     let obj={}
//     let arr=[]
//    var currMonth=dayjs(`${year}-${month+1}-1`).daysInMonth()
//    var startDay=dayjs(`${year}-${month+1}-1`)
// for(let i=0;i<currMonth;i++)
//  {
//     let today=dayjs(`${year}-${month+1}-1`).add(i, 'day')
//     // console.log(dayjs(`${year}-${month+1}-1`).add(i, 'day').get("day"))
//     // console.log(today["$D"],day[dayjs(`${year}-${month+1}-1`).add(i, 'day').get("day")])
//    arr.push({"date":today["$D"],"day":day[dayjs(`${year}-${month+1}-1`).add(i, 'day').get("day")]})

   
//  }
//  return arr
// }



// console.log(dayjs().get("month").toString(),"aaaaaaaaaaaaaa")
// app.post("/today",(req,res)=>{
//     let {count,yea}=req.body
    
//     console.log(year,"before")
//     // console.log(month,"herecheck!!!!1")
//     // console.log(month,"before")
//     month=(month+count)
//     if(month==11)
//     {
//         console.log("commin")
//         month=0;
//         year=year+1
//     }
//     if(month==-1)
//     {
//         month=11
        
//         year=year-1
//     }
//     console.log(year,"after")

//     let prevMonth=dayjs(`${year}-${month}-1`).daysInMonth()
//     let nextMonth=dayjs(`${year}-${month+2}-1`).daysInMonth()
//     let data=setDate(year,month)
//     data.push({"today":dayjs().get("date")})
//     data.push({"todayin":day[dayjs().get("day")]})
//     data.push({"month":[month,months[month]]})
//     data.push({"prevdays":prevMonth})
//     data.push({"prevMonth":months[dayjs(`${year}-${month}-1`).get("month")]})
//     data.push({"nextMonth":months[dayjs(`${year}-${month+2}-1`).get("month")]})
//     data.push({"nextday":nextMonth})
//     data.push({"year":year})
//     res.send(data)
// })

// app.post("/modifi",(req,res)=>{
//     let{val}=req.body

//     year=dayjs(`${val}-${month+1}-1`).get("year")

//     res.send({message:"success!!"})
// })

console.log(dayjs().add(3, 'month').daysInMonth())
app.listen(8080,()=>{
    console.log("Server started!!")
})