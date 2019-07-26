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
- Implement validation (express-validator)
- Implement CORS
- Implement a rate limiter
- Write unit tests

#### METHOD GET:

Use the `influencers.json` file in the mocks folder. Use the influencers ID in your
get request. Validate the data, based on the `influencers.json` property data type. Based on the ID, find the object from the mock array and give back in the response.

You should send an ID to the server. The server then would match an influencer from `influencers.json` array matching the sent ID. Then send back the selected `influencer` as a response. Implement proper error handling.

#### METHOD POST:

Use the `influencers.json` file in the mocks folder to create a payload. Send this payload to the server. If the request was successfull give back the `influencers.json`. Add a middleware to this endpoint which would throw errors in the 50% of the time (ERRORCODE=500). Implement proper error handling.


#### Tools:

- node JS
- express JS
- Express data validator
- Express rate limiter
- CORS
- Typescript
- Mocha / Chai for unit tests

### Submitting

Please avoid pushing your entire work in one commit. Try to make commits on each logical block, as You did in any
other environment. Once ready, open a PR towards master. Describe your work in the PR.
