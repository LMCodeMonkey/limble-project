import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { Comment, CommentComponent } from "../comment/comment.component";
import { TagsDirective, UserTaggedEventPayload } from '../tags.directive';
import { User, UsersService } from '../users.service';

@Component({
  selector: 'app-comment-list',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, ReactiveFormsModule, CommentComponent, TagsDirective],
  template: `
    <section class="comment-list-section">
      <h3 class="comment-list-header">Comments:</h3>
      <app-comment *ngFor="let comment of commentList; let last = last" [comment]="comment" [isLastInList]="last"></app-comment>
      <button *ngIf="!showAddCommentForm" type="button" class="primary add-comment-button" (click)="setShowAddCommentForm(true)">
        <fa-icon [icon]="addIcon"></fa-icon>
        Add Comment
      </button>
      <form *ngIf="showAddCommentForm" class="comment-form" [formGroup]="commentForm" (submit)="saveComment()">
        <h3 class="comment-list-header">New Comment:</h3>
        <textarea
          appTags
          [users]="users"
          [triggerCharacter]="triggerCharacter"
          (userTagged)="handleUserTagged($event)"
          [inputText]="commentForm.value.text || ''"
          id="commentText"
          formControlName="text">
        </textarea>
        <button type="submit" class="primary comment-form-button">Save Comment</button>
      </form>
    </section>
  `,
  styleUrls: ['./comment-list.component.css'],
})
export class CommentListComponent {
  commentIcon = faComment;
  addIcon = faPlus;
  showAddCommentForm = false;
  triggerCharacter = "@";
  users: User[] = [];
  commentList: Comment[] = [
    {
      id: 1,
      text: 'Hi there! This is a test comment with no tagged user.',
      dateAdded: 1725823023000,
      author: {
        firstName: 'John',
        lastName: 'Smith',
        id: 4
      },
    },
    {
      id: 2,
      text: `An example of a very long comment that should wrap. An example of a very long comment that should wrap.
        An example of a very long comment that should wrap. An example of a very long comment that should wrap.`,
      dateAdded: 1725218223000,
      author: {
        firstName: 'Jim',
        lastName: 'Bob',
        id: 5,
      },
    },
  ];

  commentForm = new FormGroup({
    text: new FormControl(''),
    taggedUser: new FormControl<User | null>(null),
  });

  constructor(usersService: UsersService) {
    this.users = usersService.getUsers();
  }

  setShowAddCommentForm(show: boolean) {
    this.showAddCommentForm = show;
  };

  saveComment() {
    const newComment: Comment = {
      id: this.commentList.length - 1,
      text: this.commentForm.value.text ?? '',
      dateAdded: Date.now(),
      author: {
        firstName: 'Jimmy',
        lastName: 'Dean',
        id: this.commentList.length + 10,
      },
    };

    if (this.commentForm.value.taggedUser) {
      newComment.taggedUser = this.commentForm.value.taggedUser;
    }

    this.commentList.push(newComment);

    this.commentForm.reset();
    this.setShowAddCommentForm(false);
  }

  handleUserTagged(eventPayload: UserTaggedEventPayload) {
    const { taggedUser, newText } = eventPayload;
    this.commentForm.setValue({ text: newText, taggedUser });
  }
}
