import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TeamService } from '../../services/team.service';  // Adjust the path if necessary

@Component({
  selector: 'app-home',
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  // Define the formations and their associated images
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
  };

  // Default team and form values
  teamTitle: string = '';
  teamColor: string = '#ffffff';
  showPosition: boolean = false;
  showBackNumber: boolean = false;
  showText: boolean = false;
  newPlayerNumber: number | null = null;
  newPlayerName: string = '';
  newSubPlayerName: string = '';

  // Lists to store players and sub-players
  players: { number: number, name: string }[] = [];
  subplayers: { name: string }[] = [];

  // Current section and formation tracking
  currentSection: string = 'styles';
  availableFormations = Object.keys(this.formations);
  currentFormation = this.availableFormations[0]; // Default formation

  constructor(private teamService: TeamService) { }

  // This method will clear the players list
  clearPlayersList() {
    this.players = [];
  }

  // Get the current formation background image URL
  backgroundImage(): string {
    return `url('${this.formations[this.currentFormation]}')`;
  }

  // You can trigger this whenever the teamTitle changes
  onTeamTitleChange() {
    this.clearPlayersList();
  }

  // Handle changes in formation selection
  onFormationChange(event: Event) {
    this.currentFormation = (event.target as HTMLSelectElement).value;
    this.clearPlayersList()
  }

  // Handle color change (potential for additional logic)
  onColorChange() {
    console.log('Selected color:', this.teamColor);
  }

  // Toggle section visibility for styling, players, etc.
  toggleSection(section: string) {
    this.currentSection = section;
  }

  // Method to add a player to the list
  addPlayer() {
    if (this.newPlayerName && this.newPlayerNumber !== null) {
      this.players.push({
        name: this.newPlayerName,
        number: this.newPlayerNumber
      });

      // Reset the input fields
      this.newPlayerName = '';
      this.newPlayerNumber = null;
    }
  }

  // Add a sub-player
  addSubPlayer() {
    if (this.newSubPlayerName.trim() !== '') {
      this.subplayers.push({ name: this.newSubPlayerName });
      this.newSubPlayerName = ''; // Reset sub-player name field
    } else {
      alert('Please enter a sub-player name!');
    }
  }

  // Delete a player by number
  deletePlayer(playerNumber: number) {
    // Filter out the player with the specified number
    this.players = this.players.filter(player => player.number !== playerNumber);
  }

  submitTeam() {
    if (this.teamTitle && this.players.length > 0) {
      const formationData = {
        formation: this.currentFormation,
        players: this.players,  // Add players data here
      };

      // Use teamTitle as collection, currentFormation as document
      this.teamService.addFormation(this.teamTitle, this.currentFormation, formationData)
        .then(() => {
          alert('Team successfully submitted!');
        })
        .catch((error: any) => {
          alert('Error adding team: ' + error.message);
          console.error('Error adding team: ', error);
        });
    }
  }
}
