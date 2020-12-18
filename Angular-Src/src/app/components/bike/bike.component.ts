import { Component, OnInit } from '@angular/core';
import { IBike } from '../../bike';
import { BikeService } from '../../services/bike.service';

@Component({
  selector: 'app-bike',
  templateUrl: './bike.component.html',
  styleUrls: ['./bike.component.css']
})

export class BikeComponent implements OnInit {

  public successMsg: string;
  public errorMsg: string;
  serialNumber: string;
  model: string;
  type: string;
  imageUrl:string;

  constructor(private bikeService : BikeService) { }

  
  ngOnInit(): void {
  }
  createBike() {
    this.successMsg = '';
    this.errorMsg = '';
    this.bikeService.createBike(this.serialNumber, this.model, this.type, this.imageUrl)
      .subscribe((createdAppointment: IBike) => {
        this.serialNumber = '';
        this.model = '';
        this.type = '';
        this.imageUrl = '',
        this.successMsg = `Bike Created!!`;
      },
      (error: ErrorEvent) => {
        this.errorMsg = error.error.message;
      });
  }

}
