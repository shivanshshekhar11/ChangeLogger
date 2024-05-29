import app from "../server";
import supertest from "supertest";

describe("Routes Test", () => {
  it("GET /", async () => {
    const res = await supertest(app).get("/");

    expect(res.body.message).toBe("Welcome to ChangeLogger");
  });
});
