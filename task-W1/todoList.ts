export type Task = {
  id: number;
  title: string;
  isDone: boolean;
};

export interface IToDoList {
  addTask(title: string): Task;
  showTasks(): Task[];
  filter(fn: (task: Task) => boolean): Task[];
  deleteTask(id: number): void;
  changeStatus(id: number, status: boolean): void;
  search(text: string): Task[];
}

export class ToDoList implements IToDoList {
  private tasks: Task[] = [];
  private nextId: number = 1;

  addTask(title: string): Task {
    const task: Task = { id: this.nextId++, title, isDone: false };
    this.tasks.push(task);
    return task;
  }

  showTasks(): Task[] {
    return [...this.tasks];
  }

  filter(fn: (task: Task) => boolean): Task[] {
    return this.tasks.filter(fn);
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }

  changeStatus(id: number, status: boolean): void {
    const task = this.tasks.find(task => task.id === id);
    if (task) {
      task.isDone = status;
    }
  }

  search(text: string): Task[] {
    const lowerText = text.toLowerCase();
    return this.tasks.filter(task => task.title.toLowerCase().includes(lowerText));
  }
} 
