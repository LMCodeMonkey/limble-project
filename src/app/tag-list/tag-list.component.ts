import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import {CommonModule} from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import {User} from '../users.service';

@Component({
  selector: 'app-tag-list',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  template: `
    <ul #tagList *ngIf="active" class="tag-list">
      <li *ngFor="let option of filteredOptions; let i = index">
        <button class="option" (click)="optionSelected(option, $event)">
          <fa-icon [icon]="option.icon"></fa-icon>
          <div class="option-name">{{option.firstName}} {{option.lastName}}</div>
        </button>
      </li>
    </ul>
  `,
  styleUrls: ['./tag-list.component.css'],
  host: {
    '(focusout)': 'deactivate()',
  }
})
export class TagListComponent {
  filteredOptions: User[] = [];

  @Input() options: User[] = [];

  @Input() active = false;

  @ViewChild('tagList', { static: true }) tagListRef: ElementRef | undefined;

  @Output() optionSelectedEvent = new EventEmitter<User>();

  constructor() {
    this.filteredOptions = this.options;
  }

  optionSelected(option: User, event: Event) {
    event.preventDefault();
    this.optionSelectedEvent.emit(option);
  }

  deactivate() {
    this.filteredOptions = this.options;
    this.active = false;
  }

  activate() {
    this.tagListRef?.nativeElement.focus();
    this.active = true;
  }

  filterOptions(searchTerm: string) {
    if (searchTerm) {
      this.filteredOptions = this.options.filter((user: User) => user.firstName.toLowerCase().includes(searchTerm.toLowerCase()));
    } else {
      this.filteredOptions = this.options
    }
  }
}
