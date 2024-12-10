import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-create-formation',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './createformation.component.html',
  styleUrl: './createformation.component.css'
})
export class CreateFormationComponent {
  formations: { [key: string]: string } = {
    "4-4-2": "assets/images/placeholder1.jpg",
    "4-3-3": "assets/images/placeholder1.jpg"
    // add more formations and upload correct image for each formation
  };

  availableFormations = Object.keys(this.formations);
  currentFormation = this.availableFormations[0]; // Default to the first formation

  backgroundImage(): string {
    return `url('${this.formations[this.currentFormation]}')`;
  }

  onFormationChange(event: Event) {
    this.currentFormation = (event.target as HTMLSelectElement).value;
  }
}