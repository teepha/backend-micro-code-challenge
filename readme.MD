# BACKEND-MICRO-CODE-CHALLENGE

The repository for the back-end code challenge

## Getting Started

Clone the repository and create a new branch with `code-challenge-<yourname>`

### Prerequisites

* [NPM](https://www.npmjs.com/)
* [nodeJS](https://nodejs.org/en/)

### Instructions

Clone the repository, and write the given functionality from scratch:

#### REST API:

- Create an express JS server
- Use middlewares
- Define paths for your endpoints
- Use Typescript

#### METHOD GET:

Use the `influencers.json` file in the mocks folder. Use the influencers ID in your
get request. Validate the data, based on the `influencers.json` property data type. Based on the ID, find the object from the mock array and give back in the response.

#### METHOD POST:

Use the `influencers.json` file in the mocks folder. Send exactly that payload to the server. Validate the data, based on the `influencers.json` property data type. Use custom validation for the e-mail property. On successfull request mirror back the data in the response.

#### Tools:

- node JS
- express JS
- Typescript

#### Bonus points (optional, but will be appreciated):

Write unit tests for your application.

### Submitting

Please avoid pushing your entire work in one commit. Try to make commits on each logical block, as You did in any
other environment. Once ready, open a PR towards master. Describe your work in the PR.
