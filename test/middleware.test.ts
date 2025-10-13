import { Request, Response, NextFunction} from "express";
import { validationMiddleware } from "../src/api/v1/middleware/validationMiddleware";
// import { HTTP_STATUS } from "../src/api/constants/httpConstants";
// import Joi from "joi";

describe("Validation Middleware", () => {
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let mockNext: NextFunction;

    beforeEach(() => {
        mockReq = {
            body: {},
            params: {},
            query: {},
            method: ""
        };
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            locals: {},
        };
        mockNext = jest.fn();
    });

    it("Should call next() for valid POST /api/v1/employees", () => {

        // Arrange
        // Add property manually
        Object.defineProperty(mockReq, "path", {get: () => "/api/v1/employees"});
        mockReq.method = "POST";
        mockReq.body = {
            name: "TestName",
            position: "TestPosition",
            department: "TestDepartment",
            email: "TestEmail@pixell-river.com",
            phoneNumber: 1234567890,
            branchId: 1,
        };

        // Act
        validationMiddleware(mockReq as Request, mockRes as Response, mockNext);

        // Assert
        expect(mockNext).toHaveBeenCalled();
        expect(mockRes.status).not.toHaveBeenCalled();
        expect(mockRes.json).not.toHaveBeenCalled();
        });

        it("Should call next() for valid PUT /api/v1/employees", () => {
    
            // Arrange
            // Add property manually
            Object.defineProperty(mockReq, "path", {get: () => "/api/v1/employees/1"});
            mockReq.method = "POST";
            mockReq.body = {
                position: "TestPosition",
                email: "TestEmail@pixell-river.com",
                id: 123
            };
    
            // Act
            validationMiddleware(mockReq as Request, mockRes as Response, mockNext);
    
            // Assert
            expect(mockNext).toHaveBeenCalled();
            expect(mockRes.status).not.toHaveBeenCalled();
            expect(mockRes.json).not.toHaveBeenCalled();

            });
        it("Should call next() for valid DELETE /api/v1/employees/1", () => {
    
            // Arrange
            // Add property manually
            Object.defineProperty(mockReq, "path", {get: () => "/api/v1/employees/1"});
            mockReq.method = "DELETE";
            mockReq.body = {};
    
            // Act
            validationMiddleware(mockReq as Request, mockRes as Response, mockNext);
    
            // Assert
            expect(mockNext).toHaveBeenCalled();
            expect(mockRes.status).not.toHaveBeenCalled();
            expect(mockRes.json).not.toHaveBeenCalled();
            });
        
});
