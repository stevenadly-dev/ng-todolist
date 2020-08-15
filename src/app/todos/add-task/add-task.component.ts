import { TodoServicesService } from "src/app/shared/services/todo-services.service";
import { Component, OnInit, Input } from "@angular/core";
import { Subscription } from "rxjs";

@Component({
  selector: "app-add-task",
  templateUrl: "./add-task.component.html",
  styleUrls: ["./add-task.component.scss"],
})
export class AddTaskComponent implements OnInit {
  addTaskSubscription: Subscription;
  task: string;
  isLoadingAddTask: boolean;
  @Input() todoList: any[];
  constructor(private todoService: TodoServicesService) {}

  addTask() {
    this.isLoadingAddTask = true;

    this.addTaskSubscription = this.todoService
      .AddTask({
        description: this.task,
      })
      .subscribe(
        (res: any) => {
          this.isLoadingAddTask = false;
          console.log("added task ", res);
          this.task = "";
          this.todoList.push(res["data"]);
        },
        (err) => {
          console.log("adding task error", err);
        }
      );
  }

  ngOnInit(): void {}
  ngOnDestroy(): void {
    this.addTaskSubscription?.unsubscribe();
  }
}
