import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubstringServiceService {

  constructor() { }

  getBalancedSubstrings(S: string): string[] {
    const isBalanced = (substr: string): boolean => {
      if (new Set(substr).size !== 2) {
        return false;
      }

      const count: { [key: string]: number } = {};
      for (const char of substr) {
        count[char] = (count[char] || 0) + 1;
      }

      return new Set(Object.values(count)).size === 1;
    };

    const n = S.length;
    const result: string[] = [];
    let maxLength = 0;

    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j <= n; j++) {
        const substring = S.slice(i, j);
        if (isBalanced(substring)) {
          const length = substring.length;
          if (length > maxLength) {
            result.length = 0;
            result.push(substring);
            maxLength = length;
          } else if (length === maxLength) {
            result.push(substring);
          }
        }
      }
    }

    return result;
  }
}
