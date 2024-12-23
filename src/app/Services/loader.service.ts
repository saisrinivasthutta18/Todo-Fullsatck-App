import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
 constructor(){}
  showLoader() {
    this.hideLoader();
    /**
     * Loader Html
     */
    let template = `
    <div class="loader" id="loader"></div>
      <div class="loader-inner" id="loader-inner">
        <div class="la-ball-newton-cradle la-3x">
          <div style="background-color: blue;"></div>
          <div style="background-color: red;"></div>
          <div style="background-color:indigo;"></div>
          <div style="background-color:darkgreen"></div>
        </div>
        <p style="font-size: 20px; margin-left:20px">Loading.....
      </p>
    </div>
    `
    document.body.insertAdjacentHTML('beforeend', template);
  }

  hideLoader() {
    let flag = true;
    //looping would avoid any errors when multiple
    //loader requests are made. We are considering that all
    //loaders should be removed on the success of a request.
    //Uncomment while loop in case loader doesnt disappear
    //while (flag) {
      let lodr = document.getElementById("loader");
      let lodrInner = document.getElementById("loader-inner");
      flag = false;
      if(lodr){
        flag = true;
        lodr.remove();
      }
      if(lodrInner){
        flag = true;
        lodrInner.remove();
      }
   // }
  }
}
