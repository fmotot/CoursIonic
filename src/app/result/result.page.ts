import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
})
export class ResultPage implements OnInit {
  public pseudo : string;
  public result : string;
  public total : string;

  constructor(private route : ActivatedRoute) {
    this.route.params.subscribe((params) => {
      this.result = params['result'];
      this.total = params['total'];
      this.pseudo = params['pseudo'];
    })
   }

  ngOnInit() {
  }

}
