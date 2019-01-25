import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  @Input() public myNotes: {};
  @Output() public clickValue: EventEmitter<{}> = new EventEmitter;

  public weeks: { days: TDay[] }[] = [];
  public currentYear: number;
  public currentMonth: number;
  public currentMonthName: string;
  public date: Date;


  private _dateOfNow: Date = new Date();
  private _nameOfMonth: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
  'August', 'September', 'October', 'November', 'December'];

  public ngOnInit(): void {
    this.writeWeeks(2019, 0);
  }

  public clickOnDate(td: TDay): void {

    const selectedDate: TDate = { year: `${this.currentYear}`, month: `${this.getMonthName(this.currentMonth)}`, date: `${td.value}` };

    if (Number(selectedDate.date) !== 0) {
      this.clickValue.emit(selectedDate);
    }

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
    this.currentYear += changeYearValue;
    this.writeWeeks(this.currentYear, this.currentMonth);
  }

  public changeMonth(changeMonthValue: number): void {
    this.currentMonth += changeMonthValue;

    if (this.currentMonth === 12) {
      this.currentMonth = 0;
      this.currentYear++;
    }

    if (this.currentMonth < 0) {
      this.currentMonth = 11;
      this.currentYear--;
    }

    this.writeWeeks(this.currentYear, this.currentMonth);
  }

  public writeWeeks(year: number, month: number): void {
    const date: Date = new Date(year, month);
    let currentDay: boolean = false;
    this.currentYear = year;
    this.currentMonth = month;
    this.currentMonthName = this.getMonthName(month);
    this.weeks = [];

    while (date.getMonth() === month) {
      const week: { days: TDay[] } = { ...{ days: [] } };

      for (let i: number = 1; i < 8; i++) {
        let amountEmpty: number = date.getDay();
        amountEmpty = amountEmpty ? amountEmpty : 7;
        currentDay = false;

        if (this._dateOfNow.getMonth() === date.getMonth() && this._dateOfNow.getDate() === date.getDate() &&
          this._dateOfNow.getFullYear() === date.getFullYear()) {
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
    return this._nameOfMonth[index];
  }
}