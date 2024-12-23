import { Component, input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { SharedVarsService } from "../../SharedServices/shared-vars.service";
import { SharedServicesService } from "../../SharedServices/shared-services.service";
import { environment } from "../../../environments/environment";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

interface UserCredentialType {
  Name: string;
  Role: string;
  Id: Number;
}

@Component({
  selector: "app-login",
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.scss",
})
export class LoginComponent implements OnInit {
  username: string = "";
  password: string = "";
  loginError: string = "";
  UserType: string = "";

  //Path to asset folder
  ENVar: any = environment;
  constructor(
    private router: Router,
    private sharedServ: SharedServicesService,
    private sharedVars: SharedVarsService
  ) {}
  /**
   * this function call on page load.
   */
  async ngOnInit() {
    this.sharedVars.clearLocalStorageDetails("");
    this.sharedVars.clearSessionDetails("");
    if (typeof window !== "undefined" && window.localStorage) {
      if (typeof window !== "undefined" && window.localStorage) {
        const userCredentials = localStorage.getItem("userCredentials");
        if (userCredentials) {
          try {
            const parsedCredentials = JSON.parse(userCredentials); // Parse the string
            if (parsedCredentials?.role) {
              this.router.navigate([`/${parsedCredentials.role}`]); // Access the 'role' property
            }
          } catch (error) {
            console.error("Error parsing user credentials:", error);
          }
        }
      }
    }
  }

  async onSubmit() {
    /**
     * validation check
     */
    if (this.UserType === "") {
      this.sharedServ.ShowAlert("Validation Error", "Please Select User Type!");
      return;
    }
    if (!this.username || this.username === "") {
      this.sharedServ.ShowAlert("Validation Error", "Please Enter User Name!");
      return;
    }
    if (!this.password || this.password.length < 6) {
      this.sharedServ.ShowAlert("Validation Error", "Please Enter Password!");
      return;
    }
    /**
     * Network request
     */
    let resp = await this.sharedServ.postData(
      { username: this.username, password: this.password },
      "login"
    );
    if (resp.success) {
      let obj = {
        username: resp.data.Name,
        role: resp.data.Role,

        id: resp.data.Id,
      };
      this.sharedVars.setLocalStorageDetails(
        "userCredentials",
        JSON.stringify(obj)
      );
      this.router.navigate([`${obj.role}`]);
    }
  }
}
