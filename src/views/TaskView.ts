import TaskController from "../controllers/TaskController";
import mockdata from '../../mockdata/tasks.json' assert { type: 'json' };

// Function to initialize and render task cards when the page loads
document.addEventListener('DOMContentLoaded', function () {
    console.log('ayuda');
    
});

class TaskView {
    private taskController = new TaskController();

    renderCards() {
        console.log('test');
        
        this.taskController.renderExistingTaskCards()
    }
}

const taskView = new TaskView()

// Tasks array
const tasks = JSON.parse(localStorage.getItem('tasks') || "[]")

if (tasks.length === 0) {
    tasks.push(...mockdata.tasks)
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

console.log('test!!!');


