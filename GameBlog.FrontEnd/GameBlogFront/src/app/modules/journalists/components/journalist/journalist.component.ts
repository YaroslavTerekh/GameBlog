import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-journalist',
  templateUrl: './journalist.component.html',
  styleUrls: ['./journalist.component.scss']
})
export class JournalistComponent implements OnInit {

  @Input()
  text: string = 'HERE';

  constructor() { }

  ngOnInit(): void {
  }

}
