import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { GridComponent, PageService, ExcelExportService, PdfExportService, GroupService, RowSelectEventArgs } from '@syncfusion/ej2-angular-grids';
import { ViewChild, ValueProvider } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { City } from '../model/city';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import citiesJson from '../../../mock/data.json';
import { Router } from '@angular/router';
import { CityService } from '../city.service';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent implements OnInit {
  @ViewChild('gridCities', { static: false })
  public gridCities: GridComponent;
  public pageSettings: Object;
  public editSettings: Object;
  public toolbar: Object[];
  public detailSelected = false;
  public showUserDetail = false;

  public indexRow: number = 0;
  public initialPage: Object;
  public mode: String;

  @Input() cities: City[];

  public showNearest = false;
  public showCities = true;
   
  public selectedCity : City;
   
  public zip;
 
  oldCities: City[];
  
   //public cities:{name:string, zipCode:string, coordinates:{x:number, y:number}}[] ;//= citiesJson;

  searchForm = this.fb.group({
    limit: [''],
    start: ['', Validators.required],
    sort: ['', Validators.required],
    name_like: ['', Validators.required],
    zipCode_like: ['', Validators.required],
    order: ['', Validators.required] 
  });

  sortList: any = ['zipCode', 'name']   

  constructor(private fb: FormBuilder, private router: Router,  private cityService: CityService) { }

  ngOnInit(): void {
    this.toolbar = ['ExcelExport', 'PdfExport', 'CsvExport', { text: 'Ajouter', prefixIcon: 'e-add', name: 'mehdi', id: 'save' }, 'Search'];
    this.pageSettings = { pageSize: 10};
    this.initialPage = { pageSizes: true, pageCount: 4 };
    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' }; // permet d ouvrir un pop u dialog
 
   /* this.cities = [
      {id:0, name:'Paris', zipCode:'75000', x:'12', y:'14'},
      {id:2, name:'Paris', zipCode:'75000', x:'12', y:'14'},
      {id:3, name:'Paris', zipCode:'75000', x:'12', y:'14'},
      {id:4, name:'Paris', zipCode:'75000', x:'12', y:'14'},
      {id:5, name:'Paris', zipCode:'75000', x:'12', y:'14'},
      {id:6, name:'Paris', zipCode:'75000', x:'12', y:'14'}
       ];*/
       //read from json file:

      /*  Object.keys(citiesJson).forEach((k) => {
          if (k !== 'Name')  this.cities =  citiesJson[k];
       })*/

       this.cities = this.cityService.getData(); 
       this.oldCities = this.cities ;
       this.showNearest = false;
  
  }


  changeSort(e) {
     console.log(e.target.value);
    //alert(e.target.value);
     this.zip = e.target.value;
    
  }
 
  changeOrder(e) {
       //console.log(e.target.value);
       let order = e.target.value;
       if(this.zip  !=null) {
            this.cities = this.cityService.sortData(this.zip, order, this.cities);
       }
   }

   getDataFromIndex(e) {
    //console.log(e.target.value);
      let page = e.target.value; 
      if(page !=null) {
        this.cities = this.cityService.getDataFromIndex(page, this.cities);
        this.gridCities.refresh(); 
       }else{
        this.cities = this.oldCities;
         
       }

    }
   
    changeLimit(e) {
      //console.log(e.target.value);
        let limit = e.target.value;   
        this.pageSettings = { pageSize:limit };
        if(limit  == null || limit ==''){
            this.pageSettings = { pageSize:10 };
        }
     }


 
    
   searchByName (e){
     let criteia = e.target.value;
     if(criteia!= null && criteia !='') {
         this.cities = this.cityService.searchByName(criteia,  this.cities);
     }else{
        this.cities =  this.oldCities
     }
    
  }
 

  searchByZipCode (e){
    let criteia = e.target.value;
    if(criteia!= null && criteia !='') { 
        this.cities = this.cityService.searchByZipCode(criteia,  this.cities);
     }else{
         this.cities =  this.oldCities
    }
   
 }
 

  loadCities() {

  }

  public toolbarClickCities(args: ClickEventArgs): void {
    switch (args.item.text) {
      case 'PDF Export':
        this.gridCities.pdfExport();
        break;
      case 'Excel Export':
        this.gridCities.excelExport();
        break;
      case 'CSV Export':
        this.gridCities.csvExport();
        break;
    }
  }



  public dataBoundCities() {

  }

  clickHandler(args): void {
  }

  onRowClickedCities(args: RowSelectEventArgs): void {
       this.selectedCity =  args.data as City;
  }
   
  goToNearest(city:City) {    
     //alert(city);
      //this.selectedCity
      this.showCities = false;
      this.router.navigate(['api/cities/nearest/'+JSON.stringify(city)]);  //this.selectedCity
    }



   
 }
