import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import { Spinner } from '@chakra-ui/react'
import './App.css'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Portal,
  Box
} from '@chakra-ui/react'

function App() {

  const [loadCalender,setCalender]=useState([])
  let day=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
  var months111 = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const[mymonths,setMymonths]=React.useState([])
  const initRef = React.useRef()
  const[today,setToday]=React.useState(0)
  const[extra,setExtra]=React.useState([])
  const[extraN,setExtraN]=React.useState([])
  const[navi,setNavi]=React.useState(0)
  const[year,setYear]=React.useState(0)
  const[modfi,setmodfi]=React.useState("")
  const[eventDeatils,seteventDeatils]=React.useState({})
  const[Loading,setloading]=React.useState(false)

  const[loadEvents,setLoadEvents]=React.useState([])

  const[hideModel,setHidemodel]=React.useState(false)
  
  React.useEffect(()=>{

    Loaddata(0)
  },[])

  const Loaddata=(count,yea)=>
  {
    let sendbody={}
    if(yea!=undefined)
    {
      sendbody={count:count,yea:yea}
    }
    else
    {
       sendbody={count:count}
    }
    setloading(true)
    fetch("http://localhost:8080/today",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(sendbody)
    })
    .then((res)=>res.json())
    .then((data)=>{setCalender(data)
    console.log(data)
     let currdate=data[0].day
     let prevArray=[]
     let nextArray=[]
     let value=day.indexOf(currdate)
     let prevdays=0

     data.map((ele)=>{
      if(ele.prevdays)
      {
        prevdays=ele.prevdays
      }
     })

     let Monarr=[]
     let today=0;
     let todayin=0;
     let year=0;
     data.map((ele)=>{

      if(ele.todayin)
      {
        todayin=ele.todayin
      }
      if(ele.today)
      {
        today=ele.today
      }
      if(ele.month)
      {
        Monarr.push([ele.month[1],ele.month[0]])
      }
      if(ele.prevMonth)
      {
        Monarr.push(ele.prevMonth)
      }
      if(ele.nextMonth)
      {
        Monarr.push(ele.nextMonth)
      }
      if(ele.year)
      {
        year=ele.year
      }
     })

     console.log(Monarr,"ssssswasdadwa")
     setToday(today)
     setmodfi(todayin)
     setMymonths(Monarr)
     setYear(year)
     let nextday="";
     let nextdate=0
     for(let i=0;i<data.length;i++)
     {
      if(data[i].day)
      {
        nextday=data[i].day
        nextdate=data[i].date
      }
     }
     console.log(nextday,nextdate,"gooo")
     let nextvalue=day.indexOf(nextday)

     let godate=1;
     for(let i=nextvalue;i<day.length-1;i++)
     {
      nextArray.push(godate)
      godate++
     }
     console.log(nextArray)
     setExtraN(nextArray)


    //  console.log(prevdays)
    //  console.log(value)
     for(let i=value;i>0;i--)
     {
      prevArray.push(prevdays-i)
     }
    //  console.log(prevArray,"hh")
     setExtra(prevArray)

     fetch("http://localhost:8080/message",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(eventDeatils)
    })
    .then((res)=>res.json())
    .then((data)=>{console.log(data.events)
      setloading(false)
     setLoadEvents(data.events)
   })
    })
    .catch((e)=>console.log(e))
  }
  if(Loading)
  {
    return <Spinner
    thickness='4px'
    speed='0.65s'
    emptyColor='gray.200'
    color='blue.500'
    size='xl'
  />
  }
  return (
    <>
    <div className='Top1'>
      <div><h1>{modfi},{today} {months111[new Date().getMonth()]}</h1></div>
      <div className='Top-buttons1'>
      <select onChange={(e)=>{
      console.log(e.target.value)
      let obj1={val:e.target.value}
      fetch("http://localhost:8080/modifi",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(obj1)
      })
      .then((res)=>res.json())
      .then((data)=>Loaddata(0))
      .catch((e)=>console.log(e))
  
    }}>
      <option value={2022}>select year</option>
      <option value={2030}>2030</option>
      <option value={2029}>2029</option>
      <option value={2028}>2028</option>
      <option value={2027}>2027</option>
      <option value={2026}>2026</option>
      <option value={2025}>2025</option>
      <option value={2024}>2024</option>
      <option value={2023}>2023</option>
      <option value={2022}>2022</option>
      <option value={2021}>2021</option>
      <option value={2020}>2020</option>
      <option value={2019}>2019</option>
      <option value={2018}>2018</option>
      <option value={2020}>2017</option>
      <option value={2016}>2016</option>
      <option value={2015}>2015</option>
      <option value={2014}>2014</option>
      <option value={2013}>2013</option>
      <option value={2012}>2012</option>
      <option value={2011}>2011</option>
      <option value={2010}>2010</option>
     </select>
      </div>

    </div>
    
    <div className='Top'>
      <div><h2>{mymonths.length>0?mymonths[0][0]:""},  {year}</h2></div>
      <div className='Top-buttons'>
      <button onClick={()=>{
        Loaddata(-1)
    setNavi(navi-1)
    }}>prev</button>
    <button onClick={()=>{
        Loaddata(1)
      setNavi(navi+1)}}>Next</button>
      </div>
    </div>
    


    <div className='Header'>
      {
        day.map((ele)=>{
          return(
            <div>{ele}</div>
          )
        })
      }
      
    </div>
    <div className="App">
    {
          extra.map((el)=>{
            return(
              <div className='Extra-one'>{el}
              <p>{mymonths[1]}</p>
              </div>
            )
          })
        }

     {
     loadCalender.map((ele,ind)=>{

      if(ele.date==today && (new Date().getMonth()==mymonths[0][1]) && (year==new Date().getFullYear()))
      {
        return(
          <div key={ind} className="today">{ele.date}
          <p>{mymonths[0][0]}</p>
          <p>today</p>
          </div>
        )
      }
      if(ele.date)
      return(
<Popover>
  <PopoverTrigger >
  <div className='wrap-it' key={ind}>{ele.date}
        <p onClick={()=>setHidemodel(true)}>{mymonths[0][0]}</p>
        {
          (loadEvents.length>0)?
          loadEvents.map((el)=>{
            if(ele.date==el.date && mymonths[0][0]==el.mymonths && el.year==year)
            return(
              // <>
              //  <p>*exist</p>
              // </>
              <Popover closeOnBlur={false} placement='left' initialFocusRef={initRef}>
              {({ isOpen, onClose }) => (
                <>
                  <PopoverTrigger>
                    <button onClick={()=>setHidemodel(false)}>*Task {isOpen ? 'close' : 'open'}</button>
                  </PopoverTrigger>
                  <Portal>
                    <PopoverContent>
                      <PopoverHeader>Your Task!</PopoverHeader>
                      <PopoverCloseButton />
                      <PopoverBody>
                        <Box>
                          <p>{el.message}</p>
                          <p>event date: {el.time}</p>
                        </Box>
                        <button
                          mt={4}
                          colorScheme='blue'
                          onClick={onClose}
                          ref={initRef}
                        >
                          Close
                        </button>
                      </PopoverBody>
                      <PopoverFooter>added event to: {el.email}</PopoverFooter>
                    </PopoverContent>
                  </Portal>
                </>
              )}
            </Popover>
            )
          }):<></>
        }
        </div>
  </PopoverTrigger>
  {
    (hideModel)?
     <Portal>
     <PopoverContent>
       <PopoverArrow />
       <PopoverHeader>Event</PopoverHeader>
       <PopoverCloseButton />
       <PopoverBody>
         <input placeholder='enter your mail' name="email" onChange={(e)=>seteventDeatils({...eventDeatils,[e.target.name]:e.target.value})}/>
         <textarea placeholder='enter details' name="message" rows="4" cols="35" onChange={(e)=>seteventDeatils({...eventDeatils,[e.target.name]:e.target.value})}/>
       </PopoverBody>
       <PopoverFooter>
         <button onClick={()=>{
           console.log(eventDeatils)
           ///{ele.date}{mymonths[0][0]}{year}
           eventDeatils.date=ele.date
           eventDeatils.mymonths=mymonths[0][0]
           eventDeatils.year=year
           console.log(eventDeatils)
           setHidemodel(false)
           alert("event added successfully!")

           setloading(true)
           fetch("http://localhost:8080/message",{
             method:"POST",
             headers:{
               "Content-Type":"application/json"
             },
             body:JSON.stringify(eventDeatils)
           })
           .then((res)=>res.json())
           .then((data)=>{console.log(data.events)
            setLoadEvents(data.events)
            setloading(false)
          })
           .catch((e)=>console.log(e))
         }}>Add</button>
       </PopoverFooter>
     </PopoverContent>
   </Portal>:<></>
  }
 
</Popover>
      )
     })
    }

    {
      extraN.map((el)=>{
        return(
          <div className='Extra-one'>{el}
          <p>{mymonths[2]}</p>
          </div>
        )
      })
    }


  </div>
</>

  )
}

export default App
