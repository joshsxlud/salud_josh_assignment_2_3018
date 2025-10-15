// An interface representing an employee
export interface Employee {
  id?: string;
  name: string;
  position: string;
  department: string;
  email: string;
  phoneNumber: number;
  branchId: number;
}

// An interface representing employees with similar branchIds
export interface MatchingBranches {
  branchId: number;
  name: string;
  department: string;
}

// An interface representing employees with similar departments
export interface MatchingDepartment {
  name: string;
  branchId: number;
  department: string;
}