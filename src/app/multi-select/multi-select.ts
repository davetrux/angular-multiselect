import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { MultiselectOption } from '../models/MultiselectOption';


@Component({
  selector: 'app-multi-select',
  imports: [],
  templateUrl: './multi-select.html',
  styleUrl: './multi-select.css',
})
export class MultiSelect implements OnInit {
  @Input() items!: MultiselectOption[];
  @Input() placeholder = 'Select';
  @Output() selectionChange = new EventEmitter<string[]>();

  public selectedOptions: string[] = [];
  public isOpen = false;

  private readonly elementRef: ElementRef = inject(ElementRef);

  ngOnInit(): void {
    for (const item of this.items) {
      if (item.selected) {
        this.selectedOptions.push(item.id);}
    }
    this.selectionChange.emit(this.selectedOptions);
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      this.toggleDropdown();
    } else if(event.key === 'Escape') {
      this.isOpen = false;
    }
  }

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  toggleOption(value: string): void {
    const index = this.selectedOptions.indexOf(value);
    if (index > -1) {
      this.selectedOptions.splice(index, 1);
    } else {
      this.selectedOptions.push(value);
    }
    this.selectionChange.emit(this.selectedOptions);
  }

  removeOption(value: string, event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    const index = this.selectedOptions.indexOf(value);
    if (index > -1) {
      this.selectedOptions.splice(index, 1);
      this.selectionChange.emit(this.selectedOptions);
    }
  }

  isSelected(value: string): boolean {
    return this.selectedOptions.includes(value);
  }

  getSelectedLabels(): MultiselectOption[] {
    return this.items.filter((option) => this.selectedOptions.includes(option.id));
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }
}
