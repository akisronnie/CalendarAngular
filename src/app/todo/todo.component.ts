import { Component, Output, EventEmitter, Input } from '@angular/core';

type TNote = {
  id: number;
  text: string;
  succsess: boolean
};

type TDate = {
  year: string;
  month: string;
  date: string
};

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {
  public inputNewTask: string;
  public position: number = 0;
  public isShowEditField: boolean = true;
  public editField: string;
  public editNote: TNote;

  @Input() public selectedDate: TDate;
  @Input() public selectedNote: TNote[];
  @Output() public changedInput: EventEmitter<TNote[]> = new EventEmitter;


  public changeInput(): void {
    this.selectedNote.forEach((note: { id: number }) => {
      if (note.id > this.position) {
        this.position = note.id + 1;
      }
    });

    this.selectedNote.push({ text: this.inputNewTask, succsess: false, id: this.position });
    this.changedInput.emit(this.selectedNote);
    this.inputNewTask = '';
  }

  public changeNote(note: TNote): void {
    this.isShowEditField = false;
    this.editField = note.text;
    this.editNote = note;
  }

  public changeRedact(): void {
    this.editNote.text = this.editField;
    this.isShowEditField = true;
  }

  public deleteElem(deletedElement: {}): void {
    this.selectedNote = this.selectedNote.filter((list: {}) => list !== deletedElement);
    this.changedInput.emit(this.selectedNote);
  }

  public checkInput(key: { succsess: boolean }): void {
    key.succsess = !key.succsess;
    this.changedInput.emit(this.selectedNote);
  }
}

