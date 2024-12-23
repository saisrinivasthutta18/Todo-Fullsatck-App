import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { SharedVarsService } from "../../SharedServices/shared-vars.service";
import { SharedServicesService } from "../../SharedServices/shared-services.service";

import { FormsModule } from "@angular/forms";

interface todoType {
  id: number;
  task: string;
  status: string;
  priority: string;
  username: string;
}

@Component({
  selector: "app-todos-table",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./todos-table.component.html",
  styleUrl: "./todos-table.component.css",
})
export class TodosTableComponent implements OnInit {
  @Input() todos: todoType[] = [];
  @Input() userType: string = "";
  @Output() todoDeleted = new EventEmitter<void>();

  constructor(
    private sharedServ: SharedServicesService,
    private sharedVars: SharedVarsService
  ) {}

  filteredTodos: todoType[] = [];
  paginatedTodos: todoType[] = [];
  priorityFilter = "All";
  statusFilter = "All";
  usernameFilter = "All";

  // Pagination state
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 1;

  ngOnInit(): void {
    console.log(this.todos);
  }

  onUserChange() {}

  onStatusChange() {}

  onPriorityChange() {}

  // Reset to the first page whenever filters are applied

  updatePagination() {
    // Calculate total pages
    this.totalPages = Math.ceil(this.filteredTodos.length / this.pageSize);

    // Slice the filtered todos for the current page
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedTodos = this.filteredTodos.slice(startIndex, endIndex);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  async markAsCompleted(todo: todoType) {
    todo.status = "Completed";
    let resp = await this.sharedServ.postData(todo, `/todos-put/${todo.id}`);
    this.todoDeleted.emit();
  }

  async onDeleteTodos(id: number) {
    let resp = await this.sharedServ.postData({}, `todos/${id}`);
    this.todoDeleted.emit();
  }
}
