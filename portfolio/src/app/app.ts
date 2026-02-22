import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FaIconComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  ICONS = {
    github: faGithub,
    house: faHouse,
    linkedin: faLinkedin,
  }
}
