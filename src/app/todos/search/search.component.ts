import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
})
export class SearchComponent implements OnInit {
  searchValue: string;
  @Output() searchOutput: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
    this.searchValue = "";
  }
  search() {
    this.searchOutput.emit(this.searchValue);
  }

  ngOnInit(): void {}
}
