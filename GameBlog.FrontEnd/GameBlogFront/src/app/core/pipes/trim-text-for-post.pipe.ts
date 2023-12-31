import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trimTextForPost'
})
export class TrimTextForPostPipe implements PipeTransform {

  transform(value: string, num: number): unknown {
    if(!value)
      return '';
    
    if(value.length < num) 
      return value;
    
    return value.substring(0, num) + '...';
  }

}
