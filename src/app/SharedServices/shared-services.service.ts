import { Injectable } from '@angular/core';
import { AlertService } from '../Services/alert.service';
import { HttpService } from '../Services/http.service';
import { LoaderService} from '../Services/loader.service';
import { ToasterService } from '../Services/toaster.service';
import { Router } from '@angular/router';
import { SharedVarsService } from './shared-vars.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SharedServicesService {
  fileExtnToFileTypeMap:any = {
    'xlsx':'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'gif':'image/gif',
    'png':'image/png',
    'jpeg':'image/jpeg',
    'csv': 'text/csv',
    'pdf':'application/pdf',
    'txt':'text/plain',
    'pptx':'application/vnd.openxmlformats-officedocument.presentationml.presentation'
  }
  ErrorStr:any;
  constructor(
    private http: HttpService,
    private aletServ: AlertService,
    private loaderServ: LoaderService,
    private toastServ: ToasterService,
    private router: Router,
    private sharedVar: SharedVarsService,
  ) { }

/**Show alert with buttons  */
/**
 *
 * @param title alert header
 * @param body alert body
 * @param okFunction fuction call on ok click
 * @param arg this key word and req body
 */
  ShowConfirm(title: string, body: string, okFunction: any, arg: any) {
    this.aletServ.ShowConfirm(title, body, okFunction, arg);
  }


/**Show alert */
/**
 *
 * @param title alert header
 * @param body alert body
 */

  ShowAlert(title: string, body: string) {
    this.aletServ.ShowAlert(title, body);
  }
  /**This function use to show loader*/
  showLoader() {
    this.loaderServ.showLoader();
  }
  /**This function use to hide loader*/
  hideLoader() {
    this.loaderServ.hideLoader();
  }
  /**This function use to show success toaster*/
  SuccessToast() {
    this.toastServ.SuccessToast();
  }
  /**This function use to show error toaster*/
  ErrorToast() {
    this.toastServ.ErrorToast();
  }
  /**This function use to show info toaster*/
  InfoToast(message:any) {
    this.toastServ.InfoToast(message);
  }
  /**This function use to show warning toaster*/
  WarningToast() {
    this.toastServ.WarningToast();
  }
 /**
  * This function use to get blobfile from backend like pdf,excel
  * @param rBody {request body}
  * @param route backend route
  * @returns
  */
  public async getBlob(rBody: any, route: any): Promise<any> {
    try {
      let res = await this.http.getBlob(rBody, route).toPromise();
      return res;
    } catch (error) {
      return error;
    }
  }
  /**This function use to handle error of network request*/
  httpErrhandler(err: any) {
    if (err) {
      let count = 0;
      for (let key in err) {
        if (key == 'errors') {
          for (let key2 in err[key]) {
            this.aletServ.ShowAlert('Validation Error', err[key][key2][0]);
            return;
          }
        }
      }
    }
    if (err.message) this.aletServ.ShowAlert('Error', err.message);
    else {
      this.aletServ.ShowAlert('Error', 'Please check your network connection.');
    }
  }
 /**
  * This function use to make post request to backend with loader
  * @param rBody {request body}
  * @param route backend route
  * @returns
  */
  async postData(rBody: any, Route: any) {
    this.showLoader();
    try {
      const res = await (
        await this.http.post(rBody, Route)
      ).toPromise();
      if (res.error && res.error.ErrorCode) {
        if (res.error.ErrorCode == 401) {
          this.errorHandler(res)
          this.sharedVar.clearSessionDetails('');
          this.router.navigate(['/']);//Redirect to login page
          this.hideLoader();
          return res;
        }
      }
      if (res.success == false) {
        this.ErrorToast();
        this.errorHandler(res);
        this.hideLoader();
        return res;
      }
      this.hideLoader();
      this.SuccessToast();
      return res;
    } catch (err) {
      this.ErrorToast();
      this.httpErrhandler(err);
      this.hideLoader();
      return {success:false};
    }
  }
 /**
  * This function use to make post request to backend without loader
  * @param rBody {request body}
  * @param route backend route
  * @returns
  */
  async PostDataWithouLoader(rBody: any, Route: any) {
    try {
      const res = await (
        await this.http.post(rBody, Route)
      ).toPromise();
      if (res.error && res.error.ErrorCode) {
        if (res.error.ErrorCode == 401) {
          this.errorHandler(res)
          this.sharedVar.clearSessionDetails('');
          this.router.navigate(['/']);
          this.hideLoader();
          return res;
        }
      }
      if (res.success == false) {
        this.ErrorToast();
        this.errorHandler(res);
        return res;
      }
      return res;
    } catch (err) {
      this.ErrorToast();
      this.httpErrhandler(err);
      return {success:false};
    }
  }

  /**
   *This function helps to download files from backend
   * @param reqBody {request body JSON}
   * @param route backend route like '/getfile
   * @param filename 'file name eg. himalayan.jpg'
   * @param fileType 'file extension eg. jpg,png,svg'
   */
  async downloadFile(reqBody: any, route: any, filename: any, fileType: string) {
    this.showLoader()
    this.http
      .getBlob(
        reqBody,
        route
      )
      .subscribe(
        (response: any) => {
          // Create a Blob URL for the file data
          let typeForExport = this.fileExtnToFileTypeMap[fileType];
          const blob = new Blob([response], {
            type: typeForExport  // Add more file types as needed
          });

          const url = window.URL.createObjectURL(blob);

          // Create a link element to trigger the download
          const link = document.createElement('a');
          link.href = url;
          const dateFullStr = filename + '.' + fileType; // Update file extensions accordingly
          link.download = dateFullStr;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          this.hideLoader()
        },
        (error: any) => {
          // Handle the error in your component
          console.error(error);
          this.hideLoader()
        }
      );
  }

  /**
   *
   * @param res response
   * error handler function
   */
  async errorHandler(res:any){
    this.ErrorStr=this.sharedVar.GetLocalStorage('user');
    if(this.ErrorStr && this.ErrorStr.language && environment.languageSelection){
      this.ShowAlert('Error', res.error[this.ErrorStr.language]);
    }
    else{
      this.ShowAlert('Error', res.error.English);
    }
  }
}
