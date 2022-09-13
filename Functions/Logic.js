const dayjs = require('dayjs')
var calendar = require('dayjs/plugin/calendar')
dayjs.extend(calendar)

let day={0:"Sunday",1:"Monday",2:"Tuesday",3:"Wednesday",4:"Thursday",5:"Friday",6:"Saturday"}
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function setDate(year,month)
{
    let arr=[]
   var currMonth=dayjs(`${year}-${month+1}-1`).daysInMonth()
for(let i=0;i<currMonth;i++)
 {
    let today=dayjs(`${year}-${month+1}-1`).add(i, 'day')
   arr.push({"date":today["$D"],"day":day[dayjs(`${year}-${month+1}-1`).add(i, 'day').get("day")]})
 }
 return arr
}

function putAll(year,month)
{
    let prevMonth=dayjs(`${year}-${month}-1`).daysInMonth()
    let nextMonth=dayjs(`${year}-${month+2}-1`).daysInMonth()
    let data=setDate(year,month)
    data.push({"today":dayjs().get("date")})
    data.push({"todayin":day[dayjs().get("day")]})
    data.push({"month":[month,months[month]]})
    data.push({"prevdays":prevMonth})
    data.push({"prevMonth":months[dayjs(`${year}-${month}-1`).get("month")]})
    data.push({"nextMonth":months[dayjs(`${year}-${month+2}-1`).get("month")]})
    data.push({"nextday":nextMonth})
    data.push({"year":year})
    return data
}



module.exports={setDate,putAll}