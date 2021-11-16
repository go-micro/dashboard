import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'endpoint',
  pure: false,
})
export class EndpointPipe implements PipeTransform {
  transform(d: any, args?: any[]): string {
    return this.format(d);
  }

  format(v: any): string {
    if (!v || !v.values || !v.values.length) {
      return '{}';
    }

    const result = new Array<string>();
    v.values.forEach((value: any) => {
      result.push(this.formatEndpoint(value, 0));
    });
    return `{\n${result.join('')}}`;
  }

  formatEndpoint(v: any, r: number): string {
    const fparts = new Array<string>();
    for (let i = 0; i < r + 1; i++) {
      fparts.push('  ');
    }
    if (!v.values || !v.values.length) {
      return `${fparts.join('')}${v.name} ${v.type}\n`;
    }
    fparts.push(`${v.name} ${v.type} {\n`);

    v.values.forEach((value: any) => {
      fparts.push(this.formatEndpoint(value, r + 1));
    });
    for (let i = 0; i < r + 1; i++) {
      fparts.push('  ');
    }
    fparts.push('}\n');
    return fparts.join('');
  }
}
