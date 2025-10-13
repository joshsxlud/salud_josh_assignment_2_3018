import request, { Response } from "supertest";
import app from "../src/app"
import { HTTP_STATUS } from "../src/api/constants/httpConstants";
import { Branch } from "../src/api/v1/models/branchModel";

describe("GET /branches endpoint", () => {
    it("Should return all employees.", async () => {
        
        // Act
        const res: Response = await request(app).get("/api/v1/branches");

        // Assert
        expect(res.status).toBe(HTTP_STATUS.OK);
        expect(res.body).toHaveProperty("data");
        expect(Array.isArray(res.body.data)).toBe(true);
    });
});

describe("POST /branches endpoint", () => {
    it("Should create a new branch", async () => {

        // Arrange
        const testBranch: Omit<Branch, "id"> = {
            name: "Test Branch",
            address: "123 Test Lane",
            phoneNumber: 1233214321
        };

        // Act
        const res: Response = await request(app).post("/api/v1/branches").send(testBranch);

        // Assert
        expect(res.status).toBe(HTTP_STATUS.CREATED);
        expect(res.body.data).toMatchObject(testBranch);
    });

    it("Should return an error when missing fields.", async () => {
        
        // Arrange 
        const failedBranch: Partial<Omit<Branch, "id">> = {
            name: "Test Branch",
            address: "123 Test Lane"
        }

        // Act
        const res: Response = await request(app).post("/api/v1/branches").send(failedBranch)

        // Assert
        expect(res.status).toBe(HTTP_STATUS.BAD_REQUEST);
    });
});

describe("GET /branches/:id", () => {
    it("Should successfully retrieve a branch by Id.", async () => {

        // Arrange
        const branchId: number = 1;

        // Act
        const res: Response = await request(app).get(`/api/v1/branches/${branchId}`);

        // Assert
        const expectedBranch: Branch = {
            "id": 1,
            "name": "Vancouver Branch",
            "address": "1300 Burrard St, Vancouver, BC, V6Z 2C7",
            "phoneNumber": 6044560022           
        };

        expect(res.status).toBe(HTTP_STATUS.OK);
        expect(res.body.data).toMatchObject(expectedBranch);
    });

    it("Should return an error when branch id does not exist.", async () => {

        // Arrange
        const branchId: number = 100;

        // Act
        const res: Response = await request(app).get(`/api/v1/branches/${branchId}`);

        // Assert
        expect(res.status).toBe(HTTP_STATUS.NOT_FOUND);
    });
});

describe("PUT /api/v1/branches/:id endpoint", () => {
    it("Should return an updated branch.", async () => {

        // Arrange
        const branchId: number = 1;
        const updatedBranch: Partial<Branch> = {
            phoneNumber: 1233214321
        };

        // Act
        const res: Response = await request(app).put(`/api/v1/branches/${branchId}`).send(updatedBranch);
        expect(res.status).toBe(HTTP_STATUS.OK);
        expect(res.body.data.phoneNumber).toBe(1233214321);
    });

    it("Should return an error when employee not found.", async () => {

        // Arrange
        const branchId: number = 100;

        // Act
        const res: Response = await request(app).get(`/api/v1/branches/${branchId}`);

        // Assert
        expect(res.status).toBe(HTTP_STATUS.NOT_FOUND);
    });

    it("Should return an error when trying to update incorrect fields.", async () => {

        // Arrange
        const branchId: number = 1;
        const invalidUpdate = {
            fakeField: "Fake"
        };

        // Act
        const res: Response = await request(app).put(`/api/v1/branches/${branchId}`).send(invalidUpdate);

        // Assert
        expect(res.status).toBe(HTTP_STATUS.BAD_REQUEST);

    });
});

describe("DELETE /api/v1/branches/:id", () => {
    it("Should successfully delete a branch.", async () => {

        // Arrange
        const branchId: number = 1;

        // Act
        const res: Response = await request(app).delete(`/api/v1/branches/${branchId}`);

        // Assert
        expect(res.status).toBe(HTTP_STATUS.OK);
    });

    it("Should return an error when trying to delete an employee with invalid id.", async () => {

        // Arrange
        const branchId: number = 100; 

        // Act
        const res: Response = await request(app).delete(`/api/v1/branches/${branchId}`);

        // Assert
        expect(res.status).toBe(HTTP_STATUS.NOT_FOUND);
    });
});
