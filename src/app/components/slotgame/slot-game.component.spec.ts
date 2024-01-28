import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SlotGameComponent } from './slot-game.component';

describe('SlotgameComponent', () => {
  let component: SlotGameComponent;
  let fixture: ComponentFixture<SlotGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlotGameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlotGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
