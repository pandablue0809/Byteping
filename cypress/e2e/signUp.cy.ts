/// <reference types="Cypress" />
import { SERVER_URL } from "@/utils/global";
import { signUpJsonTypes } from "../types";

describe("sign up", () => {
  beforeEach(() => {
    cy.viewport(1500, 800);
    cy.clock();
    cy.intercept("POST", `${SERVER_URL}/api/user/register`, {
      _id: "65746f73fd62be74c03caace",
      name: "Brian",
      email: "brian@gmail.com",
      pic: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NzQ2ZjczZmQ2MmJlNzRjMDNjYWFjZSIsImlhdCI6MTcwMjEyOTUyMywiZXhwIjoxNzA0NzIxNTIzfQ.yL6Ip_fPQiuFTZGqTqWGzbiHfkMfvj0zhCESi0jN7hw"
    }).as("signUp");
    cy.intercept("POST", "https://api.cloudinary.com/v1_1/dx21sien7/image/upload", {
      asset_id: "d92f634cb93866f380ec0d67df312927",
      public_id: "ypelg9subn78ez6vnuqv",
      version: 1702130590,
      version_id: "7d50cdf04ef9376bc8c8bae2f06b5b16",
      signature: "0473dd99cb160c97c1552d9c805f964aefae3db7",
      width: 1920,
      height: 1920,
      format: "jpg",
      resource_type: "image",
      created_at: "2023-12-09T14:03:10Z",
      tags: [],
      bytes: 383897,
      type: "upload",
      etag: "334f9d1211627e0d2fbadcddce7da4f1",
      placeholder: false,
      url: "http://res.cloudinary.com/dx21sien7/image/upload/v1702130590/ypelg9subn78ez6vnuqv.jpg",
      secure_url: "https://res.cloudinary.com/dx21sien7/image/upload/v1702130590/ypelg9subn78ez6vnuqv.jpg",
      folder: "",
      access_mode: "public",
      original_filename: "adrian"
    }).as("imageUpload");
    cy.visit("/");
  });
  it("should test entire sign up functionalities", () => {
    cy.fixture("signUp.json").then((signUpJson: signUpJsonTypes) => {
      cy.get("[data-cy='registerHereButton']").should("have.text", "Register here !");
      cy.get("[data-cy='registerHereButton']").click();
      cy.get("[data-cy='signUpSubmitButton']").as("submitButton");
      cy.get("[data-cy='signInAndUpTitle']").contains("Sign Up");
      cy.get("[data-cy='signUpName']").focus().blur();
      cy.get("@submitButton").click();
      cy.get("[data-cy='signUpErrorMessage']").should("have.text", "Please type your name");
      cy.get("[data-cy='signUpName']").type(signUpJson.name);
      cy.get("@submitButton").click();
      cy.get("[data-cy='signUpErrorMessage']").should("have.text", "Please type your email");
      cy.get("[data-cy='signUpEmail']").type(signUpJson.email);
      cy.get("@submitButton").click();
      cy.get("[data-cy='signUpErrorMessage']").should("have.text", "Please type your password");
      cy.get("[data-cy='signUpPassword']").type(signUpJson.password);
      cy.get("@submitButton").click();
      cy.get("[data-cy='signUpErrorMessage']").should("have.text", "Please confirm your password");
      cy.get("[data-cy='signUpConfirmPassword']").type(signUpJson.wrongPassword);
      cy.get("@submitButton").click();
      cy.get("[data-cy='signUpErrorMessage']").should("have.text", "Please upload your picture");
      cy.get("[data-cy='signUpImageUploadLabel']").should("have.text", "Upload your image");
      cy.get("[data-cy='signUpImageUpload']").selectFile(signUpJson.imagePath, { force: true });
      cy.get("[data-cy='signUpImageUploadLabel']").should("have.text", "Profile picture uploaded successfully");
      cy.wait("@imageUpload");
      cy.get("@submitButton").click();
      cy.get("[data-cy='signUpErrorMessage']").should("have.text", "Password is not matching");
      cy.get("[data-cy='signUpConfirmPassword']").clear();
      cy.get("[data-cy='signUpConfirmPassword']").type(signUpJson.confirmPassword);
      cy.get("@submitButton").should("have.text", "Sign Up");
      cy.get("@submitButton").click();
      cy.get("@submitButton").click();
      cy.wait("@signUp");
      cy.location("pathname").should("eq", "/chats");
      cy.visit("/");
    });
  });
});
