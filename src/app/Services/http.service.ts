import { Injectable, Pipe } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { map, retry, catchError, timeout } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AlertService} from '../Services/alert.service';
@Injectable({
  providedIn: 'root',
})
export class HttpService {
  Result: any = {};
  timeoutVal: number = 15000;
  retryVal: number = 1;
  constructor(private http: HttpClient, private alertService : AlertService) {}
  /**
   * All Network request
   */

  /**
   *
   * @param rBody
   * @param route 'string' Backend route. This function for get request
   * @returns
   */
  public async get(rBody: any, route: any) {
    return this.http.get<any>(`${environment.apiUrl}/${route}`,{withCredentials: true}).pipe(
      timeout(this.timeoutVal),
      retry(this.retryVal),
      map(
        (res) => {
          return res;
        },
        catchError((errVal) => {
          return throwError({
            success: false,
            errHdr: 'Connection error',
            err: errVal.message,
          });
        })
      )
    );
  }

    /**
   *
   * @param rBody
   * @param route 'string' Backend route .This function for post request
   * @returns
   */
  public async post(rBody: any, route: any) {
  return this.http
  .post<any>(`${environment.apiUrl}/${route}`,rBody,{withCredentials: true})
  .pipe(
    timeout(this.timeoutVal),
    retry(this.retryVal),
    map(
      (res) => {
        return res;
      },
      catchError((errVal) => {
        return throwError({
          success: false,
          errHdr: 'Connection error',
          err: errVal.message,
        });
      })
    )
  );
  }

  /**
   *
   * @param rBody
   * @param route this function use to download files from backend
   * @returns
   */
  public async DownloadFiles(rBody: any, route: any) {
    return this.http.get(`${environment.apiUrl}/${route}`, {
        responseType: 'blob',
        withCredentials: true
      })
      .subscribe((res) => {
        const a = document.createElement('a');
        a.setAttribute('style', 'display:none;');
        document.body.appendChild(a);
        a.download = rBody.fileName;
        a.href = URL.createObjectURL(res);
        a.target = '_blank';
        a.click();
        document.body.removeChild(a);
      });
  }
  convertBlobToBase64 = (blob: Blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onerror = reject;

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.readAsDataURL(blob);
  });
  public getBlob(rBody: any, route: any): Observable<any> {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.http.post(`${environment.apiUrl}/${route}`,rBody, {
        headers: headers,
        responseType: 'blob',
        withCredentials: true
      }).pipe(
        catchError((errVal) => {
          if (errVal.err) {
            this.alertService.ShowAlert("Download Error!", errVal.err);
          } else {
            this.alertService.ShowAlert("Download Error!", "unexpected error occurred while downloading!");
          }
          return throwError(errVal);
        })
      );
  }
}
