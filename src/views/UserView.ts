import UserController from "../controllers/UserController";
import { getFormData } from "../utils/getFormData";
import { validateFormData } from "../utils/validateFormData";

class UserView {
    private userController = new UserController();

    newUser(email: string, password: string) {
        return this.userController.registerUser(email, password);
    }

    signIn(email: string, password: string) {
        return this.userController.loginUser(email, password);
    }
}

// User View Instance
const userView = new UserView();

// Sign Up Functionality:
// Sign Up Form
const signUpForm = document.getElementById("signUpForm") as HTMLFormElement;
// Checking if the form exists
if (signUpForm) {
    // Info text
    const signUpFeedback = document.createElement("p");
    signUpFeedback.className = "infoText";
    signUpForm.appendChild(signUpFeedback);

    signUpForm.addEventListener("submit", (event) => {
        // Prevents the form from submitting
        event.preventDefault();
        // The "as" keyword is used for a type assertion, telling the compiler to treat FormDataEntryValue as a string.
        const { email, password, confirmPassword } = getFormData(signUpForm) as {
            email: string;
            password: string;
            confirmPassword: string;
        };
        // Validating data
        let response = validateFormData({ email, password, confirmPassword });
        // If is valid, then create the user
        if (response.success) {
            // Assigning userView.newUser() to response variable so we can get the response from the custom response class and handle / display errors
            response = userView.newUser(email, password);
            // Changing color of the text
            signUpFeedback.style.color = "#27ae60";
            //Little timeout
            setTimeout(() => {
                window.location.href = "/";
            }, 2500);
        }
        // Displaying response message
        signUpFeedback.textContent = response.msg;
    });
}

// Sign In Functionality:
// Sign In Form
const signInForm = document.getElementById("loginForm") as HTMLFormElement;
// Checking if the form exists
if (signInForm) {
    // Info text
    const signInFeedback = document.createElement("p");
    signInFeedback.className = "infoText";
    signInForm.appendChild(signInFeedback);

    signInForm.addEventListener("submit", (event) => {
        // Prevents the form from submitting
        event.preventDefault();
        // The "as" keyword is used for a type assertion, telling the compiler to treat FormDataEntryValue as a string.
        const { email, password } = getFormData(signInForm) as {
            email: string;
            password: string;
        };
        // Assigning userView.signIn() to response variable so we can get the response from the custom response class and handle / display errors
        let response = userView.signIn(email, password);
        // If is valid, then login
        if (response.success) {
            // Changing color of the text
            signInFeedback.style.color = "#27ae60";
            //Little timeout
            setTimeout(() => {
                window.location.href = "/dashboard.html";
            }, 2500);
        }
        // Displaying response message
        signInFeedback.textContent = response.msg;
    });
}
