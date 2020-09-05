import { Component, OnInit, ViewChild} from '@angular/core';
import {  FormControl,FormGroup,Validators } from '@angular/forms';
import { HttpClientModule, HttpClient,HttpHeaders } from '@angular/common/http';

import { ReplaySubject, Subject } from 'rxjs';
import { MatSelect } from '@angular/material/select';
import { take, takeUntil } from 'rxjs/operators';

interface service {
  value: string;
  viewValue: string;
}
interface filter {
  id: number;
  name: string;
 }
 
 export interface Bank {
  id: number;
  name: string;
}

export interface Bank1 {
  id: number;
  name: string;
}

export interface Bank2 {
  id: number;
  make: string;
  model:string;
}

const header = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiaGFyaXRoYSBwIiwiaWQiOjEsImVtYWlsIjoiaGFyaXRoYXBuYWlyMjIwNUBnbWFpbC5jb20iLCJtb2JpbGVObyI6Ijk0ODk0NTIzNDgiLCJSb2xlTmFtZSI6IkFkbWluIiwidmVuZG9ySWQiOm51bGwsImlhdCI6MTU5ODUyMjk0NCwiZXhwIjoxNjAxMTE0OTQ0fQ.-yljrOcfC9tqCXxpCj-lpTZM9fD_36-c7G3dCA_LYB0'
}
  const request = {                                                                                                                                                                                 
  headers: new HttpHeaders(header), 
};
@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit{
  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;
  searchMoviesCtrl = new FormControl();
  filteredMovies: any;
  isLoading = false;
  errorMsg: string;
  allow:boolean;
  isExist:boolean;
  durationInSeconds = 5;
  totalRecords:any;
  page:any;
  
  client = [];
  location = [];
  vehicle = [];  
  lists =[];

  categories: service[] = [
    {value: 'ON_SPOT_REPAIRS', viewValue: 'ON_SPOT_REPAIRS'}, 
    {value: 'TOWING', viewValue: 'TOWING'},
    {value: 'RSA', viewValue: 'RSA'},
    {value: 'GS', viewValue: 'GS'},
    {value: 'INSPECTION', viewValue: 'INSPECTION'}
  ];
 codes: service[] = [
    {value: 'FLAT_TYRE', viewValue: 'FLAT_TYRE'}, 
    {value: 'ZERO_DEGREE_TOWING', viewValue: 'ZERO_DEGREE_TOWING'},
    {value: 'LIFT_TOWING', viewValue: 'LIFT_TOWING'},
    {value: 'FTE_TUBE', viewValue: 'FTE_TUBE'},
    {value: 'FTE_TUBELESS', viewValue: 'INSPECTION'}
  ];
  leadtime: service[] = [
    {value: '30', viewValue: '30'}, 
  ];
  intervaltime: service[] = [
    {value: '30', viewValue: '30'}, 
  ];
  constructor( private http: HttpClient ){
  }
  protected banks: Bank[]=[]
  protected banks1: Bank1[]=[]
  protected banks2: Bank2[]=[]

 
  public bankFilterCtrl: FormControl = new FormControl();
  public bankFilterCtrls: FormControl = new FormControl();
  public bankFilterCtrlz: FormControl = new FormControl();

  public filteredBanks: ReplaySubject<Bank[]> = new ReplaySubject<Bank[]>(1);
  public filteredBank: ReplaySubject<Bank1[]> = new ReplaySubject<Bank1[]>(1);
  public filteredBankz: ReplaySubject<Bank2[]> = new ReplaySubject<Bank2[]>(1);

  ngOnInit(): void {

    this.getClient();
    this.getVehicle();
    this.getLocation();
    this.get();
   
    this.bankCtrl.setValue(this.banks);
    this.bankCtrls.setValue(this.banks1);
    this.bankCtrlz.setValue(this.banks2);

    this.filteredBanks.next(this.banks.slice());
    this.filteredBank.next(this.banks1.slice());
    this.filteredBankz.next(this.banks2.slice());
    
    this.bankFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterBanks();
      });

      this.bankFilterCtrls.valueChanges
      .pipe(takeUntil(this._onDestroys))
      .subscribe(() => {
        this.filterBank();
      });

      this.bankFilterCtrlz.valueChanges
      .pipe(takeUntil(this._onDestroyz))
      .subscribe(() => {
        this.filterBankz();
      });
}

//Nagoo
protected _onDestroy = new Subject<void>();
ngOnDestroy() {
  this._onDestroy.next();
  this._onDestroy.complete();
}

protected setInitialValue() {
  this.filteredBanks
    .pipe(take(1), takeUntil(this._onDestroy))
    .subscribe(() => {
     
      this.singleSelect.compareWith = (a: Bank, b: Bank) => a && b && a.id === b.id;
    });
}

protected filterBanks() {
  if (!this.banks) {
    return;
  }
  let search = this.bankFilterCtrl.value;
  if (!search) {
    this.filteredBanks.next(this.banks.slice());
    return;
  } else {
    search = search.toLowerCase();
  }
  this.filteredBanks.next(
    this.banks.filter(bank => bank.name.toLowerCase().indexOf(search) > -1)
  );
}
//End

//Nagoo

protected _onDestroys = new Subject<void>();
ngOnDestroys() {
  this._onDestroys.next();
  this._onDestroys.complete();
}

protected setInitialValues() {
  this.filteredBank
    .pipe(take(1), takeUntil(this._onDestroys))
    .subscribe(() => {
      this.singleSelect.compareWith = (a: Bank, b: Bank) => a && b && a.id === b.id;
    });
}

protected filterBank() {
  if (!this.banks1) {
    return;
  }
  
  let search = this.bankFilterCtrls.value;
  if (!search) {
    this.filteredBank.next(this.banks1.slice());
    return;
  } else {
    search = search.toLowerCase();
  }
  
  this.filteredBank.next(
    this.banks1.filter(bank1 => bank1.name.toLowerCase().indexOf(search) > -1)
  );
}
//End


//Nagoo
protected _onDestroyz = new Subject<void>();
ngOnDestroyz() {
  this._onDestroyz.next();
  this._onDestroyz.complete();
}

protected setInitialValuez() {
  this.filteredBankz
    .pipe(take(1), takeUntil(this._onDestroyz))
    .subscribe(() => {
      this.singleSelect.compareWith = (a: Bank, b: Bank) => a && b && a.id === b.id;
    });
}

protected filterBankz() {
  if (!this.banks2) {
    return;
  }
  let search = this.bankFilterCtrlz.value;
  if (!search) {
    this.filteredBankz.next(this.banks2.slice());
    return;
  } else {
    search = search.toLowerCase();
  }
  this.filteredBankz.next(
    this.banks2.filter((bank2 => bank2.make.toLowerCase().indexOf(search) > -1))
    
  );
}
//End

    service=new FormGroup({
    category : new FormControl(''),
    serviceCode : new FormControl(''),
    clientId : new FormControl(''),
    locationId : new FormControl(''),
    vehicleId : new FormControl(''),
    leadTime : new FormControl(''),
    intervalTime : new FormControl(''),
    description :new FormControl('',Validators.pattern("[a-zA-Z0-9-.,_\\s]+$")),
    name:new FormControl('',Validators.pattern("[a-zA-Z_\\s]+$")),
    nightCharge : new FormControl({value: '', disabled: false},[ Validators.min(0),Validators.pattern("[0-9]*")]),
    dayCharge : new FormControl({value: '', disabled: false},[ Validators.min(0),Validators.pattern("[0-9]*")]),
    tax : new FormControl('',[Validators.pattern("[0-9._\\s]+$"), Validators.min(0.01),Validators.max(100)]),
    displayToCustomer : new FormControl('',),
    bankCtrl : new FormControl('',),
    bankCtrls : new FormControl('',),
    bankCtrlz : new FormControl('',),
})

onChange(searchValue: string): void { 
  this.service.get('nightCharge')
}
onChange1(searchValue: string): void {  
    this.service.get('dayCharge')
}

    onSubmit(e)
    {
      interface MyObjLayout {
        id: string;
        createdAt:string;
        updatedAt:string;
        isActive :string;
        name:string;
    }
    
    interface MyObjLayout1 {
      id: string;
      createdAt:string;
      updatedAt:string;
      isActive :string;
      name:string;
      shortCode:string;
      geofence:string;
  }
  interface MyObjLayout2 {
    id: string;
    createdAt:string;
    updatedAt:string;
    isActive :string;
    name:string;
}
var obj2: MyObjLayout2 = e.bankCtrlz;
var idvehicle=obj2.id;
   

  var obj1: MyObjLayout1 = e.bankCtrls;
  var idlocation=obj1.id;
  

    var obj: MyObjLayout = e.bankCtrl;
    var idclient=obj.id;
    
    var nightchargevalue=0;
    let test=e.nightCharge;
     if(test==undefined)
     {
       nightchargevalue=0;
     }
     else
    {
      nightchargevalue=Number(e.nightCharge);
    }
    var daychargevalue=0;
    let test1=e.dayCharge;
     if(test1==undefined)
     {
       daychargevalue=0;
     }
     else
    {
      daychargevalue=Number(e.dayCharge);
    }
    if(daychargevalue==0 && nightchargevalue==0){
     this.allow=true;
   
     return false;
    }
      var array:any=JSON.stringify({"category":String(e.category),
      "serviceCode":String(e.serviceCode),
      "clientId":Number(idclient),
      "locationId":Number(idlocation),
      "vehicleId":Number(idvehicle),
      "description":String(e.description),
      "leadTime":Number(e.leadTime),
      "intervalTime":Number(e.intervalTime),
      "tax":Number(e.tax),
      "name":String(e.name),
      "dayCharge": daychargevalue,
      "nightCharge":nightchargevalue,
      "displayToCustomer":Boolean(e.displayToCustomer)})
      
      console.log(array);
      this.allow=false;
      this.http.post ('http://localhost:3000/api/service-masters', array,request)
      .subscribe((result)=>{
        console.log(result); 
        this.get(); 
    },
    error =>{
      if(error.status==422)
      this.isExist=true;
    })
  }
 
  getClient(){
    return this.http.get<any>('http://localhost:3000/api/client-masters',request)
    .subscribe((res)=>{
      this.banks=res;
    })
  }
    getVehicle(){
      return this.http.get<any>('http://localhost:3000/api/vehicle-masters',request)
      .subscribe((res)=>{
      this.banks2=res;
      })
    }
    getLocation(){
      return this.http.get<any>('http://localhost:3000/api/locations',request)
      .subscribe((res)=>{
      this.banks1=res;      
      })
    }
    
    get(){
      this.http.get('http://localhost:3000/api/service-masters',request)

      .subscribe((res : any[])=>{
        this.lists=res;      
            this.totalRecords = this.lists.length;
  
      })
      this.service.reset();

    }
    //update
    // onUpdate(a:any,c:any,sc:any,d:any,n:any,dc:any,nc:any,tax:any,cust:any){
    //   this.x=a;
    //   this.title="update";
    //   this.service.controls['category'].setValue(c);
    //   this.service.controls['serviceCode'].setValue(sc);
    //   // this.service.controls['clientId'].setValue(cd);
    //   // this.service.controls['locationId'].setValue(ld);
    //   // this.service.controls['vehicleId'].setValue(vd);
    //   // this.service.controls['leadTime'].setValue(lt);
    //   // this.service.controls['inttervalTime'].setValue(tt);
    //   this.service.controls['description'].setValue(d);      
    //   this.service.controls['name'].setValue(n);
    //   this.service.controls['dayCharge'].setValue(dc);
    //   this.service.controls['nightCharge'].setValue(nc);
    //   this.service.controls['tax'].setValue(tax);
    //   this.service.controls['displayToCustomer'].setValue(cust);
      
      
    //  }
    onDelete(id:number,isActive:boolean){ 
      if(isActive){    
      this.http.patch('http://localhost:3000/api/service-masters/' +id ,{
        "isActive":false
      },request) 
      .subscribe((a)=>
      {      
        this.service.reset();
        this.get();
      })}else{
        this.http.patch('http://localhost:3000/api/service-masters/' +id ,{
        "isActive":true
      },request) 
      .subscribe((a)=>
      {      
        this.service.reset();
        this.get();
      })
      }
    }

 get category(){return this.service.get('category')}
 get bankCtrl(){return this.service.get('bankCtrl')}
 get bankCtrls(){return this.service.get('bankCtrls')}
 get bankCtrlz(){return this.service.get('bankCtrlz')}
 get serviceCode(){return this.service.get('serviceCode')}
 get clientId(){return this.service.get('clientId')}
 get locationId(){return this.service.get('locationId')}
 get vehicleId(){return this.service.get('vehicleId')}
 get description(){return this.service.get('description')}
 get leadTime(){return this.service.get('leadTime')}
 get intervalTime(){return this.service.get('intervalTime')}
 get name(){return this.service.get('name')}
 get dayCharge(){return this.service.get('dayCharge')}
 get nightCharge(){return this.service.get('nightCharge')}
 get tax(){return this.service.get('tax')}
 get displayToCustomer(){return this.service.get('displayToCustomer')} 
}





