import { Injectable } from '@angular/core';
import * as alertifyjs from 'alertifyjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor() {}
  /**
   * This function in for Display confirmation alerts with two buttons ok and cancle
   * @param title :This will use as a title of your alert.
   * @param body :This will  be use as a description of your alert.
   * @param okFunction :If you press ok then this function will call.
   * @param arg :Argument for that function in json format
   */
  ShowConfirm(title:string,body:string,okFunction:any,arg:any){
    alertifyjs.confirm(title,body,function(){
      okFunction(arg);
    },function(){
    }).set({'transition':'pulse','movable':false,'closable': false,'closableByDimmer': false, 'labels': {ok:'Confirm', cancel:'Cancel'}})
  }
  /**
   * This function is for display normal alert with single Ok button
   * @param title :This will use as a title of your alert.
   * @param body :This will  be use as a description of your alert
   */
  ShowAlert(title:string,body:string){
    alertifyjs.alert(title,body,function(){
     }).set({'transition':'pulse','movable':false,'closable': false,'closableByDimmer': false})
  }
}
