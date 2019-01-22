import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  public weeks: {days: string[]}[] = [];
  public curentYear: number;
  public curentMonth: number;
  public curentMonthName: string;

  @Output() public clickValue: EventEmitter<string> = new EventEmitter;

  public constructor() { }

  public ngOnInit(): void {
    this.writeWeeks(2019, 0);
  }

  public clickOnDate(td: string): void {
   this.clickValue.emit({year: `${this.curentYear}`, month: `${this.getMonthName(this.curentMonth)}`, date: `${td}`});
  }

  public changeYear(changeYearValue: number): void {
  this.curentYear += changeYearValue;
  this.weeks = [];
  this.writeWeeks(this.curentYear, this.curentMonth);
  }

  public changeMonth(changeMonthValue: number): void {
    this.curentMonth += changeMonthValue;
    if (this.curentMonth === 12) {this.curentMonth = 0; this.curentYear++; }
    if (this.curentMonth < 0) {this.curentMonth = 11; this.curentYear--; }
    this.weeks = [];
    this.writeWeeks(this.curentYear, this.curentMonth);
    }

  private getMonthName(index: number): string {
    return ['January', 'February', 'March', 'April', 'May', 'June', 'July',
      'August', 'September', 'October', 'November', 'December'][index];
  }

  public writeWeeks(year: number, month: number): void {
    const date: Date = new Date(year, month);
    this.curentYear = year;
    this.curentMonth = month;
    this.curentMonthName = this.getMonthName(month);
    while (date.getMonth() === month) {
      const week: { days: string[] } = { ...{ days: [] } };

      for (let i: number = 1; i < 8; i++) {
        let amountEmpty: number = date.getDay();
        amountEmpty = amountEmpty ? amountEmpty : 7;

        if (amountEmpty !== i || date.getMonth() !== month) {
          week.days.push('');
        } else {
          week.days.push(`${date.getDate()}`);
          date.setDate(date.getDate() + 1);
        }
      }
      this.weeks.push(week);
    }
  }
}
