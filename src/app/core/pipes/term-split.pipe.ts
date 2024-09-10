import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'termSplit',
  standalone: true,
})
export class TermSplitPipe implements PipeTransform {
  transform(text: string, limit: number): string {
    return text.split(' ', limit).join(' ');
  }
}
