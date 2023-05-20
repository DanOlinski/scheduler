import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem";

//Render a list of InterviewerListItem components passing in default props
//iterate through an array of objects and for each object render an HTML element
export default function DayListItem(props) {
  
  const interviewers = props.interviewers.map((interviewer) => {
    return (
      <InterviewerListItem 
        key = {interviewer.id}
        selected = {interviewer.id === props.interviewer}
        setInterviewer = {props.setInterviewer}
        name = {interviewer.name}
        avatar = {interviewer.avatar}
      />
    )
  })

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewers}</ul>
    </section>
  );
}