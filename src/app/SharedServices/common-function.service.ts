import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import domtoimage from "dom-to-image-more";
import PptxGenJS from "pptxgenjs";
import jsPDF from "jspdf";
@Injectable({
  providedIn: 'root'
})
export class CommonFunctionService {
  constructor(
    private modalService: NgbModal
  ) { }
  /**
   * this function helps to close popup
   * @param model
   * @returns
   */
  CloseEditMod(model: any) {
    return model.dismiss();
   }
  /**
   * this function helps to open popup
   * @param model
   * @returns
   */
   OpenModel(model: any) {
     this.modalService.open(model, {
       ariaLabelledBy: 'modal-basic-title1',
       size: 'xl',
       scrollable: true,
     });
   }

   /**
    *This function helps to export div or any html element to png and download that file.
    * @param fileName  `filename`
    * @param element_id Html id
    * @param widthPadding image width
    * @param heightPadding image hieght
    * extension is .png
    * @returns
    */

  async ExportPNG(
    fileName: any,
    element_id: any,
    widthPadding: any,
    heightPadding: any
  ) {
    try {
      const element = document.getElementById(element_id);
      if (!element) {
        console.error(`Element for tableElemRef not found.`);
        return;
      }

      const width: any = element.scrollWidth + widthPadding;
      const height: any = element.scrollHeight + heightPadding;

      let dataUrl = await domtoimage.toPng(element, {
        quality: 1,
        width: width,
        height: height,
      });

      let link = document.createElement("a"); //creating link to store div
      link.download = fileName + ".png";
      link.href = dataUrl;
      link.click();
      link.remove(); //remove created link to free memory
    } catch (err: any) {
      console.error(err);
    }
  }

 /**
    *This function helps to export div or any html element to jpg and download that file.
    * @param fileName  `filename`
    * @param element_id Html id
    * @param widthPadding image width
    * @param heightPadding image hieght
    * extension is .jpg
    * @returns
    */
  async ExportJPG(
    fileName: any,
    element_id: any,
    widthPadding: any,
    heightPadding: any
  ) {
    try {
      const element = document.getElementById(element_id);
      if (!element) {
        console.error(`Element for tableElemRef not found.`);
        return;
      }

      const width: any = element.scrollWidth + widthPadding;
      const height: any = element.scrollHeight + heightPadding;

      let dataUrl = await domtoimage.toJpeg(element, {
        quality: 1,
        width: width,
        height: height,
      });

      let link = document.createElement("a"); //creating link to store div
      link.download = fileName + ".jpeg";
      link.href = dataUrl;
      link.click();
      link.remove(); //remove created link to free memory
    } catch (err: any) {
      console.error(err);
    }
  }

   /**
    *This function helps to export div or any html element to svg and download that file.
    * @param fileName  `filename`
    * @param element_id Html id
    * @param widthPadding image width
    * @param heightPadding image hieght
    * extension is .svg
    * @returns
    */
  async ExportSVG(
    fileName: any,
    element_id: any,
    widthPadding: any,
    heightPadding: any
  ) {
    try {
      const element = document.getElementById(element_id);
      if (!element) {
        console.error(`Element for tableElemRef not found.`);
        return;
      }

      const width: any = element.scrollWidth + widthPadding;
      const height: any = element.scrollHeight + heightPadding;

      let result = await domtoimage.toSvg(element, {
        width: width,
        height: height,
        quality: 1,
      });

      let link = document.createElement("a");
      link.download = fileName + ".svg";
      link.href = result;
      link.click();
      link.remove(); //remove created link to free memory
    } catch (err: any) {
      console.error(err);
    }
  }

  /**
   *This function helps to export multipe div or any html element to multiple images
   and set all images inside PPT with title  download that file.
   * @param documentTitle `File title`
   * @param arr 'Arr of html id and page title'
   * [{id:'graph1',title:'Brandwise Graph'}]
   * @param widthPadding
   * @param heightPadding
   * @returns
   */
  async ExportPPT(
    documentTitle: any,
    arr: any,
    widthPadding: any,
    heightPadding: any
  ) {
    try {
      const pptx = new PptxGenJS();

      for (let i = 0; i < arr.length; i++) {
        const element = document.getElementById(arr[i].id);
        //if element is not found that means some error has occurred
        if (!element) {
          console.error(`Element for tableElemRef not found.`);
          return;
        }

        /*We are adding extra padding to ensure entire document is saved
      properly by the library. Sometimes the width and height are calculated
      lesser than expected leading to cropping. */
        const width: any = element?.scrollWidth + widthPadding;
        const height: any = element?.scrollHeight + heightPadding;
        //we need to give a big layout for best possible effect
        pptx.layout = "LAYOUT_WIDE"; //13.3 x 7.5 inches(1276 x 720)

        let slide = pptx.addSlide();
        let textboxText = arr[i].title; //documentTitle;

        /*Set background color of slide*/
        const bgColor = "FFFFFF";
        slide.background = { color: bgColor };

        /*Set color of font*/
        const fntClr = "000000";

        /*We are giving a width to the textbox of 6.3 inches. In layout_wide*/
        slide.addText(textboxText, {
          x: 3.55,
          w: 6.3,
          y: 0.3,
          color: fntClr,
          fontFace: "Helvetica",
          align: "center",
          valign: "middle",
        });

        /*calculate the aspect ratio so that we can resize the images correctly*/
        const aspectRatio = width / height;

        /*Calculate the width and height based on the maxWidth and maxHeight while maintaining the aspect ratio
      actual width is 1276 and height is 720 for LAYOUT_WIDE. However since we
      need text at top, we are reducing the maxwidth & maxheight possible for the
      image by an appropriate amount.*/
        let maxWidth = 1200; //1276;
        let maxHeight = 640; //720;

        let width1 = maxWidth;
        let height1 = maxWidth / aspectRatio;

        /*In case height is too long, adjust the width instead
      since maxWidth > maxHeight this will always fit inside the screen.*/
        if (height1 > maxHeight) {
          height1 = maxHeight;
          width1 = maxHeight * aspectRatio;
        }

        //convert pixels to inches
        width1 = width1 / 96;
        height1 = height1 / 96;

        const result = await domtoimage.toPng(element, {
          quality: 1,
          width: width,
          height: height,
        });

        //lets calculate the x axis value for image in inches. The inch size for
        //layout_wide is 13.3 inches. We are adding 20/96 since we artificially add 20 pixels to the width
        let xAxisValue = (13.3 - width1 + 20 / 96) / 2;

        slide.addImage({
          data: result,
          x: xAxisValue,
          y: 0.55,
          w: width1,
          h: height1,
        });
      }
      pptx.writeFile({ fileName: documentTitle + ".pptx" });
    } catch (error) {
      console.error("Error occurred:", error);
    }
  }

  /**
   *This function helps to export multipe div or any html element to multiple images
   and set all images inside PDF with title  download that file.
   * @param documentTitle `File title`
   * @param arr 'Arr of html id and page title'
   * [{id:'graph1',title:'Brandwise Graph'}]
   * @param widthPadding
   * @param heightPadding
   * @returns
   */
  async ExportPDF(
    documentTitle: any,
    arr: any,
    widthPadding: any,
    heightPadding: any
  ) {
    try {
      const elementTest = document.getElementById(arr[0].id);
      if (!elementTest) {
        console.error(`Element for tableElemRef not found.`);
        return;
      }

      const width: any = elementTest?.scrollWidth + widthPadding;
      const height: any = elementTest?.scrollHeight + heightPadding;
      let orientation = width > height ? "l" : "p";
      let imageUnit = "pt";

      let jsPdfOptions: any = {
        orientation: orientation,
        unit: imageUnit,
        format: [width + 50, height + 50], // decide width and height of pdf
      };

      const pdf = new jsPDF(jsPdfOptions);

      for (let i = 0; i < arr.length; i++) {
        const element = document.getElementById(arr[i].id);

        if (i > 0) {
          pdf.addPage();
        }
        //if element is not found that means some error has occurred
        if (!element) {
          console.error(`Element for tableElemRef not found.`);
          return;
        }

        /*We are adding extra padding to ensure entire document is saved
        properly by the library. Sometimes the width and height are calculated
        lesser than expected leading to cropping. */
        const result = await domtoimage.toPng(element, {
          quality: 1,
          width: element?.scrollWidth + widthPadding,
          height: element?.scrollHeight + heightPadding,
        });

        //in case of dark mode we are adding a background to give a color feel
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        const bgColor = "#FFF";
        pdf.setFillColor(bgColor);
        pdf.rect(0, 0, pdfWidth, pdfHeight, "F");

        //using helvetica as font. In case we want type put Bold in second param.
        //to see all the fonts use console.log(pdf.getFontList());
        pdf.setFont("Helvetica", "");
        pdf.setFontSize(20);

        //in case of dark mode we want white and in light we want black
        const fntClr = "#000";
        pdf.setTextColor(fntClr);

        /*Calculate the offset required to center the text in a div*/
        let textX =
          (pdf.internal.pageSize.getWidth() - pdf.getTextWidth(arr[i].title)) /
          2;
        pdf.text(arr[i].title ? arr[i].title : "TableDownload", textX, 25);

        /*In order to center the image in the pdf we have to do some calculations */
        //we are multiplying by 0.6 as that will be the final width
        const x = (pdfWidth - width * 0.6) / 2;

        //we are multiplying by 0.6 for both height and width to reduce blurring
        pdf.addImage(result, "PNG", x, 35, width * 0.6, height * 0.6); //decide position of image in pdf
      }
      pdf.save(documentTitle + ".pdf");
    } catch (error) {
      console.error("Error occurred:", error);
    }
  }
}
