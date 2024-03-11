import { Component } from '@angular/core';
import { SubstringServiceService } from 'src/app/services/substring-service.service';

@Component({
  selector: 'app-substring',
  templateUrl: './substring.component.html',
  styleUrls: ['./substring.component.scss']
})
export class SubstringComponent {
  result: string[] = [];
  inputString: string = '';
  constructor(private substringService: SubstringServiceService) {}

  testFunction(S: string): void {
    this.result = this.substringService.getBalancedSubstrings(S);
    console.log(this.result);
  }
}
