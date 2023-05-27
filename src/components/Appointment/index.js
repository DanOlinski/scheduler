import React from "react";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form.js";
import {useVisualMode} from "../../hooks/useVisualMode";

import "components/Appointment/styles.scss";

//Render appointment element
export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  )

    //console.log(props.interview.student)

  return (
    <article className="appointment">
      <Header
        time={props.time}
      />
      {mode === EMPTY && 
        <Empty onAdd={() => transition(CREATE)} />}
      
      {mode === SHOW && (
        <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer.name}
        />
      )}

      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}//{props.interviewers}
          //onSave={}
          onCancel={back}
        />
      )}

    </article>
  );
}