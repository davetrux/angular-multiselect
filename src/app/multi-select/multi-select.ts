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
  public activeIndex = -1;

  private readonly elementRef: ElementRef = inject(ElementRef);

  ngOnInit(): void {
    for (const item of this.items) {
      if (item.selected) {
        this.selectedOptions.push(item.id);
      }
    }
    this.selectionChange.emit(this.selectedOptions);
  }

  get activeOptionId(): string {
    if (this.activeIndex >= 0 && this.activeIndex < this.items.length) {
      return `option-${this.items[this.activeIndex].id}`;
    }
    return '';
  }

  onKeyDown(event: KeyboardEvent): void {
    if (!this.isOpen) {
      if (event.key === 'Enter' || event.key === ' ') {
        this.isOpen = true;
        this.activeIndex = 0;
        event.preventDefault();
      }
      return;
    }

    switch (event.key) {
      case 'ArrowDown':
        this.activeIndex = Math.min(this.activeIndex + 1, this.items.length - 1);
        event.preventDefault();
        break;
      case 'ArrowUp':
        this.activeIndex = Math.max(this.activeIndex - 1, 0);
        event.preventDefault();
        break;
      case 'Enter':
      case ' ':
        if (this.activeIndex >= 0) {
          this.toggleOption(this.items[this.activeIndex].id);
        }
        event.preventDefault();
        break;
      case 'Escape':
      case 'Tab':
        this.isOpen = false;
        this.activeIndex = -1;
        break;
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
