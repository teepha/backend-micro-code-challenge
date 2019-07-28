import app from "../index";
import chai from "chai";
import chaiHttp = require("chai-http");
import "mocha";
import faker from "faker";
import influencerTestDb from "../mocks/influencers.json";

chai.use(chaiHttp);
const expect = chai.expect;

describe("Micro-code challenge test", () => {
  describe("Hello API Request", () => {
    it("should return response on call", () => {
      return chai
        .request(app)
        .get("/")
        .then(res => {
          chai.expect(res.text).to.eql("Welcome to Micro-code challenge!");
        });
    });

    it("should return an error if route is invalid", () => {
      return chai
        .request(app)
        .get("/someroute")
        .then(res => {
          chai.expect(res.text).to.eql("Route/Endpoint does not exist!!!");
        });
    });
  });

  describe("POST => Create Influencer", () => {
    it("Should create new influencer", () => {
      return chai
        .request(app)
        .post("/influencers")
        .send({
          ...influencerTestDb[0],
          email: faker.internet.email()
        })
        .then(res => {
          chai.expect(res.status).to.eql(201);
        });
    });

    it("Should return error message if email is not in email format", () => {
      return chai
        .request(app)
        .post("/influencers")
        .send({
          ...influencerTestDb[1],
          email: "someEmail"
        })
        .then(res => {
          chai.expect(res.status).to.eql(422);
          chai.expect(res.body.message).to.eql("EMAIL is not a valid email!");
        });
    });

    it("Should return error message if full name field is empty", () => {
      return chai
        .request(app)
        .post("/influencers")
        .send({
          ...influencerTestDb[1],
          fullName: "  ",
          email: faker.internet.email()
        })
        .then(res => {
          chai.expect(res.status).to.eql(422);
          chai
            .expect(res.body.message)
            .to.eql("FULLNAME field must not be Empty!");
        });
    });

    it("Should return error message if the value enter for full name is not valid or not a string", () => {
      return chai
        .request(app)
        .post("/influencers")
        .send({
          ...influencerTestDb[1],
          fullName: 2000,
          email: faker.internet.email()
        })
        .then(res => {
          chai.expect(res.status).to.eql(422);
          chai
            .expect(res.body.message)
            .to.eql("FULLNAME has an invalid value!");
        });
    });

    it("Should return error message if email already exists", () => {
      return chai
        .request(app)
        .post("/influencers")
        .send({
          ...influencerTestDb[1],
          email: influencerTestDb[1].email
        })
        .then(res => {
          chai.expect(res.status).to.eql(401);
          chai.expect(res.body.message).to.eql("Email already exists!");
        });
    });

    it("Should return error message if you attempt to create an influencer more than 5times in 30minutes", () => {
      return chai
        .request(app)
        .post("/influencers")
        .send({
          ...influencerTestDb[1],
          email: faker.internet.email()
        })
        .then(res => {
          chai.expect(res.status).to.eql(429);
          chai
            .expect(res.text)
            .to.eql(
              "Too many accounts created from this IP, please try again after 30 minutes"
            );
        });
    });
  });

  describe("GET => Get Influencer", () => {
    it("Should return the influencer data", () => {
      return chai
        .request(app)
        .get(`/influencers/${influencerTestDb[2].id}`)
        .then(res => {
          chai.expect(res.status).to.eql(200);
          chai.expect(res.body.id).to.eql(influencerTestDb[2].id);
        });
    });

    it("Should return an error if the Id supplied in URL is not a number", () => {
      return chai
        .request(app)
        .get("/influencers/somestring")
        .then(res => {
          chai.expect(res.status).to.eql(422);
          chai.expect(res.body.message).to.eql("ID is Invalid!");
        });
    });

    it("should return error message if influencer record is not found", () => {
      return chai
        .request(app)
        .get("/influencers/12345678")
        .then(res => {
          chai.expect(res.status).to.eql(404);
          chai.expect(res.body.message).to.eql("Record not found!");
        });
    });
  });
});
