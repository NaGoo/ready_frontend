import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient,HttpHeaders } from '@angular/common/http';
import { FormGroup,Validators,FormControl } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { timeout } from 'rxjs/operators';
// import { Observable } from 'rxjs';


const header = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiaGFyaXRoYSBwIiwiaWQiOjEsImVtYWlsIjoiaGFyaXRoYXBuYWlyMjIwNUBnbWFpbC5jb20iLCJtb2JpbGVObyI6Ijk0ODk0NTIzNDgiLCJSb2xlTmFtZSI6IkFkbWluIiwidmVuZG9ySWQiOm51bGwsImlhdCI6MTU5ODUyMjk0NCwiZXhwIjoxNjAxMTE0OTQ0fQ.-yljrOcfC9tqCXxpCj-lpTZM9fD_36-c7G3dCA_LYB0'
}

  const request = {                                                                                                                                                                                 
  headers: new HttpHeaders(header), 
};
export class client{
  isActive:boolean;
}
@Component({
  selector: 'app-client-master',
  templateUrl: './client-master.component.html',
  styleUrls: ['./client-master.component.css']
})


export class ClientMasterComponent  {
  [x: string]: any;
  isActive:boolean;
  isCreated:boolean = false;
  isExist:boolean = false;
  lists=[];
  data:Array<any>;
  totalRecords:any;
  page:any;
  title:string;
  x:any;
  y:any;
  z:any;
  constructor( private http: HttpClient ){
    this.data = new Array<any>()
  }
service = [];



 client=new FormGroup({
  name:new FormControl('',[Validators.required,Validators.pattern("[a-zA-Z_\\s]+$"),Validators.minLength(3),Validators.maxLength(30)])
 })
 
 ngOnInit(){
   this.title ="submit";
  this.get();
}
get(){
  this.http.get('http://localhost:3000/api/client-masters',request)
  .subscribe((data :any[])=>{
    this.lists = data;
    this.totalRecords = this.lists.length;
  })
}
 onDelete(id:number,isActive:boolean){
   if(isActive){

  this.http.patch('http://localhost:3000/api/client-masters/' +id , {
    "isActive": false,    
  },request)
  
  .subscribe((da)=>{
    this.get();
  })}
  else{
    this.http.patch('http://localhost:3000/api/client-masters/' +id , {
    "isActive": true,    
  },request)
  
  .subscribe((da)=>{
    this.get();
  })

  }
}
//update
onUpdate(a:any,b:any){
  this.x=a;
  this.title="update";
  this.client.controls['name'].setValue(b);
  this.y=b;
 }
//  delete(id:number){
   
  
// }

//patch

 patch(){

  this.z=(this.client.controls['name']).value;
  this.http.patch('http://localhost:3000/api/client-masters/' +this.x, {
   
    "name":this.z
 },request)
 
 .subscribe((da)=>{
 
   this.get();
   this.isExist = false;
 },
 error =>{
  if(error.status==422)
  this.isExist=true;
})
 this.client.reset();
 this.title="submit";
}
//end
public onSubmit(e)
  {
    if(this.title=="submit"){

    
    this.client.reset(); 
    this.http.post ('http://localhost:3000/api/client-masters', e,request)
    .subscribe((result)=>{
    console.log(result);
    this.get();
    this.isExist = false;
    this.client.reset(); 
    },

    error =>{
      if(error.status==422)
      this.isExist=true;
    })
  } 
  else{
    this.patch();
    
  }
} 
 get name(){return this.client.get("name")}

//  getData():Observable<any>{
//   return this.http.get('http://localhost:3000/api/client-masters')

  
//  }
}
