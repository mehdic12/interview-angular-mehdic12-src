import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { City } from '../model/city';
import { ActivatedRoute } from '@angular/router';
import { CityService } from '../city.service';
@Component({
  selector: 'app-nearest',
  templateUrl: './nearest.component.html',
  styleUrls: ['./nearest.component.scss']
})
export class NearestComponent implements OnInit {

  constructor(private route: ActivatedRoute, private cityService: CityService) { }
  //@Input() city: City;
  //@Input() cityForm: any;
  city: City;
  cityNearest : City;
  ngOnInit(): void {
     this.city= <City>JSON.parse(this.route.snapshot.params['city']);
     this.cityNearest =this.cityService.getNearest(this.city);
  }

}
