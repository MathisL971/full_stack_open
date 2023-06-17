describe("Note app", function () {
  beforeEach("Reset database", function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
    const user = {
      name: "Mathis Lefranc",
      username: "Thismadu971",
      password: "BrebeufMTL5174",
    };
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);
    cy.visit("");
  });

  it("home page displays", function () {
    cy.contains("Notes");
    cy.contains(
      "Note app, Department of Computer Science, University of Helsinki 2023"
    );
  });

  it("login form can be opened", function () {
    cy.contains("login").click();
  });

  it("user can log in", function () {
    cy.contains("login").click();
    cy.get("#username").type("Thismadu971");
    cy.get("#password").type("BrebeufMTL5174");
    cy.get("#login-button").click();

    cy.get("#login-button").should("not.exist");

    cy.contains("Mathis Lefranc logged in");
  });

  it("login fails with wrong password", function () {
    cy.contains("login").click();
    cy.get("#username").type("Thismadu971");
    cy.get("#password").type("wrong");
    cy.get("#login-button").click();

    cy.get(".error")
      .should("contain", "Wrong credentials")
      .and("have.css", "color", "rgb(255, 0, 0)")
      .and("have.css", "border-style", "solid");

    cy.get("html").should("not.contain", "Mathis Lefranc logged in");
  });

  describe("when logged in", function () {
    beforeEach("Log in", function () {
      cy.login({ username: "Thismadu971", password: "BrebeufMTL5174" });
    });

    it("a new note can be created", function () {
      cy.contains("new note").click();
      cy.get("input").type("a note created by cypress");
      cy.contains("save").click();
      cy.contains("a note created by cypress");
    });

    describe("and several notes exist", function () {
      beforeEach("Create note", function () {
        cy.createNote({ content: "first note", important: false });
        cy.createNote({ content: "second note", important: false });
        cy.createNote({ content: "third note", important: false });
      });

      it("one of those can be made important", function () {
        cy.contains("second note").parent().find("button").as("theButton");
        cy.get("@theButton").click();
        cy.get("@theButton").should("contain", "make not important");
      });
    });
  });
});
