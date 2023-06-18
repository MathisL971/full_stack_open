describe("Blog app", function () {
  beforeEach("Reset and visit home page", () => {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "Mathis Lefranc",
      username: "Thismadu971",
      password: "BrebeufMTL5174",
    };
    cy.request("POST", "http://localhost:3000/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  it("front page can be opened", function () {
    cy.contains("Blogs List");
  });

  it("Login form is shown when log in button clicked", function () {
    cy.contains("Log In").click();

    cy.contains("Cancel");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.contains("Log In").click();
      cy.get("#username").type("Thismadu971");
      cy.get("#password").type("BrebeufMTL5174");
      cy.get("#login-button").click();

      cy.contains("Thismadu971 is logged in!");
    });

    it("fails with wrong credentials", function () {
      cy.contains("Log In").click();
      cy.get("#username").type("Thismadu971");
      cy.get("#password").type("wrongPassword");
      cy.get("#login-button").click();

      cy.get("html").should("not.contain", "Mathis Lefranc logged in");
    });
  });

  describe("When logged in", function () {
    beforeEach("Log in", function () {
      cy.contains("Log In").click();
      cy.get("#username").type("Thismadu971");
      cy.get("#password").type("BrebeufMTL5174");
      cy.get("#login-button").click();
    });

    it("A blog can be created", function () {
      cy.contains("New Note").click();

      cy.get("#title").type("Test Title");
      cy.get("#author").type("Test Author");
      cy.get("#url").type("www.testurl.com");

      cy.contains("Add").click();

      cy.get("html").should("contain", "Test Title - Test Author");
    });

    describe("When a blog exists", function () {
      beforeEach("Create test blog", function () {
        cy.contains("New Note").click();
        cy.get("#title").type("Test Title");
        cy.get("#author").type("Test Author");
        cy.get("#url").type("www.testurl.com");
        cy.contains("Add").click();
      });

      it("An existing blog can be liked", function () {
        cy.contains("View").click();
        cy.get("html").should("contain", "Likes: 0");

        cy.contains("Like").click();

        cy.get("html").should("contain", "Likes: 1");
      });

      it("An existing blog can be deleted by its creator", function () {
        cy.contains("View").click();
        cy.contains("Delete").click();

        cy.get("html").should("not.contain", "Test Title - Test Author");
      });

      it("Only its owner can see its delete button", function () {
        cy.contains("Logout").click();

        const user = {
          name: "Malia Lefranc",
          username: "Malia971",
          password: "BrebeufMTL5174",
        };
        cy.request("POST", "http://localhost:3000/api/users/", user);

        cy.contains("Log In").click();
        cy.get("#username").type("Malia971");
        cy.get("#password").type("BrebeufMTL5174");
        cy.get("#login-button").click();

        cy.contains("View").click();
        cy.get("html").should("not.contain", "Delete");
      });

      describe("When a second blog exists", function () {
        beforeEach("Create a second test blog", function () {
          cy.contains("New Note").click();
          cy.get("#title").type("Second Test Title");
          cy.get("#author").type("Second Test Author");
          cy.get("#url").type("www.secondtesturl.com");
          cy.contains("Add").click();
        });

        it("Second blog should appear first if has more likes", function () {
          cy.get(".blog").eq(0).should("contain", "Test Title - Test Author");
          cy.get(".blog")
            .eq(1)
            .should("contain", "Second Test Title - Second Test Author");

          cy.get(".blog").eq(1).contains("View").click();
          cy.contains("Like").click();

          cy.get(".blog")
            .eq(0)
            .should("contain", "Second Test Title - Second Test Author");
          cy.get(".blog").eq(1).should("contain", "Test Title - Test Author");
        });
      });
    });
  });
});
