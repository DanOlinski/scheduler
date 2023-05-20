import React from "react";
import DayListItem from "components/DayListItem";

//Render a list of <DayListItem> components
export default function Button(props) {

   const days = props.days.map((day) => {
    return (
    <DayListItem
      key = {day.id}
      name = {day.name}
      spots = {day.spots}
      selected = {day.name === props.day}
      setDay = {props.setDay}
    />
   )})

   return (
      <ul>
        {days}
      </ul>
   );

 }