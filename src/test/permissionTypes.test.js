const supertest = require("supertest");
const { app, server } = require("../../src/index");
const { DESCRIPTION } = require("./helpers");

const api = supertest(app);

test("Test get permission types success", async () => {
  await api
    .get("/api/permission-types")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("Test get permission types failed", async () => {
  await api.get("/api/permission-type").expect(404);
});

test("Test new permission type success", async () => {
  const permissionType = {
    description: DESCRIPTION,
  };
  await api.post("/api/permission-types").send(permissionType).expect(200);
});

test("Test new permission type error, description required", async () => {
  const permissionType = {};
  await api
    .post("/api/permission-types")
    .send(permissionType)
    .expect(400)
    .expect("Content-Type", /application\/json/);
});

test("Test new permission type error, route not found", async () => {
  const permissionType = {
    description: DESCRIPTION,
  };
  await api.post("/api/permission-typ").send(permissionType).expect(404);
});

test("Test delete permission type success", async () => {
  let permissionTypes = await api.get("/api/permission-types");
  let permissionType = permissionTypes?.body?.find(
    (permissionType) => permissionType.description === DESCRIPTION
  );
  await api
    .delete(`/api/permission-types/${permissionType?.permissionTypeID}`)
    .expect(200);
});

afterAll(() => {
  server.close();
});
