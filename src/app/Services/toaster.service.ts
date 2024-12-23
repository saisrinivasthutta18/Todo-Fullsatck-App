import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class ToasterService {
  public innerWidth: any;
  toastId: any;
  errToastId: any;
  errToastDisplay:boolean =  true;
  //in case the below value changes make sure to change it to same
  //value in shared-services as well in line
  //ToastrModule.forRoot({ timeOut: 800 })
  toastTimer: number = 800;

  constructor(private toastr:ToastrService) {
    this.innerWidth = window.innerWidth;
    this.toastId = null;
    this.errToastId = null;
    this.errToastDisplay = false;
  }

  //this will prevent multiple toasts from appearing when making multiple requests.
  //In case there is a non success toast, it wont disappear.
  clearExistingToasts(errToast: boolean) {
    if (this.toastId) {
      this.toastr.remove(this.toastId);
    }
    if (errToast) {
      this.errToastDisplay = true;
      if (this.errToastId) {
        setTimeout(() => { this.errToastDisplay = false; }, this.toastTimer);
        this.toastr.remove(this.errToastId);
      }
    }
  }

  //This Function is use for display success toaster
  SuccessToast(){
    //do not display success toast if there is an error toast displayed!
    if (!this.errToastDisplay) {
      this.clearExistingToasts(false);
      if(this.innerWidth <= 450){
        this.toastId = this.toastr.success('Success','',{positionClass:"toast-top-right"}).toastId;
      }
      else{
        this.toastId = this.toastr.success('Success').toastId;
      }
    }
  }
  //This Function is use for display error toaster
  ErrorToast(){
    this.clearExistingToasts(true);
    if(this.innerWidth <= 450){
      this.errToastId = this.toastr.error('Error','',{positionClass:"toast-top-right"}).toastId;
    }
    else{
      this.errToastId = this.toastr.error('Error').toastId;
    }
  }
  //This Function is use for display information toaster
  InfoToast(infoMessage:any){
    this.clearExistingToasts(true);
    if(this.innerWidth <= 450){
      this.errToastId = this.toastr.info(infoMessage,'Info',{positionClass:"toast-top-right", timeOut: 1000}).toastId;
    }
    else{
      this.errToastId = this.toastr.info(infoMessage, 'Info', {timeOut: 1000}).toastId;
    }
  }
  //This Function is use for display warning toaster
  WarningToast(){
    this.clearExistingToasts(true);
    if(this.innerWidth <= 450){
      this.errToastId = this.toastr.warning('Warning','',{positionClass:"toast-top-right"}).toastId;
    }
    else{
      this.errToastId = this.toastr.warning('Warning').toastId;
    }
  }
}
