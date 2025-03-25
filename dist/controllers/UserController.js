import ResponseController from "../controllers/ResponseMessageController";
export default class UserController {
    constructor() {
        this.responseController = new ResponseController();
        this.usersList = JSON.parse(localStorage.getItem("usersList") || "[]");
    }
    registerUser(email, password) {
        if (this.usersList && this.usersList.length > 0) {
            // Checking if the user already exists
            const existingUser = this.usersList.find((user) => user && user.email === email);
            if (existingUser) {
                this.responseController.returnMessage("User already exists, please sign in.", false);
            }
            else {
                // Registering the user
                localStorage.setItem("usersList", JSON.stringify([
                    ...this.usersList,
                    { email: email, password: password },
                ]));
                this.responseController.returnMessage("User registered successfully, redirecting...", true);
            }
        }
        else {
            // Registering the user
            localStorage.setItem("usersList", JSON.stringify([
                ...this.usersList,
                { email: email, password: password },
            ]));
            this.responseController.returnMessage("User registered successfully, redirecting...", true);
        }
        return false;
    }
    loginUser(email, password) {
        // Finding the user that matches the email and password from the form
        const user = this.usersList.find((user) => user.email === email && user.password === password);
        if (user) {
            // Storing the user in the localStorage
            localStorage.setItem("activeUser", JSON.stringify(user));
            // User found login successful
            return true;
        }
        else {
            // User NOT found login successful
            return false;
        }
    }
}
