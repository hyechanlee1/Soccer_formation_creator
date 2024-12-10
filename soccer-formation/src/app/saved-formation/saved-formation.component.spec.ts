import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedFormationComponent } from './saved-formation.component';

describe('SavedFormationComponent', () => {
  let component: SavedFormationComponent;
  let fixture: ComponentFixture<SavedFormationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SavedFormationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SavedFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
