import { Routes } from "@angular/router";
import { AuthGuard } from "./guards/auth.guard";
export const routes: Routes = [
  {
    path: "",
    loadComponent: () =>
      import("./pages/login/login.component").then((mod) => mod.LoginComponent),
  },
  {
    path: "user",
    loadComponent: () =>
      import("./pages/user/user.component").then((mod) => mod.UserComponent),
    canActivate: [AuthGuard],
  },
  {
    path: "admin",
    loadComponent: () =>
      import("./pages/admin/admin.component").then((mod) => mod.AdminComponent),
    canActivate: [AuthGuard],
  },
];
