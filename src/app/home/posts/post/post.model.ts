export class Post {
  textContent: string;
  imgUrl: string;
  pdfUrl: string;
  constructor(textContent = null, imgUrl = null, pdfUrl = null) {
    this.textContent = textContent;
    this.imgUrl = imgUrl;
    this.pdfUrl = pdfUrl;
  }
}
