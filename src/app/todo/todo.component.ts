import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent  {
  public inputNewTask;
  public todoList = [];
  public position = 0;

  @Input() public selectedDate: {};
  @Output() public changedInput: EventEmitter<string> = new EventEmitter;


  deleteElem(deletedEl): void {
    this.todoList = this.todoList.filter((list) => {
      if (list !== deletedEl) {

        return list;
      }
    });
  }

  public changeInput(): void {
    this.changedInput.emit({ text: this.inputNewTask, succsess: false, id: this.position });
    this.todoList.push({ text: this.inputNewTask, succsess: false, id: this.position });
    this.position++;
    this.inputNewTask = '';
  }



  public checkInput(event, key) {
    key.succsess = !key.succsess;

    if (event.target.checked) {
      event.target.nextSibling.style.textDecoration = "line-through";
      event.target.parentNode.style.backgroundColor = "rgb(9, 200, 4)";
    } else {
      event.target.nextSibling.style.textDecoration = "none";
      event.target.parentNode.style.backgroundColor = "#eeeeee";
    }
  }

  clearDone() {
    this.todoList = this.todoList.filter((task) => {
      if (!task.succsess) { return task }
    });
  }

}

