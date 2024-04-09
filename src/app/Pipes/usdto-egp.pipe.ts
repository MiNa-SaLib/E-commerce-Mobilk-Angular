import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'USDtoEGP'
})
export class USDtoEGPPipe implements PipeTransform {

  transform(value: number,rate:number=45): string {
    // return value*rate;
    let num=value.toString();
    let year=num.slice(1,3);
    let month=num.slice(3,5);
    let day=num.slice(5,7);
    if (num[0]=='3') {
      
      return `${day}/${month}/20${year}`
    }else{
      return `${day}/${month}/19${year}`

    }
  }

}
