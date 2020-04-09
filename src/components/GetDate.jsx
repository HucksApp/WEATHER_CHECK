import React from 'react'



import { monthsArray, dayArray } from '../shared/constants'
import Time from './Time'


//DATE CALCULATOR AND UI
export default function GetDate() {


  const dateObj = new Date();
  const year = dateObj.getFullYear();
  const monthNUm = dateObj.getMonth();
  const monthAlph = monthsArray[monthNUm]
  const dayNum = dateObj.getDay();
  const dayAlph = dayArray[dayNum]
  console.log(dateObj)




  return (
    <div className="get_date">
      <div><Time /></div>
      <div>{dayAlph}</div>
      <div>{monthAlph}</div>
      <div>{year}</div>


    </div>
  )
}
