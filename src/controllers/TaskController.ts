class TaskController {
  private model: TaskModel[]
  constructor(model: TaskModel[]) {
    this.model = model
  }

  addTask(
    id: string,
    title: string,
    deadline: Date,
    label: string,
    status: "toDo" | "inProgress" | "done"
  ) {
    
    const newTask = new TaskModel(id, title, deadline, label, status)
    this.model.push(newTask)

  }

  deleteTask(id: string) {
    const task = this.model.find((task) => task.id === id)
    console.log(task)
  }
}
