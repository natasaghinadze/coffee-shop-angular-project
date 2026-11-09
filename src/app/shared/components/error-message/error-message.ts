import { Component, input } from '@angular/core';

@Component({
  selector: 'app-error-message',
  imports: [],
  styles: [`
    small{
      color: #a33b3b;
      font-size: 0.85rem;
      margin-top: 4px;
      display: flex;
      align-items: center;
      gap: 4px;
    }
  `],
  templateUrl: './error-message.html'
})
export class ErrorMessage {
  public errorMessage = input('')
}
