describe("appointments", () => {
  beforeEach(() => {
    //reset test server data to initial state
    cy.request("GET", "/api/debug/reset");
    //render page we want to test
    cy.visit("/");
    //make sure page loads before attempting to test it
    cy.contains("Monday");
   });

  it("should book an interview", () => {
    cy.get("[alt=Add]")
      //select 1st appointment slot(this spot has no appointment assigned)
      .first()
      .click()

    //Add student name to new appointment
    cy.get("[data-testid=student-name-input]")
      .type("Lydia Miller-Jones")

    //Add an interviewer to new appointment
    cy.get("[alt='Sylvia Palmer']")
      .click()

    //save
    cy.contains("Save").click()
    //Check that the new appointment was created
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  it("should edit an interview", () => {
    cy.get("[alt=Edit]")
    .first()
    .click({ force: true });

    cy.get("[data-testid=student-name-input]").clear().type("Lydia Miller-Jones");
    cy.get("[alt='Tori Malcolm']").click();

    cy.contains("Save").click();

    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });
  
  it("should cancel an interview", () => {
    cy.get("[alt=Delete]")
      .click({ force: true });
  
    cy.contains("Confirm").click();
  
    cy.contains("Deleting").should("exist");
    cy.contains("Deleting").should("not.exist");
  
    cy.contains(".appointment__card--show", "Archie Cohen")
      .should("not.exist");
  });
  
});
