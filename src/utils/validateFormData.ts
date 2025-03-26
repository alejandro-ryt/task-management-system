import ResponseMessageController from "../controllers/ResponseMessageController";
import ResponseMessage from "../models/ResponseMessage";

const responseController = new ResponseMessageController();

export function validateFormData(data: {
  email: string;
  password: string;
  confirmPassword?: string;
}): ResponseMessage {
  const { email, password, confirmPassword } = data;
  const emailPattern = /^[a-zA-Z0–9._%+-]+@[a-zA-Z0–9.-]+\.[a-zA-Z]{2,}$/;

  if (
    !email ||
    !password ||
    (confirmPassword !== undefined && !confirmPassword)
  ) {
    return responseController.returnMessage("Please fill all fields *", false);
  } else if (!emailPattern.test(email)) {
    return responseController.returnMessage("Invalid email format *", false);
  } else if (confirmPassword !== undefined && password !== confirmPassword) {
    return responseController.returnMessage("Passwords do not match *", false);
  } else if (password.length < 8) {
    return responseController.returnMessage(
      "Password must be at least 8 characters long *",
      false
    );
  } else {
    return responseController.returnMessage("OK", true);
  }
}
