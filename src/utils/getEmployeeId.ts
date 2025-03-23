import { jwtDecode } from "jwt-decode";

const getEmployeeId = () => {
  const idToken = localStorage.getItem("idToken");
  if (!idToken) return null;

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const decodedToken: any = jwtDecode(idToken);
    return decodedToken.sub;
  } catch (error) {
    console.error("Error decoding ID Token:", error);
    return null;
  }
};

const employeeId = getEmployeeId();
console.log("Employee ID:", employeeId);
