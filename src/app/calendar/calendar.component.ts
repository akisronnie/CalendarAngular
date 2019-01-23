import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

type TDate = {
  year: string;
  month: string;
  date: string
};
type TDay = {
  value: string;
  isActive: boolean;
  currentDay: boolean
};

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  public weeks: { days: TDay[] }[] = [];
  public curentYear: number;
  public curentMonth: number;
  public curentMonthName: string;
  public date: Date;

  private dateOfNow: Date = new Date();
  private nameOfMonth: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
  'August', 'September', 'October', 'November', 'December'];

  @Input() public myNotes: {};
  @Output() public clickValue: EventEmitter<{}> = new EventEmitter;


  public ngOnInit(): void {
    this.writeWeeks(2019, 0);
  }

  public clickOnDate(td: TDay): void {

    const selectedDate: TDate = { year: `${this.curentYear}`, month: `${this.getMonthName(this.curentMonth)}`, date: `${td.value}` };
    this.clickValue.emit(selectedDate);
    this.weeks.forEach((week: { days: [] }) => {
      week.days.forEach((day: TDay) => {
        const myKey: string = `${this.date.getFullYear()}${this.getMonthName(this.date.getMonth() - 1)}${day.value}`;

        if (this.myNotes[myKey] !== undefined && this.myNotes[myKey].length > 0) {
          day.isActive = true;
        } else {
          day.isActive = false;
        }

      });
    });
    if (td.value !== '') {
      td.isActive = true;
    }
  }

  public changeYear(changeYearValue: number): void {
    this.curentYear += changeYearValue;
    this.writeWeeks(this.curentYear, this.curentMonth);
  }

  public changeMonth(changeMonthValue: number): void {
    this.curentMonth += changeMonthValue;

    if (this.curentMonth === 12) {
      this.curentMonth = 0;
      this.curentYear++;
    }

    if (this.curentMonth < 0) {
      this.curentMonth = 11;
      this.curentYear--;
    }


    this.writeWeeks(this.curentYear, this.curentMonth);
  }

  public writeWeeks(year: number, month: number): void {
    const date: Date = new Date(year, month);
    let currentDay: boolean = false;
    this.curentYear = year;
    this.curentMonth = month;
    this.curentMonthName = this.getMonthName(month);
    this.weeks = [];

    while (date.getMonth() === month) {
      const week: { days: TDay[] } = { ...{ days: [] } };

      for (let i: number = 1; i < 8; i++) {
        let amountEmpty: number = date.getDay();
        amountEmpty = amountEmpty ? amountEmpty : 7;
        currentDay = false;

        if (this.dateOfNow.getMonth() === date.getMonth() && this.dateOfNow.getDate() === date.getDate() &&
          this.dateOfNow.getFullYear() === date.getFullYear()) {
          currentDay = true;
        }

        if (amountEmpty !== i || date.getMonth() !== month) {
          week.days.push({ value: '', isActive: false, currentDay });
        } else {
          const myKey: string = `${date.getFullYear()}${this.getMonthName(date.getMonth())}${date.getDate()}`;
          let isActive: boolean = false;

          if (this.myNotes[myKey] !== undefined && this.myNotes[myKey].length > 0) {
            isActive = true;
          } else {
            isActive = false;
          }

          week.days.push({ value: `${date.getDate()}`, isActive, currentDay });
          date.setDate(date.getDate() + 1);
        }
      }
      this.weeks.push(week);
      this.date = date;
    }
  }

  private getMonthName(index: number): string {
    return this.nameOfMonth[index];
  }
}
