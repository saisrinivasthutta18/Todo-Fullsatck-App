import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SharedVarsService {

  /* Session Variables
  1. login_user - user detais from login page
  */

  constructor() { }

  /* Please follow the naming convenion as pageName_key while setting key*/
  /**This function helps to store data in session storage */
  /**
   *
   * @param key on this key details store in session storage
   * @param val stored value
   */
  public setSessionDetails(key: string, val: any){
    sessionStorage.setItem(key, val);
     let pcoreview_vars  = JSON.parse(sessionStorage.getItem(environment.storageKey) || '{}');
     pcoreview_vars[key] = val;
     sessionStorage.setItem(environment.storageKey, JSON.stringify(pcoreview_vars));
    }
  /**This function helps to get string data from session storage */
    /**
   *
   * @param key on this key details store in session storage will get
   */
   public getSessionDetails(key: string){
    return sessionStorage.getItem(key);
   }
  /**This function helps to get object  data from session storage */
   /**This function helps to get string data from session storage */
    /**
   *
   * @param key on this key details store in session storage will get
   */
   public getSessionDetailsObj(key: string){
    return JSON.parse(sessionStorage.getItem(key) || 'null');
   }
  /**This function helps to clear data from session storage */
    /**
   *
   * @param key on this key details store in session storage will clear
   */
   public clearSessionDetails(key: string){
    if(key){
      sessionStorage.removeItem(key);
    }else{
    let pcoreview_vars = JSON.parse(sessionStorage.getItem(environment.storageKey) || '{}');
    for(let key in pcoreview_vars){
      sessionStorage.removeItem(key);
    }
    sessionStorage.removeItem(environment.storageKey);
  }
 }
  /**This function helps to clear data from local storage */
     /**
   *
   * @param key on this key details store in local storage will clear
   */
  public clearLocalStorageDetails(key: string){
    if(key){
      localStorage.removeItem(key);
    }else{
    let soc_med_vars = JSON.parse(localStorage.getItem(environment.storageKey) || '{}');
    for(let key in soc_med_vars){
      localStorage.removeItem(key);
    }
    localStorage.removeItem(environment.storageKey);
  }
  }
   /**This function helps to set data in local storage */
   /**
   *
   * @param key on this key details store in local storage
   */
  public setLocalStorageDetails(key: string, val: any){
    localStorage.setItem(key, val);
    let soc_med_vars  = JSON.parse(localStorage.getItem(environment.storageKey) || '{}');
    soc_med_vars[key] = val;
    localStorage.setItem(environment.storageKey, JSON.stringify(soc_med_vars));
  }

      /**This function helps to set data in local storage */
  public GetLocalStorage(key: string){
   let resp = localStorage.getItem(key);
   resp=JSON.parse(resp|| 'null')
   return resp;
  }

}
