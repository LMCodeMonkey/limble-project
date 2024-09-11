import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { User } from '../users.service';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, ReactiveFormsModule],
  template: `
    <article class="comment">
      <div class="comment-icon">
        <fa-icon [icon]="commentIcon"></fa-icon>
      </div>
      <div class="comment-text">
        <span>{{commentTextBeforeTag}}</span>
        <span class="tag">{{commentTagText}}</span>
        <span>{{commentTextAfterTag}}</span>
      </div>
      <div class="comment-metadata">
        {{commentObject?.author?.firstName}} {{commentObject?.author?.lastName}} - {{commentObject?.dateAdded | date}}
      </div>
      <div class="comment-seperator">
        <hr *ngIf="!isLastInList">
      </div>
    </article>
  `,
  styleUrls: ['./comment.component.css'],
})
export class CommentComponent {
  commentIcon = faComment;
  commentTextBeforeTag = '';
  commentTextAfterTag = '';
  commentTagText = '';
  commentObject: Comment | null = null;

  @Input() set comment(comment: Comment) {
    this.commentObject = comment;
    this.parseCommentParts(comment);
 }

  @Input() isLastInList!: boolean;

  private parseCommentParts(comment: Comment) {
    if (comment.taggedUser) {
      this.commentTagText = `@${comment?.taggedUser?.firstName}`;
      const userTagIndex = comment.text.indexOf(this.commentTagText);
      if (userTagIndex > 0) {
        this.commentTextBeforeTag = comment.text.substring(0, userTagIndex);
      }
      if (userTagIndex + this.commentTagText.length < comment.text.length) {
        this.commentTextAfterTag = comment.text.substring(userTagIndex + this.commentTagText.length, comment.text.length);
      }
    } else {
      this.commentTextBeforeTag = comment.text;
    }
  }
}

export interface Comment {
  id: number,
  text: string,
  dateAdded: number,
  author: User,
  taggedUser?: User,
}
