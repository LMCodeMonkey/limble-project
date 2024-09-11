import { Directive, ViewContainerRef, ComponentRef, ElementRef, Input, EventEmitter, Output } from '@angular/core';
import { TagListComponent } from './tag-list/tag-list.component';
import { User } from './users.service';

@Directive({
  selector: '[appTags]',
  standalone: true,
  host: {
    '(keydown)': 'detectTrigger($event)',
  }
})
export class TagsDirective {

  tagListOpen = false;
  tagListRef: ComponentRef<TagListComponent> | null;
  triggerPresent = false;
  triggerPostion = -1;
  searchTermEndPosition = -1;
  currentInputText = '';

  constructor(private viewContainerRef: ViewContainerRef, private _element: ElementRef,) {
    this.tagListRef = null;
  }

  @Input() triggerCharacter = '';

  @Input() set inputText(inputText: string) {
    this.currentInputText = inputText;
    this.filterUsers(inputText);
  };

  @Input() users: User[] = [];

  @Output() userTagged = new EventEmitter<UserTaggedEventPayload>();

  showTagList() {
    this.tagListOpen = true;
    this.triggerPresent = true;
    if (!this.tagListRef) {
      this.tagListRef = this.viewContainerRef.createComponent(TagListComponent);
      this.tagListRef.setInput('options', this.users);
      this.tagListRef.instance.optionSelectedEvent.subscribe((user: User) => this.handleUserSelected(user));
    }
    this.tagListRef.instance.activate();
  }

  hideTagList() {
    if (this.tagListRef) {
      this.tagListOpen = false;
      this.triggerPresent = false;
      this.triggerPostion = -1;
      this.tagListRef.instance.deactivate();
      this.searchTermEndPosition = -1;
    }
  }

  async detectTrigger(event: KeyboardEvent) {
    if (event.key === 'Shift') {
      return;
    }

    const cursorPosition = this._element.nativeElement.selectionStart;

    if (event.key === 'Backspace') {
      if (cursorPosition - 1 === this.triggerPostion) {
        this.hideTagList();
      } else if (cursorPosition <= this.triggerPostion) {
        this.triggerPostion -= 1;
        this.searchTermEndPosition -= 1;
      } else if (this.tagListOpen && cursorPosition > this.triggerPostion && cursorPosition <= this.searchTermEndPosition + 1) {
        this.searchTermEndPosition -= 1;
      }
      return;
    }

    if (!this.tagListOpen && event.key === this.triggerCharacter) {
      this.triggerPostion = cursorPosition;
      this.searchTermEndPosition = this.triggerPostion;
      this.showTagList();
      return;
    }

    if (this.tagListOpen && cursorPosition >= this.triggerPostion && cursorPosition <= this.searchTermEndPosition + 1) {
      this.searchTermEndPosition += 1;
    }
  }
  
  filterUsers(currentText: string) {
    const searchTerm = currentText.substring(this.triggerPostion + 1, this.searchTermEndPosition + 2);
    this.tagListRef?.instance.filterOptions(searchTerm);
  }

  handleUserSelected(user: User) {
    const currentText: string = this.getCurrentTextInput();
    const newText = currentText
      .slice(0, this.triggerPostion + 1)
      .concat(user.firstName)
      .concat(currentText.slice(this.searchTermEndPosition + 1));

    this.userTagged.emit({ taggedUser: user, newText });
    this.hideTagList();
  }

  getCurrentTextInput() {
    return this.currentInputText;
  }
}

export interface UserTaggedEventPayload {
  taggedUser: User,
  newText: string,
}
