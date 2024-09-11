import { TestBed } from '@angular/core/testing';
import { Comment, CommentComponent } from './comment.component';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { formatDate } from '@angular/common';

const testCommentWithoutTag: Comment = {
  id: 1,
  text: 'hi',
  dateAdded: 1725823023000,
  author: {
    firstName: 'John',
    lastName: 'Smith',
    id: 2,
  },
};

const testCommentWithTag: Comment = {
  ...testCommentWithoutTag,
  text: 'hi @Barney please help',
  taggedUser: {
    firstName: 'Barney',
    lastName: 'Melvin',
    id: 1,
    icon: faUser,
  }
};

interface CommentTextDisplayTestInput {
  comment: Comment;
  expectedBeforeTag: string;
  expectedAfterTag: string;
  expectedTag: string;
}

const shouldDisplayCommentText = ({ comment, expectedBeforeTag,  expectedAfterTag, expectedTag }: CommentTextDisplayTestInput) => {
  const fixture = TestBed.createComponent(CommentComponent);
  const commentInstance = fixture.componentInstance;
  commentInstance.comment = comment;
  fixture.detectChanges();
  const compiled = fixture.debugElement.nativeElement;
  expect(compiled.innerText).toContain(comment.text);
  expect(compiled.innerText).toContain(comment.author.firstName);
  expect(compiled.innerText).toContain(comment.author.lastName);
  expect(compiled.innerText).toContain(formatDate(comment.dateAdded, 'mediumDate', 'en-us', 'est'));
  expect(commentInstance.commentTextBeforeTag).toEqual(expectedBeforeTag);
  expect(commentInstance.commentTextAfterTag).toEqual(expectedAfterTag);
  expect(commentInstance.commentTagText).toEqual(expectedTag);
}

describe('CommentComponent', () => {
  beforeEach((() => {
    TestBed.configureTestingModule({
      imports: [CommentComponent]
    }).compileComponents();
 }));

  it(`should display comment text when there is no tag`, () => {
    shouldDisplayCommentText({
      comment: testCommentWithoutTag,
      expectedBeforeTag: testCommentWithoutTag.text,
      expectedAfterTag: '',
      expectedTag: '',
    });
  });

  it(`should display comment text when there is a tag`, () => {
    shouldDisplayCommentText({
      comment: testCommentWithTag,
      expectedBeforeTag: 'hi ',
      expectedAfterTag: ' please help',
      expectedTag: `@${testCommentWithTag?.taggedUser?.firstName}`,
    });
  });

});