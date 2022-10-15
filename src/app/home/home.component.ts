import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { MyDataService } from '../services/my-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  myData: any;
  constructor(private myDataService: MyDataService) { }

  ngOnInit(): void {
    this.myDataService.getData().pipe(take(1)).subscribe((data) => {
      this.myData = data
      console.log(data)
    });
  }

}
