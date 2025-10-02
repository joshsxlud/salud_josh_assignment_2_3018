import request, { Response } from "supertest";
import app from "../src/app";

describe("GET /api/v1/health", () => {
    it("Returns a 200 status code and required fields", async () => {

        // Act
        const res: Response = await request(app).get("/api/v1/health");

        // Assert
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("status");
        expect(res.body).toHaveProperty("uptime");
        expect(res.body).toHaveProperty("timestamp");
        expect(res.body).toHaveProperty("version");
    });
});
