import { Component, OnInit } from '@angular/core';
import { GetDataService } from './services/get-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  stkexchg: any;
  lastPrice: any;
  lastupdated: any;
  open: any;
  high: any;
  low: any;
  prevclose: any;
  direction: any;
  dayavg30: any;
  dayavg50: any;
  dayavg200: any;
  market_state: any;

  constructor(private _getData: GetDataService) {}

  istOptions = {
    timeZone: 'Asia/Kolkata', // Set the timezone to IST
    hour12: false, // Use 24-hour format
  };

  pricercd = {
    rcdTimeStamp: 0,
    stkexchg: '',
    lastPrice: 0,
    lastupdated: 0,
    open: 0,
    high: 0,
    low: 0,
    prevclose: 0,
    direction: '',
    dayavg30: 0,
    dayavg50: 0,
    dayavg200: 0,
    market_state: 0,
  };

  ngOnInit(): void {
    this.getData();
    this.reRun;
  }

  getData() {
    this._getData.getPrimeData().subscribe({
      next: (res) => {
        //getting info
        this.stkexchg = res.indices.stkexchg;
        this.lastPrice = res.indices.lastprice;
        this.lastPrice = parseFloat(this.lastPrice.replace(/,/g, ''));
        this.lastupdated = res.indices.lastupdated;
        this.lastupdated = new Date(this.lastupdated);
        this.lastupdated = this.lastupdated.toLocaleString(
          'en-US',
          this.istOptions
        );
        this.open = res.indices.open;
        this.open = parseFloat(this.open.replace(/,/g, ''));
        this.high = res.indices.high;
        this.high = parseFloat(this.high.replace(/,/g, ''));
        this.low = res.indices.low;
        this.low = parseFloat(this.low.replace(/,/g, ''));
        this.prevclose = res.indices.prevclose;
        this.prevclose = parseFloat(this.prevclose.replace(/,/g, ''));
        this.direction = res.indices.direction;
        this.dayavg30 = res.indices.dayavg30;
        this.dayavg30 = parseFloat(this.dayavg30.replace(/,/g, ''));
        this.dayavg50 = res.indices.dayavg50;
        this.dayavg50 = parseFloat(this.dayavg50.replace(/,/g, ''));
        this.dayavg200 = res.indices.dayavg200;
        this.dayavg200 = parseFloat(this.dayavg200.replace(/,/g, ''));
        this.market_state = res.indices.market_state;


        //providing info
        this.pricercd.rcdTimeStamp = new Date().getTime();
        this.pricercd.stkexchg = this.stkexchg;
        this.pricercd.lastPrice = this.lastPrice;
        this.pricercd.lastupdated = this.lastupdated;
        this.pricercd.open = this.open;
        this.pricercd.high = this.high;
        this.pricercd.low = this.low;
        this.pricercd.prevclose = this.prevclose;
        this.pricercd.direction = this.direction;
        this.pricercd.dayavg30 = this.dayavg30;
        this.pricercd.dayavg50 = this.dayavg50;
        this.pricercd.dayavg200 = this.dayavg200;
        this.pricercd.market_state = this.market_state;

        // calling poster
        this.dataPoster(this.pricercd);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  dataPoster(data: any) {
    this._getData.postRcdData(data).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  reRun = setInterval(() => {
    this.getData();
  }, 30000);
}
