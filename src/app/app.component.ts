import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  public isShowTodo: boolean = false;
  public myNotes: TNotes = {};
  public selectedDate: TDate;
  public selectedNotes: TNote[] = [];
  public isShowEditField: boolean = true;

  private _key: string;
  private _notesFromStorage: string;


  public constructor() {
    this._notesFromStorage = localStorage.getItem('myNotesAngular');
    this.myNotes = this._notesFromStorage ? JSON.parse(this._notesFromStorage) : {};
  }

  public saveInLocalStorage(): void {
    localStorage.setItem('myNotesAngular', JSON.stringify(this.myNotes));
  }

  public clickOnDate(date: TDate): void {
    this.selectedDate = date;
    this.isShowTodo = true;
    this.isShowEditField = true;
    this._key = `${date.year}${date.month}${date.date}`;
    this.selectedNotes = this.myNotes.hasOwnProperty(this._key)
      ? this.myNotes[this._key]
      : [];
    this.saveInLocalStorage();
  }

  public changeInput(note: TNote[]): void {
    this.selectedNotes = note;
    this.myNotes[this._key] = note;
    this.saveInLocalStorage();
  }
}
