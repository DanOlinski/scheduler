import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";

import {getAppointmentsForDay} from '../helpers/selectors.js'
import {getInterview} from '../helpers/selectors.js'

export default function Application(props) {
  //setting the default states
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  //set an array with all appointments for a selected day
  const dailyAppointments = getAppointmentsForDay(state, state.day)

  //render loop through data and one appointment for each object in the array
  const renderAppointment = dailyAppointments.map((appointment) => {
    
  const interview = getInterview(state, appointment.interview)
  return (
  <Appointment
    key={appointment.id}
    id={appointment.id}
    time={appointment.time}
    interview={interview}
  />
  )})

  //updates the day value inside state object
  const setDay = day => setState((prev) => ({ ...prev, day }));

  //API request to the database for days array
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ])
      .then((all) => {
        setState((prev) => {
          return({
            ...prev,
            days: all[0].data, 
            appointments: all[1].data, 
            interviewers: all[2].data 
          })
        })
      })

    
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
            days={state.days}
            value={state.day}
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
