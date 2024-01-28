import {afterRender, Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild,} from '@angular/core';
import {SlotGameService} from "./servise/slot-game.service";
import {NgIf, NgTemplateOutlet} from "@angular/common";
import {SpinAction} from "./servise/enums/spin.action";
import {StateLabels} from "./servise/enums/state.labels";

@Component({
  selector: 'app-slotgame',
  standalone: true,
  styleUrl: './slot-game.component.less',
  imports: [
    NgIf,
    NgTemplateOutlet
  ],
  templateUrl: './slot-game.component.html'
})
export class SlotGameComponent implements OnDestroy, OnInit {
  isSpinning: boolean = true;
  @ViewChild('spinButton') spinButton: ElementRef;
  private slotGameService: SlotGameService;

  constructor(private elementRef: ElementRef, private ngZone: NgZone, _slotGameService: SlotGameService) {
    this.slotGameService = _slotGameService;
    // runOutsideAngular to save PIXI requestAnimationFrame
    afterRender(() => {
      this.ngZone.runOutsideAngular(() => {
        this.slotGameService.createApp(this.elementRef.nativeElement);
      });
    })
  }

  ngOnInit() {
    this.slotGameService.spinAction$.subscribe(this.unLockSpinButton);
  }

  onSpinButtonClick() {
    if (this.isSpinning) {
      return;
    }
    this.slotGameService.spin();
  }

  ngOnDestroy(): void {
    this.slotGameService.spinAction$.unsubscribe();
    this.slotGameService.destroy();
  }

  private unLockSpinButton = (message: SpinAction) => {
    if (message === SpinAction.SPIN_END || message === SpinAction.LOADING_ASSETS_END) {
      this.isSpinning = false;
      this.spinButton.nativeElement.disabled = false;
      this.spinButton.nativeElement.innerHTML = StateLabels.PRESS_SPIN;
    }
    if (message === SpinAction.LOADING_ASSETS_START) {
      this.spinButton.nativeElement.innerHTML = StateLabels.ASSETS_LOADING;
    }
    if (message === SpinAction.SPIN_START) {
      this.isSpinning = true;
      this.spinButton.nativeElement.disabled = true;
      this.spinButton.nativeElement.innerHTML = StateLabels.SPINNING_IN_PROGRESS;
    }
  }


}
