import { map } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class TodoServicesService {
  tasks = [];
  getTasksHeader: HttpHeaders;

  constructor(private http: HttpClient) {}

  getTasks() {
    this.getTasksHeader = new HttpHeaders().set(
      "Authorization",
      localStorage.getItem("loginToken")
    );

    // debugger;
    return this.http.get("https://api-nodejs-todolist.herokuapp.com/task", {
      headers: this.getTasksHeader,
    });
  }

  // -----------------------------add Task
  AddTask(task) {
    this.getTasksHeader = new HttpHeaders().set(
      "Authorization",
      localStorage.getItem("loginToken")
    );

    return this.http.post(
      "https://api-nodejs-todolist.herokuapp.com/task",
      task,
      {
        headers: this.getTasksHeader,
      }
    );
  }

  completeTask(taskid: string) {
    // debugger;
    this.getTasksHeader = new HttpHeaders().set(
      "Authorization",
      localStorage.getItem("loginToken")
    );

    return this.http.put(
      `https://api-nodejs-todolist.herokuapp.com/task/${taskid}`,
      {
        completed: true,
      },
      {
        headers: this.getTasksHeader,
      }
    );
  }

  deleteTask(taskid: string) {
    // debugger;
    this.getTasksHeader = new HttpHeaders().set(
      "Authorization",
      localStorage.getItem("loginToken")
    );

    return this.http.delete(
      `https://api-nodejs-todolist.herokuapp.com/task/${taskid}`,
      {
        headers: this.getTasksHeader,
      }
    );
  }
}
