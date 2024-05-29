import * as user from "../user";

describe("User Handler Test", () => {
  it("Test test 01", () => {
    expect(1).toBe(1);
  });

  it("should create a new user", async () => {
    const req = { body: { username: "testuser01", password: "test01" } };
    const res = {
      json(token) {
        expect(token).toBeTruthy();
      },
    };

    await user.createUser(req, res, (e) => {
      console.log(e);
    });
  });
});
