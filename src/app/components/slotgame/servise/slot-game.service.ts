import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import SlotGame from "./game/slotGame";
import {SpinAction} from "./enums/spin.action";

@Injectable({
  providedIn: 'root'
})
export class SlotGameService {
  public spinAction$: BehaviorSubject<SpinAction> = new BehaviorSubject<SpinAction>(SpinAction.SERVICE_START);
  private app: SlotGame;

  createApp(container: any): SlotGame {
    if (!this.app) {
      this.app = new SlotGame(container, this.spinAction$);
    }
    return this.app;
  }

  spin() {
    this.app.startSpin();
  }

  destroy() {
    this.app && this.app.destroy();
  }
}
