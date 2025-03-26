import TaskController from "../controllers/TaskController";
import mockdata from "../../mockdata/tasks.json" assert { type: "json" };
import { getFormData } from "../utils/getFormData";

class TaskView {
    private taskController = new TaskController();

    renderCards() {
        this.taskController.renderExistingTaskCards();
    }

    createTask(title: string, deadline: string, label: string, status: "toDo" | "inProgress" | "done") {
        this.taskController.addTask(title, deadline, label, status);
    }
}

// Variables
// Task View Instance
const taskView = new TaskView();
// Modal Element
const modal = document.getElementById("modal") as HTMLDivElement;
// Tasks array
const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
// Form Inputs
const taskTitle = document.getElementById("taskTitle") as HTMLInputElement;
const taskDeadline = document.getElementById("taskDeadline") as HTMLInputElement;
const taskLabel = document.getElementById("taskLabel") as HTMLInputElement;
const taskStatus = document.getElementById("taskStatus") as HTMLSelectElement;
// Add Task button
const addTaskButton = document.getElementById("addTask") as HTMLButtonElement;
// Close modal button
const closeModalButton = document.getElementById("closeModal") as HTMLButtonElement;
// Task form
const taskForm = document.getElementById("taskForm") as HTMLFormElement;
// Submit button
const submitButton = document.getElementById("submitButton") as HTMLButtonElement;

// Fills tasks array is needed
if (tasks.length === 0) {
    tasks.push(...mockdata.tasks);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Add task button event handler
addTaskButton.addEventListener("click", () => {
    if (submitButton) {
        // Setting dataset of the submit button to avoid double execution of event listener
        submitButton.dataset.submitType = "add";

        if (submitButton.dataset.submitType === "add") {
            // Show modal
            if (modal) {
                modal.style.display = "block";
            }
            // Add submit listener to create the task in the localStorage
            if (taskForm) {
                // Submit form event handler
                taskForm.onsubmit = (event) => {
                    event.preventDefault();

                    const formData = getFormData(taskForm);
                    console.log(formData);
                    
                    const { title, deadline, label, status } = {
                        title: formData.title as string,
                        deadline: formData.deadline as string,
                        label: formData.label as string,
                        status: formData.status as "toDo" | "inProgress" | "done",
                    };

                    taskView.createTask(title, deadline, label, status);

                    // Close the modal
                    if (modal) {
                        modal.style.display = "none";
                    }
                    // Clear the task form inputs
                    if (taskForm) {
                        (taskForm as HTMLFormElement).reset();
                    }
                };
            }
        }
    }
});

// Close modal button event handler
closeModalButton.addEventListener("click", () => {
    taskTitle.value = "";
    taskDeadline.value = "";
    taskStatus.value = "toDo";
    taskLabel.value = "";
    modal.style.display = "none";
});

// Render tasks
taskView.renderCards();
