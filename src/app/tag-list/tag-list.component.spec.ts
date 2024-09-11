import { TestBed } from '@angular/core/testing';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { TagListComponent } from './tag-list.component';
import { By } from '@angular/platform-browser';

const testOptions = [
  {
    firstName: 'Ted',
    lastName: 'Johnson',
    icon: faUser,
    id: 1,
  },
  {
    firstName: 'Bobby',
    lastName: 'Franklin',
    icon: faUser,
    id: 2,
  },
]

describe('TagListComponent', () => {
  beforeEach((() => {
    TestBed.configureTestingModule({
      imports: [TagListComponent]
    }).compileComponents();
 }));

  it(`should initialize without rendering list`, () => {
    const fixture = TestBed.createComponent(TagListComponent);
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.tag-list'))).toBeNull();
  });

  it(`should display list when activated`, () => {
    const fixture = TestBed.createComponent(TagListComponent);
    const tagListInstance = fixture.componentInstance;
    tagListInstance.filteredOptions = testOptions;

    tagListInstance.activate();
    fixture.detectChanges();
    
    expect(fixture.debugElement.query(By.css('.tag-list'))).not.toBeNull();
    expect(fixture.debugElement.queryAll(By.css('.tag-list li')).length).toEqual(2);

    testOptions.forEach(({ lastName, firstName }) => {
      expect(fixture.debugElement.nativeElement.innerText).toContain(`${firstName} ${lastName}`);
    })
  });

  it(`should not display list when deactivated`, () => {
    const fixture = TestBed.createComponent(TagListComponent);
    const tagListInstance = fixture.componentInstance;
    tagListInstance.filteredOptions = testOptions;

    tagListInstance.activate();
    tagListInstance.deactivate();
    fixture.detectChanges();
    
    expect(fixture.debugElement.query(By.css('.tag-list'))).toBeNull();
  });

  it(`should filter list`, () => {
    const fixture = TestBed.createComponent(TagListComponent);
    const tagListInstance = fixture.componentInstance;
    tagListInstance.options = testOptions;

    tagListInstance.activate();
    tagListInstance.filterOptions('TE');
    fixture.detectChanges();
    
    expect(fixture.debugElement.query(By.css('.tag-list'))).not.toBeNull();
    expect(fixture.debugElement.queryAll(By.css('.tag-list li')).length).toEqual(1);

    const filteredOutOption = testOptions[1];
    expect(fixture.debugElement.nativeElement.innerText).not.toContain(`${filteredOutOption.firstName} ${filteredOutOption.lastName}`);
    const remainingOption = testOptions[0];
    expect(fixture.debugElement.nativeElement.innerText).toContain(`${remainingOption.firstName} ${remainingOption.lastName}`);
  });
});