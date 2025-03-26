export default class TaskModel {
    id: string;
    title: string;
    deadline: Date;
    label: string;
    status: "toDo" | "inProgress" | "done" = "toDo";

    constructor(id: string, title: string, deadline: Date, label: string, status: "toDo" | "inProgress" | "done") {
        this.id = id;
        this.title = title;
        this.deadline = deadline;
        this.label = label;
        this.status = status;
    }
}
