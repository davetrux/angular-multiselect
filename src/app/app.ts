import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MultiSelect } from './multi-select/multi-select';
import { MultiselectOption } from './multi-select/MultiselectOption';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MultiSelect],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('angular-multiselect');

  public listOfDropdownItems = [
    {
      id: '1',
      label: 'First One',
      extra: 'Something about the first option',
      selected: false
    },
    {
      id: '2',
      label: 'Second One',
      extra: 'Text about the second option',
      selected: true
    },
    {
      id: '3',
      label: 'Third Option',
      extra: 'Explanation about the third option',
      selected: false
    }
  ] satisfies MultiselectOption[];
}
