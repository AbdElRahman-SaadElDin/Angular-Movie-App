import { Component } from '@angular/core';
import { Navbar } from './components/navbar/navbar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Navbar, RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'Angular-Movie-App';
}
