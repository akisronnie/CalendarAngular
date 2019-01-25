import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {
  @Input() public selectedDate: TDate;
  @Input() public selectedNotes: TNote[];
  @Input() public isShowEditField: boolean;
  @Output() public changedInput: EventEmitter<TNote[]> = new EventEmitter;


  public newTask: string;
  public position: number = 0;
  public editField: string;
  public editNote: TNote;

  public changeInput(): void {

    this.selectedNotes.forEach((note: { id: number }) => {
      if (note.id > this.position) {
        this.position = note.id + 1;
      }
    });

    this.selectedNotes.push({ text: this.newTask, success: false, id: this.position });
    this.changedInput.emit(this.selectedNotes);
    this.newTask = '';
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

  public deleteElem(deletedElement: TNote): void {
    this.selectedNotes = this.selectedNotes.filter((list: TNote) => list !== deletedElement);
    this.changedInput.emit(this.selectedNotes);
  }

  public checkInput(key: { success: boolean }): void {
    key.success = !key.success;
    this.changedInput.emit(this.selectedNotes);
  }
}

