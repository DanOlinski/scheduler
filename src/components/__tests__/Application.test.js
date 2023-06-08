import React from "react";
import { render, cleanup, fireEvent, waitForElement, getByText, prettyDOM, getAllByTestId, getByAltText, getByPlaceholderText, queryByText } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Form", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", 
  () => {
    const { getByText } = render(<Application />);

    return waitForElement(() => getByText("Monday"))
      .then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", 
  async () => {
    //render application
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0]

    //click add new interview button
    fireEvent.click(getByAltText(appointment, "Add"));
    //add a student name to form
    fireEvent.change(
        getByPlaceholderText(
          //in <article> element there is an attribute called data-testid="appointment", by selecting "appointment we are zeroing into the HTML element we intend to interact with"
          appointment,
          //The form has a text input field with a placeholder text; "enter student name", bellow we are referencing that text to overwrite it with the desired value 
          /enter student name/i), {
      //target will set a value to a prop inside <article element>
      target: { value: "Lydia Miller-Jones" }
    });

    //set an interviewer
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"))
    //save changes
    fireEvent.click(getByText(appointment, "Save"));
    //Check if the status changed to "Saving"
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones"));
    
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    
    //Check that after adding an appointment there are no more spots remaining
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();

    //the console log below will display the HTML element we are manipulating
    //console.log(prettyDOM(appointment))
  });
});
