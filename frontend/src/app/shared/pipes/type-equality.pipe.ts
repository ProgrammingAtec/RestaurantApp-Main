import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'typeEquality'
})
export class TypeEqualityPipe implements PipeTransform {
  transform(value: any, ...args: any[]): boolean {
    let result: boolean = typeof value === typeof args[0];
    for (let i = 1; i < args.length - 1; i++) {
      if (result === false) return false;
      result = result && (typeof args[i] === typeof args[i + 1]);
    }
    return result;
  }
}
