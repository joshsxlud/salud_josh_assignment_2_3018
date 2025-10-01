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

describe("GET /employees/:id endpoint", () => {
    it("Should successfully retrieve employee by Id.", async () => {

        // Arrange
        const employeeId: number = 1; 

        // Act
        const res: Response = await request(app).get(`/api/v1/employees/${employeeId}`);
        
        // Assert
        const expectedEmployee = { 
            id: 1,
            name: "Alice Johnson",
            position: "Branch Manager",
            department: "Management",
            email: "alice.johnson@pixell-river.com",
            phoneNumber: 6045550148,
            branchId: 1
            } 

        expect(res.status).toBe(HTTP_STATUS.OK);
        expect(res.body.data).toMatchObject(expectedEmployee);
    });

    it("Should return an error when id does not exist.", async () => {
        
        // Arrange 
        const employeeId: number = 100;
        
        //  Act
        const res: Response = await request(app).get(`/api/v1/employees/${employeeId}`);
        
        // Assert
        expect(res.status).toBe(HTTP_STATUS.NOT_FOUND);
    });
});

describe("PUT /api/v1/employees/:id endpoint", () => {
    it("Should return an updated employee.", async () => {
        
        // Arrange
        const employeeId: number = 1;
        const updatedEmployee: Partial<Employee> = {
            position: "Test Position"
        };

        // Act
        const res: Response = await request(app).put(`/api/v1/employees/${employeeId}`).send(updatedEmployee);
        expect(res.status).toBe(HTTP_STATUS.OK);
        expect(res.body.data.position).toBe("Test Position");
    });

    it("Should return an error when employee not found.", async () => {
    
        // Arrange 
        const employeeId: number = 100;
        
        // Act
        const res: Response = await request(app).get(`/api/v1/employees/${employeeId}`);
        
        // Assert
        expect(res.status).toBe(HTTP_STATUS.NOT_FOUND);
    });

    it("Should return an error when trying to update incorrect fields.", async () => {

        // Arrange
        const employeeId: number = 1;
        const invalidUpdate = {
            fakeField: "Fake"
        };

        // Act
        const res: Response = await request(app).put(`/api/v1/employees/${employeeId}`).send(invalidUpdate);

        // Assert
        expect(res.status).toBe(HTTP_STATUS.NOT_FOUND);

    });
});

describe("/api/employees/:id", () => {
    it("Should successfully delete an employee.", async () => {

    });
});