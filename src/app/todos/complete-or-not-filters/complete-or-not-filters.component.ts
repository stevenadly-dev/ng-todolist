import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";

@Component({
  selector: "app-complete-or-not-filters",
  templateUrl: "./complete-or-not-filters.component.html",
  styleUrls: ["./complete-or-not-filters.component.scss"],
})
export class CompleteOrNotFiltersComponent implements OnInit {
  @Output() filterCompletedOrNotOutput: EventEmitter<string> = new EventEmitter<
    string
  >();
  @Input() completeType: string;
  constructor() {
    this.filterCompletedOrNot("all");
  }
  filterCompletedOrNot(type: string) {
    this.filterCompletedOrNotOutput.emit(type);
  }
  ngOnInit(): void {}
}
