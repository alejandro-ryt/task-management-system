import { v4 as uuidv4 } from "uuid";
import TaskModel from "../models/TaskModel";

export default class TaskController {
    // Tasks array
    private tasks = JSON.parse(localStorage.getItem("tasks") || "[]") as TaskModel[];
    // Modal with task inputs
    private modal = document.getElementById("modal");
    // Tasks Form
    private taskForm = document.getElementById("taskForm");

    createCard(id: string, title: string, deadline: Date, label: string) {
        // Defining HTML Strucuture
        const card = document.createElement("article");
        card.id = id;
        card.classList.add("card");

        const heading = document.createElement("h3");
        heading.textContent = title;

        const deadlineParagraph = document.createElement("p");
        deadlineParagraph.textContent = `Complete before: ${new Date(deadline).toDateString()}`;

        const buttonContainer = document.createElement("div");
        buttonContainer.classList.add("buttonContainer");

        const buttonGroup = document.createElement("div");
        const editButton = document.createElement("button");
        editButton.classList.add("editButton");
        editButton.addEventListener("click", () => this.editTask(id));

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("deleteButton");
        deleteButton.addEventListener("click", () => this.deleteTask(id));

        const labelSpan = document.createElement("span");
        labelSpan.classList.add("label");
        labelSpan.textContent = label;

        // Appending elements
        buttonGroup.appendChild(editButton);
        buttonGroup.appendChild(deleteButton);
        buttonContainer.appendChild(buttonGroup);
        buttonContainer.appendChild(labelSpan);

        card.appendChild(heading);
        card.appendChild(deadlineParagraph);
        card.appendChild(buttonContainer);

        // Return the card element so it can be appended to the DOM
        return card;
    }

    renderSingleCard(id: string, title: string, deadline: Date, label: string, status: "toDo" | "inProgress" | "done") {
        const task = new TaskModel(id, title, deadline, label, status);
        const toDoTasksContainer = document.getElementById("toDoTasks") as HTMLDivElement;
        const inProgressTasksContainer = document.getElementById("inProgressTasks") as HTMLDivElement;
        const doneTasksContainer = document.getElementById("doneTasks") as HTMLDivElement;

        switch (task.status) {
            case "toDo":
                toDoTasksContainer.prepend(this.createCard(id, title, deadline, label));
                break;
            case "inProgress":
                inProgressTasksContainer.prepend(this.createCard(id, title, deadline, label));
                break;
            case "done":
                doneTasksContainer.prepend(this.createCard(id, title, deadline, label));
                break;
            default:
                toDoTasksContainer.prepend(this.createCard(id, title, deadline, label));
                break;
        }
    }

    renderExistingTaskCards() {
        this.tasks.forEach((task) => {
            this.renderSingleCard(task.id, task.title, task.deadline, task.label, task.status);
        });
    }

    addTask(title: string, deadline: Date, label: string, status: "toDo" | "inProgress" | "done") {
        let id = uuidv4();
        const newTask = new TaskModel(id, title, deadline, label, status);
        // Updating tasks array
        this.tasks.push(newTask);
        // Removing previous localStorage
        localStorage.removeItem("tasks");
        // Updating localStorage
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
        // Rendering the card
        this.renderSingleCard(id, title, deadline, label, status);
    }

    editTask(id: string) {
        const oldCard = document.getElementById(id)
        const submitButton = document.getElementById("submitButton") as HTMLButtonElement;
        if (submitButton) {
            // Setting dataset of the submit button to avoid double execution of event listener
            submitButton.dataset.submitType = "edit";

            if (submitButton.dataset.submitType === "edit") {
                // Show modal
                if (this.modal) {
                    this.modal.style.display = "block";
                }

                // Form Inputs elements
                const taskTitle = document.getElementById("taskTitle") as HTMLInputElement;
                const taskDeadline = document.getElementById("taskDeadline") as HTMLInputElement;
                const taskLabel = document.getElementById("taskLabel") as HTMLInputElement;
                const taskStatus = document.getElementById("taskStatus") as HTMLSelectElement;

                // Finding and updating values of the inputs
                const taskToEdit = this.tasks.findIndex((task: TaskModel) => task.id === id);
                taskTitle.value = this.tasks[taskToEdit].title;
                taskDeadline.value = new Date(this.tasks[taskToEdit].deadline).toDateString();
                taskStatus.value = this.tasks[taskToEdit].status;
                taskLabel.value = this.tasks[taskToEdit].label;

                // Add submit listener to update the task in the localStorage
                if (this.taskForm) {
                    this.taskForm.onsubmit = (event) => {
                        event.preventDefault();

                        // Update task object with new values from inputs
                        this.tasks[taskToEdit].title = taskTitle.value;
                        this.tasks[taskToEdit].deadline = new Date(taskDeadline.value);
                        this.tasks[taskToEdit].status = taskStatus.value as "toDo" | "inProgress" | "done";
                        this.tasks[taskToEdit].label = taskLabel.value;

                        // Save updated tasks back to localStorage
                        localStorage.setItem("tasks", JSON.stringify(this.tasks));

                        // Remove the old card element from the DOM
                        oldCard?.remove()

                        // Render the new updated task card
                        const { id, title, deadline, label, status } = this.tasks[taskToEdit];
                        this.renderSingleCard(id, title, deadline, label, status);
                        // Close the modal
                        if (this.modal) {
                            this.modal.style.display = "none";
                        }
                    };
                }
            }
        }
    }

    deleteTask(id: string) {
        const elementToRemove = document.getElementById(id)

        // Get the index of the task we want to remove
        const taskIndex = this.tasks.findIndex((task) => task.id === id);

        // Removes the task from the array
        this.tasks.splice(taskIndex, 1);

        // Update localStorage
        localStorage.setItem("tasks", JSON.stringify(this.tasks));

        // Remove the card element from the DOM
        elementToRemove?.remove()
    }
}
