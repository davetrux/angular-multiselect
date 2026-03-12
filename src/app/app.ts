import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MultiSelect } from './multi-select/multi-select';
import { MultiselectOption } from './models/MultiselectOption';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MultiSelect],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  public items = signal<string[]>([]);
  public listOfDropdownItems = [
    {
      id: '1',
      label: 'First One',
      extra: 'Something about the first option',
      selected: false,
    },
    {
      id: '2',
      label: 'Second One',
      extra: 'Text about the second option',
      selected: true,
    },
    {
      id: '3',
      label: 'Third Option',
      extra: 'Explanation about the third option',
      selected: false,
    },
  ] satisfies MultiselectOption[];

  ngOnInit() {
    for(const item of this.listOfDropdownItems) {
      if (item.selected) {
        this.items().push(item.id);
      }
    }
  }

  selectionListener(selectedItems: string[]) {
    this.items.set(selectedItems);
  }

  getLabelForId(id: string) {
    const foundItem = this.listOfDropdownItems.find(item => item.id === id);
    if (foundItem) {
      return foundItem.label;
    }
    return '';
  }
}
