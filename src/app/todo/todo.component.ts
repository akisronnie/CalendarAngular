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
  public inputField: string;
  public editOneNote: TNote;


  public changeField(): void {
    if (this.isNewNote) {
      this.selectedNotes.forEach((note: TNote) => {
        if (note.id > this.positionForId) {
          this.positionForId = note.id + 1;
        }
      });

      this.selectedNotes.push({ text: this.inputField, success: false, id: this.positionForId });

    } else {
      this.editOneNote.text = this.inputField;
      this.isNewNote = true;
    }

    this.changeSelectedNotes.emit(this.selectedNotes);
    this.inputField = '';
  }

  public editNote(note: TNote): void {
    this.inputField = note.text;
    this.editOneNote = note;
    this.isNewNote = false;
    this.inputForm.nativeElement.focus();
  }

  public deleteNote(deletedElement: TNote): void {
    this.selectedNotes = this.selectedNotes.filter((list: TNote) => list !== deletedElement);
    this.changeSelectedNotes.emit(this.selectedNotes);
  }

  public toggleSuccessNote(note: TNote): void {
    note.success = !note.success;
    this.changeSelectedNotes.emit(this.selectedNotes);
  }
}

