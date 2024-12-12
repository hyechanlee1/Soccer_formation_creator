import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  formations: { [key: string]: string } = {
    "3-1-4-2": "/assets/images/3-1-4-2.png",
    "3-4-3": "/assets/images/3-4-3.png",
    "3-5-2": "/assets/images/3-5-2.png",
    "4-1-2-1-2-narrow": "/assets/images/4-1-2-1-2 Narrow.png",
    "4-1-4-1": "/assets/images/4-1-4-1.png",
    "4-2-3-1": "/assets/images/4-2-3-1.png",
    "4-2-4": "/assets/images/4-2-4.png",
    "4-3-3": "/assets/images/4-3-3.png",
    "4-4-1-1": "/assets/images/4-4-1-1.png",
    "4-4-2-diamond": "/assets/images/4-4-2 Diamond.png",
    "4-4-2": "/assets/images/4-4-2.png",
    "5-3-2": "/assets/images/5-3-2.png",
    "5-4-1": "/assets/images/5-4-1.png"


    // add more formations and upload correct image for each formation
  };
  teamTitle: string = '';
  teamColor: string = '#ffffff'; // Default color (white)
  showPosition: boolean = false; // Checkbox for showing position
  showBackNumber: boolean = false; // Checkbox for showing back number
  showText: boolean = false; // Checkbox for showing text
  newPlayerNumber: number | null = null; // For new player number
  newPlayerName: string = 'UNKNOWN'; // For new player name
  newSubPlayerName: string = ''; // For new sub-player name
  players: { number: number, name: string }[] = []; // List of players
  subplayers: { name: string }[] = []; // List of sub players
  currentSection: string = 'styles';

  availableFormations = Object.keys(this.formations);
  currentFormation = this.availableFormations[0]; // Default to the first formation

  backgroundImage(): string {
    return `url('${this.formations[this.currentFormation]}')`;
  }

  onFormationChange(event: Event) {
    this.currentFormation = (event.target as HTMLSelectElement).value;
  }
  onColorChange() {
    console.log('Selected color:', this.teamColor);
  }
  toggleSection(section: string) {
    this.currentSection = section;
  }
  addPlayer() {
    if (this.newPlayerNumber != null && this.newPlayerName.trim() !== '') {
      const playerExists = this.players.some(player => player.number === this.newPlayerNumber);

      if (playerExists) {
        alert('Player number already exists!');
      } else {
        this.players.push({ number: this.newPlayerNumber, name: this.newPlayerName });
        this.newPlayerNumber = null; // Reset player number field
        this.newPlayerName = 'UNKNOWN'; // Reset player name field
      }
    } else {
      alert('Please enter both player number and name!');
    }
  }
  addSubPlayer() {
    if (this.newSubPlayerName.trim() !== '') {
      this.subplayers.push({ name: this.newSubPlayerName });
      this.newSubPlayerName = ''; // Reset sub-player name field
    } else {
      alert('Please enter a sub-player name!');
    }
  }
  deletePlayer(playerNumber: number) {
    // Remove the player with the specified number
    this.players = this.players.filter(player => player.number !== playerNumber);
  }
}
