import { Component } from '@angular/core';

@Component({
  selector: 'app-fibonacci',
  templateUrl: './fibonacci.component.html',
  styleUrls: ['./fibonacci.component.scss']
})
export class FibonacciComponent {
  position: number | undefined;
  fibonacciValue: number | undefined;

  constructor() { }

  ngOnInit(): void { }

  calculate() {
    if (this.position !== undefined && this.position >= 0) {
      this.fibonacciValue = this.fibonacci(this.position);
    }
  }

  private fibonacci(n: number, memo: { [key: number]: number } = {}): number {
    if (n <= 1) {
      return n;
    }

    if (memo[n]) {
      return memo[n];
    }

    memo[n] = this.fibonacci(n - 1, memo) + this.fibonacci(n - 2, memo);
    return memo[n];
  }
}
