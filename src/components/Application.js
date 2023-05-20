import React, {useState} from 'react';

import "components/Application.scss";
import DayList from "components/DayList";

const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];

export default function Application(props) {
  //setting the default state to Monday so that Monday is selected when the page is loaded
  const [dayState, setDayState] = useState("Monday");

  //inside nav element add DayList(this element renders one button per each object in an array, this array is defined as "days" declared as an attribute witch is a prop that is the accessed by the elements created within the DayList element)
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
            day={dayState}
            setDay={setDayState}
          />
        </nav>
        
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>

      <section className="schedule"> 
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
      </section>

    </main>
  );
}
