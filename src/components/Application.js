import React, { useState, useEffect } from "react";
import axios from "axios"

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";

//Mock data
const appointments = {
  "1": {
    id: 1,
    time: "12pm",
  },
  "2": {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer:{
        id: 3,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  "3": {
    id: 3,
    time: "2pm",
  },
  "4": {
    id: 4,
    time: "3pm",
    interview: {
      student: "Archie Andrews",
      interviewer:{
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  },
  "5": {
    id: 5,
    time: "4pm",
  }
};

//render loop through data and one appointment for each object in the array
const renderAppointment = Object.values(appointments).map((appointment) => {
  return (
  <Appointment
    key={appointment.id}
    {...appointment}
  />
)})

export default function Application(props) {
  //setting the default states
  const [days, setDays] = useState([])
  const [day, setDay] = useState("Monday");

  //API request to the database for days array
  useEffect(() => {
    axios
      .get("/api/days")
      .catch((e)=>console.log(e))
      .then((res) => {
        console.log(res)
        setDays(res.data)
        });
    },[])

  //inside nav element add DayList(this element renders one button per each object in an array, this array is defined as "days" declared as an attribute witch is a prop that is then accessed by the elements created within the DayList element)
  return (
    <main className="layout">

      <section className="sidebar">
        <img
          className="sidebar--centered" 
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        
        <hr className="sidebar__separator sidebar--centered" />
        
        <nav className="sidebar__menu">
          <DayList
            days={days}
            value={day}
            onChange={setDay}
          />
        </nav>
        
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>

      <section className="schedule"> 
        {renderAppointment}
        <Appointment key="last" time="5pm/" />
      </section>

    </main>
  );
}
