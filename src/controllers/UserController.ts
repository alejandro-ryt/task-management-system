import ResponseController from "../controllers/ResponseMessageController";
import ResponseMessage from "../models/ResponseMessage";
import UserModel from "../models/UserModel";

export default class UserController {
    private responseController = new ResponseController();
    private usersList = JSON.parse(localStorage.getItem("usersList") || "[]");

    registerUser(email: string, password: string): ResponseMessage {
        if (this.usersList && this.usersList.length > 0) {
            // Checking if the user already exists
            const existingUser = this.usersList.find((user: UserModel) => user && user.email === email);
            if (existingUser) {
                return this.responseController.returnMessage("User already exists, please sign in.", false);
            } else {
                // Registering the user
                localStorage.setItem(
                    "usersList",
                    JSON.stringify([...this.usersList, { email: email, password: password }])
                );
                return this.responseController.returnMessage("User registered successfully, redirecting...", true);
            }
        } else {
            // Registering the user
            localStorage.setItem(
                "usersList",
                JSON.stringify([...this.usersList, { email: email, password: password }])
            );
            return this.responseController.returnMessage("User registered successfully, redirecting...", true);
        }
    }

    loginUser(email: string, password: string): ResponseMessage {
        // Finding the user that matches the email and password from the form
        const user = this.usersList.find((user: UserModel) => user.email === email && user.password === password);
        if (user) {
            // Storing the user in the localStorage
            localStorage.setItem("activeUser", JSON.stringify(user));
            // Returning response message
            return this.responseController.returnMessage("Welcome!, redirecting...", true);
        } else {
            // User NOT found login successful
            return this.responseController.returnMessage("Invalid email or password *", false);
        }
    }
}
