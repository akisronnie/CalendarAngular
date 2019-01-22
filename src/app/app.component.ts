import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public isShowTodo: boolean = false;
  public myNotes: {} = {};
  public selectedDate: {year: string; month: string; date: string};
  public selectedNote:[] = [];
  private key: string;
  public clickOnDate(date): void {
    this.selectedDate = date;
    console.log(date);
    if ((Number(date.date) !== 0)) {
      this.isShowTodo = true;
     } else {
       this.isShowTodo = false;
     }
     this.key = `${date.year}${date.month}${date.date}`;
     this.selectedNote = this.myNotes.hasOwnProperty(this.key) ? this.myNotes[this.key] : [];
    }

  public changeInput(event): void {
    console.log(event)
    this.selectedNote = event;
    this.myNotes[this.key] = event;
    console.log(this.myNotes)
  }
}

 
  // public changeInput(event): void {
  // const findItem: string = `${this.selectedDate.year}${this.selectedDate.month}${this.selectedDate.date}`;
  // if (this.myNotes.hasOwnProperty(findItem)) {
  //   this.myNotes[findItem].push(event);
  // console.log(this.myNotes);
  // }

// }
