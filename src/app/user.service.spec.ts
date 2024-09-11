import { UsersService } from "./users.service";


describe("UserService", () => {
  let service: UsersService;

  beforeEach(() => {
    service = new UsersService();
  });

  it("should return all of the users", () => {
    const results = service.getUsers();
    expect(results.length).toEqual(3);
  });
});