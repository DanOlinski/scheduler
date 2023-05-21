import React, {useState} from 'react';
import Button from "components/Button";
import InterviewerList from "components/InterviewerList.js";


//Render element to create edit or delete a new appointment
export default function Status(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const reset = () => {
    setStudent("")
    setInterviewer(null)
  }
  const cancel = () => {
    reset()
    props.onCancel()
  }

  return (

    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form onSubmit={event => event.preventDefault()} autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name={props.name}
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(event) => setStudent(event.target.value)}

          />
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange = {setInterviewer}
        />
      </section>
      
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={() => props.onCancel(cancel())} danger>Cancel</Button>
          <Button onClick={() => {props.onSave(student, interviewer)}} confirm>Save</Button>
        </section>
      </section>
    </main>

  );
}