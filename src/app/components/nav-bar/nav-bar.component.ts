import { Component } from '@angular/core';
import { faCartShopping, faArrowRightToBracket, faListUl } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  faCartShopping = faCartShopping;
  faArrowRightToBracket = faArrowRightToBracket;
  faListUl = faListUl;
}
