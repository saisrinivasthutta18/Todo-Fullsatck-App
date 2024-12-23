import { Component } from "@angular/core";
import { TodosTableComponent } from "../../components/todos-table/todos-table.component";
import { SharedServicesService } from "../../SharedServices/shared-services.service";
import { SharedVarsService } from "../../SharedServices/shared-vars.service";

interface todoType {
  id: number;
  task: string;
  status: string;
  priority: string;
  username: string;
}
@Component({
  selector: "app-admin",
  standalone: true,
  imports: [TodosTableComponent],
  templateUrl: "./admin.component.html",
  styleUrl: "./admin.component.scss",
})
export class AdminComponent {
  constructor(
    private sharedServ: SharedServicesService,
    private sharedVars: SharedVarsService
  ) {}
  username: string = "";
  role: string = "";
  todos: todoType[] = [];

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
}
