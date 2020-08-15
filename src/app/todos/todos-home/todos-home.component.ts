import { Component, OnInit } from "@angular/core";
import { TodoServicesService } from "src/app/shared/services/todo-services.service";
import { Subscription, Observable } from "rxjs";

@Component({
  selector: "app-todos-home",
  templateUrl: "./todos-home.component.html",
  styleUrls: ["./todos-home.component.scss"],
})
export class TodosHomeComponent implements OnInit {
  todoList = <any>[];
  completedtodoList = <any>[];
  notcompletedtodoList = <any>[];
  task: string;
  searchValue: string;
  completeType: string;
  isLoadingAddTask: boolean;
  markAsCompleted: Boolean;
  deleting: Boolean;

  filterFromChild: string;

  getTasksSubscription: Subscription;
  addTaskSubscription: Subscription;
  completeTaskSubscription: Subscription;
  deleteTaskSubscription: Subscription;
  subscriptionArray: Subscription[] = [];

  p: number = 1;
  collection: any[] = [];
  constructor(private todoService: TodoServicesService) {
    // this.completeType = "all";

    this.filterCompletedOrNot("all");
    this.isLoadingAddTask = false;
    this.markAsCompleted = false;
    this.deleting = false;
  }

  getAllTasks() {
    this.getTasksSubscription = this.todoService.getTasks().subscribe(
      (res: any) => {
        console.log("todos-done", res);
        this.todoList = res.data;
      },
      (err) => {
        console.log("get todos error", err);
      }
    );
    this.subscriptionArray.push(this.getTasksSubscription);
  }

  completeTask(id: string) {
    this.markAsCompleted = true;
    this.completeTaskSubscription = this.todoService.completeTask(id).subscribe(
      (res: any) => {
        this.markAsCompleted = false;

        let wantedidex = this.todoList.findIndex((el) => el._id === id);
        this.todoList[wantedidex] = res.data;
        console.log("complete task", res);
        this.returnTasks();
      },
      (err) => {
        console.log("error at complete task ", err);
      }
    );

    this.subscriptionArray.push(this.completeTaskSubscription);
  }

  deleteTask(id: string) {
    this.deleting = true;

    this.deleteTaskSubscription = this.todoService.deleteTask(id).subscribe(
      (res: any) => {
        this.deleting = false;

        console.log("delete res", res);
        let wantedidex = this.todoList.findIndex((el) => el._id === id);
        this.todoList[wantedidex] = res.data;
        this.todoList.splice(wantedidex, 1);
        console.log("deleted task", res);
        this.returnTasks();
      },
      (err) => {
        console.log("error at delete task ", err);
      }
    );

    this.subscriptionArray.push(this.deleteTaskSubscription);
  }

  returnTasks() {
    console.log("=============================tasks", this.todoList);
    return this.todoList;
  }

  // -----------------------add active to btns pipe
  filterCompletedOrNot(type: string) {
    switch (type) {
      case "completed":
        this.completeType = "completed";
        break;

      case "notcompleted":
        this.completeType = "notcompleted";
        break;

      case "all":
        this.completeType = "all";
        break;

      default:
        this.completeType = "all";
        break;
    }
  }

  ngOnInit(): void {
    this.getAllTasks();
  }
  ngOnDestroy(): void {
    this.subscriptionArray.forEach((sub: Subscription) => {
      debugger;
      sub.unsubscribe();
    });
  }
}
