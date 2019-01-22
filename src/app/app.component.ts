import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public isShowTodo: boolean = false;
  public myNotes: {}[];
  public selectedDate: {year: string, month: string, date: string};

  public clickOnDate(date: {year: string, month: string, date: string}): void {
    this.selectedDate = date;
    if ((Number(date.date) !== 0)) {
      this.isShowTodo = true;
     } else {
       this.isShowTodo = false;
     }

  }


  public changeInput(event): void {
  const findItem: string = `${this.selectedDate.year}${this.selectedDate.month}${this.selectedDate.date}`;

  // this.myNotes.some(findItem);
  }

}

