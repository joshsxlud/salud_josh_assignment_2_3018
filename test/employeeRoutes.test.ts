import request, { Response } from "supertest";
// import * as employeeService from "../src/api/v1/services/employeeService"; 
import app from "../src/app"
import { HTTP_STATUS } from "../src/api/constants/httpConstants";
import { Employee } from "../src/data/employees";

describe("GET /employees endpoint", () => {
    it("Should return all employees.", async () => {
        
        // Act
        const res: Response = await request(app).get("/api/v1/employees");

        // Assert
        expect(res.status).toBe(HTTP_STATUS.OK);
        expect(res.body).toHaveProperty("data");
        expect(Array.isArray(res.body.data)).toBe(true);
    });

});

describe("POST /employees endpoint", () => {
    it("Should create a new employee.", async () => {

        // Arrange
        const testEmployee: Omit<Employee, "id"> = {
            name: "Test Employee",
            position: "Test Position",
            department: "Test Department",
            email: "Testemail@test.test",
            phoneNumber: 2041231231,
            branchId: 123
        };

        // Act
        const res: Response = await request(app).post("/api/v1/employees").send(testEmployee);

        // Assert
        expect(res.status).toBe(HTTP_STATUS.CREATED);
        expect(res.body.data).toMatchObject(testEmployee);
    });

    it("Should return an error when missing fields.", async () => {

        // Arrange
        const failedTestEmployee: Partial<Omit<Employee, "id">> = {
            name: "Test Employee",
            position: "Test Position",
            department: "Test Department",
            email: "Testemail@test.test",
            phoneNumber: 2041231231
        };

        // Act
        const res: Response = await request(app).post("/api/v1/employees").send(failedTestEmployee);

        // Assert
        expect(res.status).toBe(HTTP_STATUS.BAD_REQUEST);
    });
});