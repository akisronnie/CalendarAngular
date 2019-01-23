import { Component, Output, EventEmitter, Input } from '@angular/core';
import { notEqual } from 'assert';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {
  public inputNewTask: string;
  public position: number = 0;
  public isShowRedactField: boolean = true;
  public redactField: string;
  public redactNote: { id: number; text: string; succsess: boolean };

  @Input() public selectedDate: {};
  @Input() public selectedNote: { id: number; text: string; succsess: boolean }[];
  @Output() public changedInput: EventEmitter<{}[]> = new EventEmitter;


  public changeInput(): void {
    this.selectedNote.forEach((note: { id: number }) => {
      if (note.id > this.position) {
        this.position = note.id + 1;
      }
    });

    this.selectedNote.push({ text: this.inputNewTask, succsess: false, id: this.position });
    this.changedInput.emit(this.selectedNote);
    this.position++;
    this.inputNewTask = '';
  }

  public changeNote(note: { id: number; text: string; succsess: boolean }): void {
    this.isShowRedactField = false;
    this.redactField = note.text;
    this.redactNote = note;
  }

  public changeRedact(): void {
    this.redactNote.text = this.redactField;
    this.isShowRedactField = true;
  }

  public deleteElem(deletedElement: {}): void {
    this.selectedNote = this.selectedNote.filter((list: {}) => {
      if (list !== deletedElement) {

        return list;
      }
    });
    this.changedInput.emit(this.selectedNote);
  }

  public checkInput(key: { succsess: boolean }): void {
    key.succsess = !key.succsess;
    this.changedInput.emit(this.selectedNote);
  }
}

