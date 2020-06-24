import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-representation',
  templateUrl: './representation.component.html',
  styleUrls: ['./representation.component.scss']
})
export class RepresentationComponent implements OnInit {
  @Input()
  represent: any;

  constructor() { }

  ngOnInit(): void {
  }

}
