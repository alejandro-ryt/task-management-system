"use strict";
class TaskController {
    constructor(model) {
        this.model = model;
    }
    addTask(id, title, deadline, label, status) {
        const newTask = new TaskModel(id, title, deadline, label, status);
        this.model.push(newTask);
    }
    deleteTask(id) {
        const task = this.model.find((task) => task.id === id);
        console.log(task);
    }
}
