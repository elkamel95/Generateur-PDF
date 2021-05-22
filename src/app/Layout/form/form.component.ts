import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfigImage } from 'src/app/models/ConfigImage';
import { DocManagementService } from 'src/app/services/doc-management.service';
import { Observable, Subject } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'pdf-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  providers: [
    { provide: MatFormFieldControl, useExisting: FormComponent }   
  ]
})
export class FormComponent implements OnInit {

 
form: FormGroup;
imagePreview: string;
docPreview: string;
private subject = new Subject<any>();

constructor(private docManagementService :DocManagementService,private _snackBar: MatSnackBar,private spinner: NgxSpinnerService ) { }

ngOnInit(): void {
  this.spinner.show();

this.form = new FormGroup({
  name: new FormControl(null,Validators.required ),

  x: new FormControl(null,Validators.required ),
  y: new FormControl(null,Validators.required),
  w: new FormControl(null),
  h: new FormControl(null),

  pageNumber:new FormControl(null,Validators.required ),
  urlImage: new FormControl(null,Validators.required ),

  formData: new FormControl(null,Validators.required ),

 
});
  this.getAll();
  this.subject.subscribe(data=>{
    this.getAll();
  })
}
docs:any ; 
getAll(){
  this.spinner.show();
    this.docManagementService.getAll().subscribe(data=>{
    this.docs=data
    this.spinner.hide();

  })
}
download(name){

  this.docManagementService.downLoad(name);

  
}
downloadFile(data) {
  console.log(data)
   window.open(data);
}

openSnackBar(message: string, action: string) {
  this._snackBar.open(message, action, {
    duration: 2000,
  });
}
onSavePost() {
 if(this.form.invalid)
{
   if(this.imagePreview =="" ||this.imagePreview ==null )
 this.openSnackBar("Photo is required ","validator")
 else if(this.docPreview =="" || this.docPreview ==null)
 this.openSnackBar("Document is required ","validator");
 return;
}
const configImage:ConfigImage = new ConfigImage();
  configImage.pageNumber =this.form.value.pageNumber;
  configImage.x  =this.form.value.x;
  configImage.y  =this.form.value.y;
  configImage.w  =this.form.value.w;
  configImage.h  =this.form.value.h;
  configImage.name  =this.form.value.name;

 console.log(this.form.value.urlImage)
this.docManagementService.postFile(configImage,this.form.value.formData,this.form.value.urlImage).subscribe(data=>{
  console.log(data)
  this.openSnackBar("Document has changed ","add image");
this.subject.next();
},err=>{
  console.log(err)
  this.openSnackBar("Document has changed ","add image");

});
//this.form.reset();
}

onSelectImage(event: Event) {
const file = (event.target as HTMLInputElement).files[0];
this.form.patchValue({urlImage: file});
this.form.get('urlImage').updateValueAndValidity();
const reader = new FileReader();
reader.onload = () => {
this.imagePreview = reader.result.toString();
};
reader.readAsDataURL(file);
}
onSelectPdf(event: Event) {
  const file = (event.target as HTMLInputElement).files[0];
  this.form.patchValue({formData: file});
  this.form.get('formData').updateValueAndValidity();
  const reader = new FileReader();
  reader.onload = () => {
  this.docPreview = reader.result.toString();
  };
  reader.readAsDataURL(file);
  }

  
}