export default {
  "swagger": "2.0",
  "info": {
    "version": "1.0.0",
    "title": "User and Employee API Documentation",
    "description": "User and Employee API Information",
  },
  "host": `localhost:${process.env.API_PORT}`,
  "schemes": [
    "http"
  ],
  "consumes": [
    "application/json"
  ],
  "produces": [
    "application/json"
  ],
  "paths": {
    '/api/user/login': {
      "post": {
        "tags": [
          "Authentication"
        ],
        "summary": "User Login",
        "description": "User Login",
        "parameters": [
          {
            "name": "user",
            "in": "body",
            "schema": {
              "properties": {
                "email": {
                  "type": "string"
                },
                "password": {
                  "type": "string"
                }
              }
            }
          }
        ],
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "Login Successfully",
          }
        }
      },
    },
    '/api/user/request/resetpassword': {
      "post": {
        "tags": [
          "Authentication"
        ],
        "summary": "User Request Rest Password",
        "description": "Request Rest Password",
        "parameters": [
          {
            "name": "user",
            "in": "body",
            "schema": {
              "properties": {
                "email": {
                  "type": "string"
                }
              }
            }
          }
        ],
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "Requested Successfully",
          }
        }
      },
    },
    '/api/user/updatepassword': {
      "post": {
        "tags": [
          "Authentication"
        ],
        "summary": "User Update Password",
        "description": "User Update Password",
        "parameters": [
          {
            "name": "user",
            "in": "body",
            "schema": {
              "properties": {
                "token": {
                  "type": "string"
                },
                "password": {
                  "type": "string"
                }
              }
            }
          }
        ],
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "Updated Successfully",
          }
        }
      },
    },
    '/api/user': {
      "post": {
        "tags": [
          "User"
        ],
        "summary": "User Sign up",
        "description": "Create new user in User table",
        "parameters": [
          {
            "name": "user",
            "in": "body",
            "description": "User that we want to create",
            "schema": {
              "properties": {
                "name": {
                  "type": "string"
                },
                "email": {
                  "type": "string"
                },
                "password": {
                  "type": "string"
                }
              }
            }
          }
        ],
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "New user is created",
          }
        }
      },
      "get": {
        "tags": [
          "User"
        ],
        "summary": "Get all users from User table",
        "responses": {
          "200": {
            "description": "OK",

          }
        }
      }
    },
    "/api/user/{id}": {
      "parameters": [
        {
          "name": "id",
          "in": "path",
          "required": true,
          "description": "ID of user that we want to find",
          "type": "number"
        }
      ],
      "get": {
        "tags": [
          "User"
        ],
        "summary": "Get user with given ID",
        "responses": {
          "200": {
            "description": "User is found",
          }
        }
      },
      "delete": {
        "tags": [
          "User"
        ],
        "summary": "Delete user with given ID",
        "responses": {
          "200": {
            "description": "User Deleted",
          }
        }
      },
    },
    '/api/employee': {
      "post": {
        "tags": [
          "Employee"
        ],
        "summary": "Add employee",
        "description": "Create new employee",
        "parameters": [
          {
            "name": "employee",
            "in": "body",
            "description": "Employee that we want to create",
            "schema": {
              "properties": {
                full_name: {
                  type: "string",
                },
                job_title: {
                  type: "string",
                },
                department: {
                  type: "string",
                },
                location: {
                  type: "string",
                },
                age: {
                  type: "number",
                },
                salary: {
                  type: "number",
                },
                user_id: {
                  type: "number",
                }
              }
            }
          }
        ],
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "New user is created",

          }
        }
      },
      "get": {
        "tags": [
          "Employee"
        ],
        "summary": "Get all employee",
        "responses": {
          "200": {
            "description": "OK",

          }
        }
      }
    },
    "/api/employee/{id}": {
      "parameters": [
        {
          "name": "id",
          "in": "path",
          "required": true,
          "description": "ID of user that we want to find",
          "type": "number",
        }
      ],
      "get": {
        "tags": [
          "Employee"
        ],
        "summary": "Get user with given ID",
        "responses": {
          "200": {
            "description": "Employees Details",
          }
        }
      },
      "delete": {
        "tags": [
          "Employee"
        ],
        "summary": "Delete Employee with given ID",
        "responses": {
          "200": {
            "description": "Employee Deleted",
          }
        }
      },
    }
  }
}