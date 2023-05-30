import React from "react";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form.js";
import Status from "components/Appointment/Status.js";
import Confirm from "components/Appointment/Confirm.js";
import {useVisualMode} from "../../hooks/useVisualMode";

import "components/Appointment/styles.scss";

//Render appointment element
export default function Appointment(props) {

  //These are the different modes, depending on what value "mode" contains a different component will be rendered
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";

  //The function below is a custom hook with 3 functionalities; 1) keeps track of the previous state, so that you can go back one step if needed(triggered by the cancel button). 2) checks the current mode(a single string). 3) transitions/changes the value of "mode"(check variables above for more info on modes)
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  )

  //Save a new interview to the server 
  function save(name, interviewer) {
    //The object sets values to be passed into bookInterview function. "name" and "interviewer" are arguments passed in through the Forms.js file
    const interview = {
      student: name,
      interviewer  
    };

    transition(SAVING)

    props.bookInterview(props.id, interview)
    .then(() => {
      transition(SHOW)
    })
  }

  //Delete an interview. Takes in a confirmation argument. The 1st time the delete button is clicked the user is prompt with a cancel or confirm warning, the received argument lets this function know if the user clicked the confirm button or if the user is clicking on the delete button for the 1st time
  const deleteInterview = (confirmation) => {
    
    if(confirmation){
      transition(CONFIRM)
    } else {
      transition(DELETING)

      props.cancelInterview(props.id)
        .then((res)=>{
          console.log(res)
          transition(EMPTY)
        })
    }
  }
  
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
        onDelete={deleteInterview}
        />
      )}

      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}//{props.interviewers}
          onSave={save}
          onCancel={back}
        />
      )}

      {mode === SAVING && (
        <Status
          message="Saving"
        />
      )}

      {mode === DELETING && (
        <Status
          message="Deleting"
        />
      )}

      {mode === CONFIRM && (
        <Confirm
          message="Delete the appointment?"
          onCancel={back}
          onConfirm={deleteInterview}
        />
      )}

    </article>
  );
}