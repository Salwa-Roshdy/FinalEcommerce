import { title } from 'node:process';
import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../Interfaces/iproduct';

@Pipe({
  name: 'search',
  standalone: true,
})
export class SearchPipe implements PipeTransform {
  transform(arrayOfObjects: any[], term: string): any[] {
    return arrayOfObjects.filter((item) =>
      item.title.toLowerCase().includes(term.toLowerCase())
    );
  }
}
