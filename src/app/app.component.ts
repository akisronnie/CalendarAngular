import { Component } from '@angular/core';

type TDate = {
  year: string;
  month: string;
  date: string
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public isShowTodo: boolean = false;
  public myNotes: {} = {};
  public selectedDate: TDate;
  public selectedNote: [] = [];

  private key: string;
  private notesFromStorage: string;


  public constructor() {
    this.notesFromStorage = localStorage.getItem('myNotesAngular');
    this.myNotes = this.notesFromStorage ? JSON.parse(this.notesFromStorage) : {};
  }

  public saveInLocalStorage(): void {
    localStorage.setItem('myNotesAngular', JSON.stringify(this.myNotes));
  }

  public clickOnDate(date: { year: string; month: string; date: string }): void {
    this.selectedDate = date;

    this.isShowTodo = Number(date.date) !== 0;

    this.key = `${date.year}${date.month}${date.date}`;
    this.selectedNote = this.myNotes.hasOwnProperty(this.key)
      ? this.myNotes[this.key]
      : [];
    this.saveInLocalStorage();
  }

  public changeInput(event: []): void {
    this.selectedNote = event;
    this.myNotes[this.key] = event;
    this.saveInLocalStorage();
  }
}