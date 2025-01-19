import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from './Layout/header/header.component'
import {Toast} from "primeng/toast";

@Component({
  selector: 'app-root',
    imports: [RouterOutlet, HeaderComponent, Toast],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'LaboRevision';
}
