import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IBike } from '../../bike';
import { BikeService } from '../../services/bike.service';
import { mergeMap } from 'rxjs/operators';



@Component({
  selector: 'app-bike-list',
  templateUrl: './bike-list.component.html',
  styleUrls: ['./bike-list.component.css']
})
export class BikeListComponent implements OnInit {
  
  public loading = true;
  public errorMsg: string;
  public successMsg: string;
  public bikes: IBike[];
  public columns = ['_id', 'serialNumber', 'model', 'type', 'imageUrl', 'delete'];
  public id: any;

  bikeImageWidth:number = 200;

  constructor(private bikeService : BikeService,)
   { }

  ngOnInit(): void {
    this.bikeService.getBikes()
    .subscribe((bikes: IBike[]) => {
      this.bikes = bikes;
      this.loading = false;
    },
    (error: ErrorEvent) => {
      this.errorMsg = error.error.message;
      this.loading = false;
    });
  }
  deleteBike(id: string) {
    this.bikeService.deleteBike(id)
      .pipe(
        mergeMap(() => this.bikeService.getBikes())
      )
      .subscribe((bikes: IBike[]) => {
        this.bikes = bikes;
        this.successMsg = 'Successfully Deleted Bike';
      },
      (error: ErrorEvent) => {
        this.errorMsg = error.error.message;
      });
  }
}
