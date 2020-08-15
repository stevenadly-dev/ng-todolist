import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "completedNotCompleted",
  pure: false,
})
export class CompletedNotCompletedPipe implements PipeTransform {
  transform(todos: any[], filterType: string): unknown {
    if (filterType == "completed") {
      return todos.filter((el) => el.completed == true);
    } else if (filterType == "notcompleted") {
      return todos.filter((el) => el.completed == false);
    } else {
      return todos;
    }

    return null;
  }
}
