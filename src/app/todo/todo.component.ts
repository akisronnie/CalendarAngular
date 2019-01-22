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
  @Input() public selectedNote: {id: number; text:string; succsess: boolean}[];
  @Output() public changedInput: EventEmitter<{}[]> = new EventEmitter;


  public changeInput(): void {
    this.selectedNote.forEach((note) => {
      if (note.id>this.position) {
        this.position = note.id+1;
      }
    });
    
    console.log( this.selectedNote)
    this.selectedNote.push({ text: this.inputNewTask, succsess: false, id: this.position });
    this.changedInput.emit(this.selectedNote);
     this.position++;
     this.inputNewTask = '';
   }


  deleteElem(deletedElement): void {
    this.selectedNote = this.selectedNote.filter((list) => {
      if (list !== deletedElement) {

        return list;
      }
    });
    this.changedInput.emit(this.selectedNote);
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

