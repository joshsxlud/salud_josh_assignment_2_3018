import { Request, Response, NextFunction} from "express";
import { validationMiddleware } from "../src/api/v1/middleware/validationMiddleware";
describe("Validation Middleware EMPLOYEES POST", () => {
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let mockNext: NextFunction;

    beforeEach(() => {
        mockReq = {
            body: {},
            params: {},
            query: {},
            path: "/api/v1/employees"
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
        mockReq.method = "POST";
        mockReq.body = {
            name: "TestName",
            position: "TestPosition",
            department: "TestDepartment",
            email: "TestEmail@pixell-river.com",
            phoneNumber: 1234567890,
            branchId: 1
        };

        // Act
        validationMiddleware(mockReq as Request, mockRes as Response, mockNext);

        // Assert
        expect(mockNext).toHaveBeenCalled();
        expect(mockRes.status).not.toHaveBeenCalled();
        expect(mockRes.json).not.toHaveBeenCalled();
        });

    it("Should call next() for valid PUT /api/v1/employees/1", () => {

        // Arrange
        mockReq.method = "PUT";
        mockReq.body = {
            position: "TestPosition",
            email: "TestEmail@pixell-river.com",
        };

        // Act
        validationMiddleware(mockReq as Request, mockRes as Response, mockNext);

        // Assert
        expect(mockNext).toHaveBeenCalled();
        expect(mockRes.status).not.toHaveBeenCalled();
        expect(mockRes.json).not.toHaveBeenCalled();

    });
});

describe("Validation Middleware EMPLOYEES PUT", () => {
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let mockNext: NextFunction;

    beforeEach(() => {
        mockReq = {
            body: {},
            params: {},
            query: {},
            path: "/api/v1/employees/1"
        };
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            locals: {},
        };
        mockNext = jest.fn();
    });

    it("Should call next() for valid PUT /api/v1/employees/1", () => {

        // Arrange
        mockReq.method = "PUT";
        mockReq.body = {
            position: "TestPosition",
            email: "TestEmail@pixell-river.com",
        };

        // Act
        validationMiddleware(mockReq as Request, mockRes as Response, mockNext);

        // Assert
        expect(mockNext).toHaveBeenCalled();
        expect(mockRes.status).not.toHaveBeenCalled();
        expect(mockRes.json).not.toHaveBeenCalled();

    });
});

describe("Validation Middleware BRANCHES POST", () => {
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let mockNext: NextFunction;

    beforeEach(() => {
        mockReq = {
            body: {},
            params: {},
            query: {},
            path: "/api/v1/branches"
        };
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            locals: {},
        };
        mockNext = jest.fn();
    });

    it("Should call next() for valid POST /api/v1/branches", () => {

        // Arrange
        mockReq.method = "POST";
        mockReq.body = {
            name: "Test",
            address: "123 Test Lane",
            phoneNumber: 1234567890,
        };

        // Act
        validationMiddleware(mockReq as Request, mockRes as Response, mockNext);

        // Assert
        expect(mockNext).toHaveBeenCalled();
        expect(mockRes.status).not.toHaveBeenCalled();
        expect(mockRes.json).not.toHaveBeenCalled();
    });
});

describe("Validation Middleware BRANCHES PUT", () => {
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let mockNext: NextFunction;

    beforeEach(() => {
        mockReq = {
            body: {},
            params: {},
            query: {},
            path: "/api/v1/branches/1"
        };
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            locals: {},
        };
        mockNext = jest.fn();
    });

    it("Should call next() for valid PUT /api/v1/branches/1", () => {

        // Arrange
        mockReq.method = "PUT";
        mockReq.body = {
            phoneNumber: 1231231234,
        };

        // Act
        validationMiddleware(mockReq as Request, mockRes as Response, mockNext);

        // Assert
        expect(mockNext).toHaveBeenCalled();
        expect(mockRes.status).not.toHaveBeenCalled();
        expect(mockRes.json).not.toHaveBeenCalled();
    });
});