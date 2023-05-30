import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";

import {getAppointmentsForDay} from '../helpers/selectors.js'
import {getInterviewersForDay} from '../helpers/selectors.js'
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

  //set an array with all interviewers for a selected day
  const dailyInterviewers = getInterviewersForDay(state, state.day)
  
  //The function is called in the components/Appointment/index.js file as a passed down prop. It creates an object using current state values then sends that info through an API request in order to save a new appointment in the database. After all that it updates the current state with the new data that wat typed in the form(this is triggered when the save button is clicked)
  function bookInterview(id, interview) {
    //console.log(id, interview);

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    return axios
      .put(`/api/appointments/${id}`, 
        appointment
      )
      .then(() => {
        setState({
          ...state,
          appointments
        })
      })
  }

  //Find the appointment by the passed in id and set it equal to null, then do an API request to delete the selected appointment and when the request is resolved update the state to also remove the appointment
  function cancelInterview(id){
    
    const interview = {
      ...state.appointments[id],
      interview: null
    }
    const appointments = {
      ...state.appointments,
      [id]: interview
    }

    console.log(state.appointments[id])
   

    return axios
      .delete(`/api/appointments/${id}` 
      )
      .then(() => {
        setState({
          ...state,
          appointments
        })
      })
  }

  //render loop through data and one appointment for each object in the array
  const renderAppointment = dailyAppointments.map((appointment) => {
    
    const interview = getInterview(state, appointment.interview)
    return (
    <Appointment
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={interview}
      interviewers={dailyInterviewers}
      bookInterview={bookInterview}
      cancelInterview={cancelInterview}
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
