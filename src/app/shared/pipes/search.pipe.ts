import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "search",
  pure: false,
})
export class SearchPipe implements PipeTransform {
  transform(todos: any[], searchval: string): any {
    if (searchval) {
      debugger;
      searchval = searchval.toUpperCase();
      return todos.filter((c) =>
        c.description.toUpperCase().includes(searchval)
      );
    }
    return todos;
  }
}
