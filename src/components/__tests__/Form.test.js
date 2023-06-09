import React from "react";
import { render, cleanup } from "@testing-library/react";
import Form from "components/Appointment/Form";
import { fireEvent } from "@testing-library/react";

afterEach(cleanup);

describe("Form", () => {

  //mock data
  const interviewers = [
    {
      id: 1,
      student: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];


  it("renders without student name if not provided", () => {
    //Render component to be tested with all needed props
    const { getByPlaceholderText } = render(
      <Form
        interviewers = {interviewers}
      />
    );

    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });

  it("renders with initial student name", () => {
    //Render component to be tested with all needed props
    const { getByTestId } = render(
      <Form
        interviewers = {interviewers}
        student="Lydia Miller-Jones"
      />
    );

    expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones");
  });

  it("validates that the student name is not blank", () => {

    //simulating the onSave function
    const onSave = jest.fn();
    //Render component to be tested with all needed props
    const { getByText } = render(
      <Form
        interviewers = {interviewers}
        onSave={onSave}
      />
    );
    //Trigger click event
    fireEvent.click(getByText("Save"));

    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });

  it("validates that the interviewer cannot be null", () => {
    //simulating the onSave function
    const onSave = jest.fn();
    //Render component to be tested with all needed props
    const { getByText } = render(
      <Form
        interviewers = {interviewers}
        onSave={onSave}
        student="Lydia Miller-Jones"
      />
    );
    //Trigger click event
    fireEvent.click(getByText("Save"));

    expect(getByText(/please select an interviewer/i)).toBeInTheDocument();
    
    expect(onSave).not.toHaveBeenCalled();
  });
  
  it("calls onSave function when the name is defined", () => {
    //simulating the onSave function
    const onSave = jest.fn();
    //Render component to be tested with all needed props
    const { getByText, queryByText } = render(
      <Form
        interviewers = {interviewers}
        onSave={onSave}
        student="Lydia Miller-Jones"
        interviewer={interviewers[0].id}
      />
    );
    
    //Trigger click event
    fireEvent.click(getByText("Save"));
    
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
    expect(queryByText(/please select an interviewer/i)).toBeNull();
  
    /* onSave is called once*/
    expect(onSave).toHaveBeenCalledTimes(1);
  
    /* onSave is called with the correct arguments */
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", 1);
  });
  
  it("submits the name entered by the user", () => {
    //simulating the onSave function
    const onSave = jest.fn();
    //Render component to be tested with all needed props
    const { getByText, getByPlaceholderText } = render(
      <Form interviewers={interviewers} onSave={onSave} interviewer={1} />
    );
  
    const input = getByPlaceholderText("Enter Student Name");
  
    fireEvent.change(input, { target: { value: "Lydia Miller-Jones" } });
    fireEvent.click(getByText("Save"));
  
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", 1);
  });
  
  it("can successfully save after trying to submit an empty student name", () => {
    //simulating the onSave function
    const onSave = jest.fn();
    //Render component to be tested with all needed props
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form interviewers={interviewers} onSave={onSave} interviewer={1} />
    );
  
    fireEvent.click(getByText("Save"));
  
    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  
    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });
  
    fireEvent.click(getByText("Save"));
  
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
  
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", 1);
  });
  
  it("calls onCancel and resets the input field", () => {
    const onCancel = jest.fn();
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form
        interviewers={interviewers}
        name="Lydia Mill-Jones"
        onSave={jest.fn()}
        onCancel={onCancel}
      />
    );
  
    fireEvent.click(getByText("Save"));
  
    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });
  
    fireEvent.click(getByText("Cancel"));
  
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
  
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  
    expect(onCancel).toHaveBeenCalledTimes(1);
  });
  
});
