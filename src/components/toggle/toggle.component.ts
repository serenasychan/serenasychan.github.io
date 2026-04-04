import { Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-toggle',
  imports: [],
  template: `
    <div class="switch-container">
      <span class="label-left" [class.selected]="!toggleValue()">{{ leftLabel() }}</span>
      <label class="switch">
        <input type="checkbox"
               (change)="onToggleChange($event)">
        <span class="slider"></span>
      </label>
      <span class="label-right" [class.selected]="toggleValue()">{{ rightLabel() }}</span>
    </div>`,
  styleUrl: './toggle.component.scss',
})
export class ToggleComponent {
 leftLabel = input('Off');
 rightLabel = input('On');
 isToggleOn = output<boolean>();
 toggleValue = signal(false);

  onToggleChange(event: Event) {
   const checkbox = event.target as HTMLInputElement;
   this.toggleValue.set(checkbox.checked);
   this.isToggleOn.emit(checkbox.checked);
  }
}
