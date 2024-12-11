import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedformationsComponent } from './savedformations.component';

describe('SavedformationsComponent', () => {
  let component: SavedformationsComponent;
  let fixture: ComponentFixture<SavedformationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SavedformationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SavedformationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
