import TimeInput from "./src/lib/index"
import React,{useState} from "react";

function App() {
  const [date,setDate]=useState("12:00")
  return (
    <TimeInput hour12Format value={date} onChange={(dateString)=>{
       console.log(dateString)
       setDate(date)
     }}/>
  );
}

export default App;
