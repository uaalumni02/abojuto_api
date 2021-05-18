import "dotenv/config";
import chai from "chai";
import chaiHttp from "chai-http";
import request from "supertest";
import Mock from "../_mocks_/index";
import app from "../../src/server";

chai.use(chaiHttp);
chai.should();

const { expect } = chai;

const statePath = "/api/state";

describe("add state", () => {
  it("should register state", (done) => {
    request(app).post(statePath).send(Mock.state).expect(201, done);
    Mock.state.should.be.a("object");
    expect(Mock.state).to.have.property("name");
  });
});
describe("get all states", () => {
  it("should get all states from DB", (done) => {
    chai
      .request(app)
      .get(statePath)
      .end((err, response) => {
        response.body.should.be.a("object");
        expect(response.body).to.have.nested.property("success").to.eql(true);
        expect(response.body).to.have.nested.property("data[0].name");

        done();
      });
  });
});
