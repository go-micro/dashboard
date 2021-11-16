import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'json',
  pure: false,
})
export class JsonPipe implements PipeTransform {
  transform(d: any, args?: any[]): string {
    if (!d) {
      return '';
    }
    return this.stringify(d, { indent: ' ' });
  }

  stringify(input: any, options: any, pad = ''): string {
    const seen: [] = [];
    options.indent = options.indent || '\t';

    let tokens: any;
    if (options.inlineCharacterLimit === undefined) {
      tokens = {
        newLine: '\n',
        newLineOrSpace: '\n',
        pad,
        indent: pad + options.indent,
      };
    } else {
      tokens = {
        newLine: '@@__STRINGIFY_OBJECT_NEW_LINE__@@',
        newLineOrSpace: '@@__STRINGIFY_OBJECT_NEW_LINE_OR_SPACE__@@',
        pad: '@@__STRINGIFY_OBJECT_PAD__@@',
        indent: '@@__STRINGIFY_OBJECT_INDENT__@@',
      };
    }

    const expandWhiteSpace = (s: string) => {
      if (options.inlineCharacterLimit === undefined) {
        return s;
      }

      const oneLined = s
        .replace(new RegExp(tokens.newLine, 'g'), '')
        .replace(new RegExp(tokens.newLineOrSpace, 'g'), ' ')
        .replace(new RegExp(tokens.pad + '|' + tokens.indent, 'g'), '');

      if (oneLined.length <= options.inlineCharacterLimit) {
        return oneLined;
      }

      return s
        .replace(new RegExp(tokens.newLine + '|' + tokens.newLineOrSpace, 'g'), '\n')
        .replace(new RegExp(tokens.pad, 'g'), pad)
        .replace(new RegExp(tokens.indent, 'g'), pad + options.indent);
    };

    if (seen.indexOf(<never>input) !== -1) {
      return '"[Circular]"';
    }

    if (
      input === null ||
      input === undefined ||
      typeof input === 'number' ||
      typeof input === 'boolean' ||
      typeof input === 'function' ||
      typeof input === 'symbol' ||
      this.isRegexp(input)
    ) {
      return String(input);
    }

    if (input instanceof Date) {
      return `new Date('${input.toISOString()}')`;
    }

    if (Array.isArray(input)) {
      if (input.length === 0) {
        return '[]';
      }

      seen.push(<never>input);

      const ret =
        '[' +
        tokens.newLine +
        input
          .map((el, i) => {
            const eol = input.length - 1 === i ? tokens.newLine : ',' + tokens.newLineOrSpace;

            let value = this.stringify(el, options, pad + options.indent);
            if (options.transform) {
              value = options.transform(input, i, value);
            }

            return tokens.indent + value + eol;
          })
          .join('') +
        tokens.pad +
        ']';

      seen.pop();

      return expandWhiteSpace(ret);
    }

    if (this.isObj(input)) {
      const keys: Array<any> = Object.keys(input);
      let objKeys = keys.concat(Object.getOwnPropertySymbols(input));

      if (options.filter) {
        objKeys = objKeys.filter((el) => options.filter(input, el));
      }

      if (objKeys.length === 0) {
        return '{}';
      }

      seen.push(<never>input);

      const ret =
        '{' +
        tokens.newLine +
        objKeys
          .map((el, i) => {
            const eol = objKeys.length - 1 === i ? tokens.newLine : ',' + tokens.newLineOrSpace;
            const isSymbol = typeof el === 'symbol';
            const isClassic = !isSymbol && /^[a-z$_][a-z$_0-9]*$/i.test(el);
            const key = isSymbol || isClassic ? el : this.stringify(el, options);

            let value = this.stringify(input[el], options, pad + options.indent);
            if (options.transform) {
              value = options.transform(input, el, value);
            }

            return tokens.indent + String(key) + ': ' + value + eol;
          })
          .join('') +
        tokens.pad +
        '}';

      seen.pop();

      return expandWhiteSpace(ret);
    }

    input = String(input).replace(/[\r\n]/g, (x) => (x === '\n' ? '\\n' : '\\r'));

    if (options.singleQuotes === false) {
      input = input.replace(/"/g, '\\"');
      return `"${input}"`;
    }

    input = input.replace(/\\?'/g, "\\'");
    return `'${input}'`;
  }

  private isObj(x: any): boolean {
    const type = typeof x;
    return x !== null && (type === 'object' || type === 'function');
  }

  private isRegexp(input: any): boolean {
    return Object.prototype.toString.call(input) === '[object RegExp]';
  }
}
