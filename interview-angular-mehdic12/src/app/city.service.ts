import { Injectable } from '@angular/core';
import { leftRight } from '@syncfusion/ej2-angular-grids';
import citiesJson from '../../mock/data.json';
import { City } from './model/city';
@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor() { }

  public  cities  : City[];
    

  getData (): City[]{     
    let cities  : City[];
    Object.keys(citiesJson).forEach((k) => {
      if (k !== 'Name')   cities =  citiesJson[k];  
     })
   return cities;
  }

  getNearest (city:City): City{     
    let city1  : City;
    this.cities = this.getData ();
     
    let cityRandom : City;
    cityRandom = this.getRandomPoint(city);  

    let x1 = city.coordinates.x ;
    let y1 = city.coordinates.y;
 
    let rx = cityRandom.coordinates.x; 
    let ry = cityRandom.coordinates.y;
   
    let drx = Math.pow(x1-rx, 2);
    let dry = Math.pow(y1-ry, 2);
    let dMin = Math.sqrt(drx+dry);
    let x, y;
    //On suppose que Distance minim = dMin; 
    this.cities.forEach( (element) => {  
      if(element.coordinates!=null) {   
         x = element.coordinates.x; 
         y = element.coordinates.y;
      }

       if(x1 != x   &&   y1 != y ) {
           let dx = Math.pow(x1-x, 2);
           let dy = Math.pow(y1-y, 2);
           let d = Math.sqrt(dx+dy);
           if(d <= dMin) {
            city1 = element;
           }
        }
   });
  
    return city1;
  }
 
  getRandomPoint (city:City): City{     
    this.cities = this.getData ();     
    let cityRandom : City;
    let x1 = city.coordinates.x ;
    let y1 = city.coordinates.y;
    let cx,cy
    this.cities.forEach( (element) => {  
       
      if(element.coordinates!=null) {
           cx = element.coordinates.x;  
           cy = element.coordinates.y;
      }
     
       if(x1 != cx   &&   y1 != cy ) {
            cityRandom =  element;
            return ;
          } 
     });
     return cityRandom;
  }
 
   

 sortData (criteria:string, order : string, cities:City[]): City[]{    
    let citiesMin  : City[];
    citiesMin= new Array() ;
    let pos =0;   
    let size = cities.length;  
    for(var i =0; i < size; i++) {
         pos =  this.getMinMaxTab (cities, criteria, order);   
         citiesMin.push(cities[pos]) ;
         cities.splice(pos, 1);
    } 
  
   return citiesMin;
  }



  getMinMaxTab (cities:City[], criteria:string, order : string) :number {
    let cityMin : City;
    cityMin  = cities[0];
    let zipMin = cityMin.zipCode;
    let zip ;
    let minPos = 0;
    let pname;
    let nameMin = cityMin.name;

    if(criteria == 'zipCode') {
          for(var i =0; i <cities.length; i++) {
            zip =  cities[i].zipCode;
            if(cities[i]  !=null && zip !=null) {
              if(order =='ASC') {
                  if(zip <= zipMin) {
                    zipMin = zip;
                    cityMin = cities[i];
                    minPos  = i;
                  }
                }
                if(order =='DESC') {
                  if(zip >= zipMin) {
                    zipMin = zip;
                    cityMin = cities[i];
                    minPos  = i;
                  }
                }
            }   
          }
    } 
 
    if(criteria == 'name') {
      for(var i =0; i <cities.length; i++) {
        pname =  cities[i].name;
        if(cities[i]  !=null && pname !=null) {
          if(order =='ASC') { 
            if(pname <= nameMin) {
              nameMin = pname;
              cityMin = cities[i];
              minPos  = i;
            }
           }

           if(order =='DESC') { 
            if(pname >= nameMin) {
              nameMin = pname;
              cityMin = cities[i];
              minPos  = i;
            }

            }

          }   
        }
      }
     return minPos;
    }
  
  
  
  searchByName (criteria:string,  cities:City[]): City[]{    
      let citiesMin  : City[];
      citiesMin= new Array() ;
      let pos =0;   
      let size = cities.length;  
      for(var i =0; i < size; i++) {
           if(cities[i] !=null  && cities[i].name.includes(criteria)) {
              citiesMin.push(cities[i]) ;
              cities.splice(i, 1);
           }
       } 
    
     return citiesMin;
    }
 
     
 searchByZipCode (criteria:string,  cities:City[]): City[]{    
    let citiesMin  : City[];
    citiesMin= new Array() ;
    let pos =0;   
    let size = cities.length;  
    for(var i =0; i < size; i++) { 
         if(cities[i] !=null  && cities[i].zipCode.toString().includes(criteria)) {
            citiesMin.push(cities[i]) ;
            cities.splice(i, 1);
         }
     } 
  
   return citiesMin;
  }

 
 getDataFromIndex (index:number,  cities:City[]): City[]{    
    let citiesMin  : City[];
    citiesMin= new Array() ;
    let pos =0;   
    let size = cities.length;  
    for(var i =0; i < size; i++) { 
         if(index == i) {
            cities.splice(0, i);
         }
     } 
   citiesMin = cities;
   return citiesMin;
  }

  
  }
    