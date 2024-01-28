import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NgOptimizedImage, TitleCasePipe} from "@angular/common";
import {SlotGameComponent} from "./components/slotgame/slot-game.component";
import {HeaderComponent} from "./components/header/header.component";
import {FooterComponent} from "./components/footer/footer.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgOptimizedImage, TitleCasePipe, SlotGameComponent, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {


}
