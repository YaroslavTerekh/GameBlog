import { Journalist } from './../../../../shared/models/journalist';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-journalist',
  templateUrl: './journalist.component.html',
  styleUrls: ['./journalist.component.scss']
})
export class JournalistComponent implements OnInit {

  @Input()
  public journalist!: Journalist;

  constructor() { }

  ngOnInit(): void {    
  }

}
