import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedVarsService } from "../../SharedServices/shared-vars.service";
import { SharedServicesService } from "../../SharedServices/shared-services.service";
import { TodosTableComponent } from "../../components/todos-table/todos-table.component";
import { FormsModule } from "@angular/forms";

interface todoType {
  id: number;
  task: string;
  status: string;
  priority: string;
  username: string;
}

@Component({
  selector: "app-user",
  standalone: true,
  imports: [CommonModule, TodosTableComponent, FormsModule],
  templateUrl: "./user.component.html",
  styleUrl: "./user.component.scss",
})
export class UserComponent implements OnInit {
  constructor(
    private sharedServ: SharedServicesService,
    private sharedVars: SharedVarsService
  ) {}
  username: string = "";
  role: string = "";
  todos: todoType[] = [];
  currentTask: string = "";
  currentPriority: string = "";
  currentStatus: string = "";

  ngOnInit(): void {
    if (typeof window !== "undefined" && window.localStorage) {
      if (typeof window !== "undefined" && window.localStorage) {
        const userCredentials = localStorage.getItem("userCredentials");
        if (userCredentials) {
          try {
            const parsedCredentials = JSON.parse(userCredentials); // Parse the string
            if (parsedCredentials?.role) {
              this.username = parsedCredentials.username;
              this.role = parsedCredentials.role;
            }
          } catch (error) {
            console.error("Error parsing user credentials:", error);
          }
        }
      }
    }
    this.fetchTodods();
  }

  async fetchTodods() {
    const reqBody = { role: this.role, username: this.username };
    const todosResponse = await this.sharedServ.postData(reqBody, "todos");
    if (todosResponse.success) {
      this.todos = todosResponse.data[0];
      console.log(this.todos);
    } else {
      console.error("Failed to fetch todos", todosResponse);
    }
  }

  // New Todo Functions ........................
  async onAddTodo() {
    const newTodo: any = {
      task: this.currentTask,
      status: "Pending",
      priority: this.currentPriority,
      username: this.username,
    };
    if (this.currentTask === "") {
      this.sharedServ.ShowAlert("Validation Error", "Enter Your Task!");
      return;
    }
    if (this.currentStatus === "") {
      this.sharedServ.ShowAlert("Validation Error", "Please Choose Status!");
      return;
    }
    if (this.currentPriority === "") {
      this.sharedServ.ShowAlert("Validation Error", "Please Choose Priority!");
      return;
    }

    let resp = await this.sharedServ.postData(newTodo, "todos/new-todo");
    this.fetchTodods();
  }
}
