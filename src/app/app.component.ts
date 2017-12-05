import { Component, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ],
})
export class AppComponent {
  public name: any;
  public defaultPicture = 'assets/img/theme/no-photo.png';
  public profilepic: string;
  public imageId = 'userPhoto';
  activeColor: string = 'green';
  baseColor: string = '#ccc';
  loaded: boolean = false;
  imageLoaded: boolean = false;
  public imageForm: FormGroup;
  dragging: boolean = false;
  overlayColor: string = 'rgba(255,255,255,0.5)';
  imageSrc: string = '';
  public idSliderOne = 'image';


  constructor(private appService: AppService, private elem: ElementRef) {

  }

  ngOnInit(): void {

  }


  handleInputChange(e, sli1) {
    // new Date().valueOf();
    var file = e.dataTransfer ? e.dataTransfer.files[ 0 ] : e.target.files[ 0 ];
    var pattern = /image-*/;
    var reader = new FileReader();

    if (! file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    this.loaded = false;
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
    this.appService.addImage(this.idSliderOne, (<HTMLInputElement>document.getElementById('image')).files.item(0))
      .subscribe(data => {

        console.log(data, 'success');
      });
  }


  _handleReaderLoaded(e) {
    var reader = e.target;
    this.profilepic = reader.result;
    this.loaded = true;
  }


  handleDragEnter() {
    this.dragging = true;
  }

  handleDragLeave() {
    this.dragging = false;
  }

  handleDrop(e, sli1) {
    e.preventDefault();
    this.dragging = false;
    // console.log(e, 'handleDrop');
    this.handleInputChange(e, sli1);

  }


}
