const supertest = require("supertest");
const { app, server } = require("../../src/index");
const {
  FIRST_NAME,
  LAST_NAME,
  PERMISSION_DATE,
  FIRST_NAME_UPDATE,
} = require("./helpers");

const api = supertest(app);
let permissionTypeId = null;

beforeEach(async () => {
  const permissionTypes = await api.get("/api/permission-types");
  permissionTypeId = permissionTypes?.body[0]?.permissionTypeID;
});

test("Test get permissions success", async () => {
  await api
    .get("/api/permissions")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("Test get permissions failed, route not found", async () => {
  await api.get("/api/permission").expect(404);
});

test("Test new permission success", async () => {
  const permission = {
    employeeLastName: LAST_NAME,
    employeeFirstName: FIRST_NAME,
    permissionType: permissionTypeId,
    permissionDate: PERMISSION_DATE,
  };
  await api.post("/api/permissions").send(permission).expect(200);
});

test("Test new permission error, first name required", async () => {
  const permission = {
    employeeLastName: LAST_NAME,
    permissionType: permissionTypeId,
    permissionDate: PERMISSION_DATE,
  };
  await api
    .post("/api/permissions")
    .send(permission)
    .expect(400)
    .expect("Content-Type", /application\/json/);
});

test("Test new permission error, last name required", async () => {
  const permission = {
    employeeFirstName: FIRST_NAME,
    permissionType: permissionTypeId,
    permissionDate: PERMISSION_DATE,
  };
  await api
    .post("/api/permissions")
    .send(permission)
    .expect(400)
    .expect("Content-Type", /application\/json/);
});

test("Test new permission error, permission type required", async () => {
  const permission = {
    employeeLastName: LAST_NAME,
    employeeFirstName: FIRST_NAME,
    permissionDate: PERMISSION_DATE,
  };
  await api
    .post("/api/permissions")
    .send(permission)
    .expect(400)
    .expect("Content-Type", /application\/json/);
});

test("Test new permission error, permission date required", async () => {
  const permission = {
    employeeLastName: LAST_NAME,
    employeeFirstName: FIRST_NAME,
    permissionType: permissionTypeId,
  };
  await api
    .post("/api/permissions")
    .send(permission)
    .expect(400)
    .expect("Content-Type", /application\/json/);
});

test("Test update permission success", async () => {
  let permissions = await api.get("/api/permissions");
  let permission = permissions?.body?.find(
    (permission) =>
      permission.EmployeeLastName === LAST_NAME &&
      permission.EmployeeFirstName === FIRST_NAME
  );
  const permissionUpdate = {
    employeeFirstName: FIRST_NAME_UPDATE,
  };
  await api
    .put(`/api/permissions/${permission.PermissionID}`)
    .send(permissionUpdate)
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("Test update permission failed, permission not fount", async () => {
  let permissions = await api.get("/api/permissions");
  let permission = permissions?.body[permissions?.body.length-1];
  const permissionUpdate = {
    employeeFirstName: FIRST_NAME_UPDATE,
  };
  await api
    .put(`/api/permissions/${permission.PermissionID+1}`)
    .send(permissionUpdate)
    .expect(404)
    .expect("Content-Type", /application\/json/);
});

test("Test delete permission success", async () => {
  let permissions = await api.get("/api/permissions");
  let permission = permissions?.body?.find(
    (permission) =>
      permission.EmployeeLastName === LAST_NAME &&
      permission.EmployeeFirstName === FIRST_NAME_UPDATE
  );
  const permissionUpdate = {
    employeeFirstName: FIRST_NAME_UPDATE,
  };
  await api
    .delete(`/api/permissions/${permission.PermissionID}`)
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

afterAll(() => {
  server.close();
});
