import { Component, Output, EventEmitter, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})

export class TodoComponent {
  @Input() public selectedDateToShow: TDate;
  @Input() public selectedNotes: TNote[];
  @Input() public isNewNote: boolean = true;
  @Output() public changeSelectedNotes: EventEmitter<TNote[]> = new EventEmitter;

  @ViewChild('inputForm') public inputForm: ElementRef;

  public positionForId: number = 0;
  public editField: string;
  public editOneNote: TNote;


  public changeRedact(): void {
    if (this.isNewNote) {
      this.selectedNotes.forEach((note: { id: number }) => {
        if (note.id > this.positionForId) {
          this.positionForId = note.id + 1;
        }
      });

      this.selectedNotes.push({ text: this.editField, success: false, id: this.positionForId });

    } else {
      this.editOneNote.text = this.editField;
      this.isNewNote = true;
    }

    this.changeSelectedNotes.emit(this.selectedNotes);
    this.editField = '';
  }

  public changeNote(note: TNote): void {
    this.editField = note.text;
    this.editOneNote = note;
    this.isNewNote = false;
    this.inputForm.nativeElement.focus();
  }

  public deleteElem(deletedElement: TNote): void {
    this.selectedNotes = this.selectedNotes.filter((list: TNote) => list !== deletedElement);
    this.changeSelectedNotes.emit(this.selectedNotes);
  }

  public checkInput(key: { success: boolean }): void {
    key.success = !key.success;
    this.changeSelectedNotes.emit(this.selectedNotes);
  }
}

