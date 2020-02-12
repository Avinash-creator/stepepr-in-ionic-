import { Component } from '@angular/core';
import { NavController, registerModeConfigs } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import 'rxjs/add/operator/map';
import { Base64 } from '@ionic-native/base64/ngx';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  insurances: Array<Storage>;
 

 Names: string[] = [];
 Name: string;
  Email: string;
  Id: string;
  StarName: string;
  Options: string;  
  
coupencode:string[]=[];
coupencodename:string;

Birth:string[]=[];
birthgirl:string;
startdate:string;
enddate:string;

details:string[]=[];
email:string;
name:string;
options:string;
phonenumber:string;
message:string;

images:string[]=[];
relationships:string;
file:string;
image:string;
oPtions:string;


  constructor(public navCtrl: NavController,private storage: Storage,public httpClient: HttpClient,public imagePicker: ImagePicker,private base64: Base64) { }
 selectChange(e) {
    console.log(e);
  } 
  //STORAGE SET
ngOnInit(){
 
}
//FIRST STEP SET/GET DETAILS
public add() {
  
this.storage.set('FullName', this.Name);
this.storage.set('Email', this.Email);
this.storage.set('Confirm Email', this.Name);
this.storage.set('Id', this.Id);
this.storage.set('Star Name', this.StarName);
this.storage.set('Options', this.Options);

this.httpClient.post('http://localhost:4200/posts',{'Name':this.Name,'Email':this.Email,'Id':this.Id,'StarName':this.StarName,'Options':this.options}).pipe(
    
  ).subscribe(res=>{ 
  
    console.log("data inserted successufully");
      
  });
  
  this.httpClient.get('http://localhost:4200').pipe(
      
    ).subscribe(response => {
        console.log('POST get router Response:', response);
        
    });
}
//SECOND STEP SET/GET COUPEN CODE
public adding(){
this.storage.set('Coupen Code',this.coupencodename);
this.httpClient.post('http://localhost:4200/coupencode',{'coupencodename':this.coupencodename}).pipe(
   
  ).subscribe(res=>{ 
  
   console.log("coupencodename inserted");
     
  });
}
// go to the MyPage component
goToMyPage() {
  this.navCtrl.push('SpacePage');
}

public birth(){

this.storage.set('Birth Girl',this.birthgirl);
this.storage.set('Start Date', this.startdate);
this.storage.set('End Date', this.enddate);

this.httpClient.post('http://localhost:4200/date',{'birthgirl':this.birthgirl,'startdate':this.startdate,'enddate':this.enddate}).pipe().subscribe(res=>{
console.log('inserted');
});
}

public submit(){
  this.storage.set('Options',this.relationships);
  this.storage.set('file',this.file);

  this.httpClient.post('http://localhost:4200/upload',{'file':this.file}).pipe().subscribe(res=>{
console.log('inserted');
  
});

this.httpClient.get('http://localhost:4200/upload').pipe(
      
    ).subscribe(res=> {
        console.log('POST get router Response image:', res);
        
    });
} 


public detail(){
  this.storage.set('Email', this.email);
  this.storage.set('Name', this.name);
  this.storage.set('Options', this.options);
  this.storage.set('phonenuber',this.phonenumber);
  this.storage.set('message',this.message);

  this.httpClient.post('http://localhost:4200/details',{'email':this.email,'name':this.name,'options':this.options,'phonenumber':this.phonenumber,'message':this.message}).pipe().subscribe(res=>{
    console.log("details inserted");
  });
}

public get(){
  this.storage.get('FullName').then((val)=>{document.write('FULL NAME',val );});
  this.storage.get('Confirm Email').then((val)=>{document.write('CONFIRM EMAIL',val);});
  this.storage.get('Id').then((val)=>{document.write('ID',val);});
  this.storage.get('Star Name').then((val)=>{document.write('STAR NAME',val);});
  this.storage.get('Options').then((val)=>{document.write('GET',val);});
  this.storage.get('Coupen Code').then((val)=>{document.write('COUPEN CODE',val);});
  this.storage.get('Birth Girl').then((val)=>{document.write('BIRTH(GIRL)',val);});
this.storage.get('Start Date').then((val)=>{document.write('START DATE',val);});
this.storage.get('End Date').then((val)=>{document.write('END DATE',val);});
this.storage.get('Options').then((val)=>{document.write('OPTIONS',val);});
  this.storage.get('file').then((val)=>{document.write('IMAGE',val);});
  this.storage.get('Email').then((val)=>{document.write('EMAIL',val);});
  this.storage.get('Name').then((val)=>{document.write('NAME',val);});
  this.storage.get('Options').then((val)=>{document.write('OPTIONS',val);});
  this.storage.get('phonenuber').then((val)=>{document.write('PHONE NUMBER',val);});
  this.storage.get('message').then((val)=>{document.write('message is',val);});
}

}