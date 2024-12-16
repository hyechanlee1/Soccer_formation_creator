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
  PlayerName: string = '';
  PlayerNumber: string = '';
  PlayerPosition: string = '';
  SubPlayerName: string = '';
  SubPlayerNumber: string = '';

  // Current section and formation tracking
  currentSection: string = 'styles';
  availableFormations = Object.keys(this.formations);
  currentFormation = this.availableFormations[0]; // Default formation

  // Array to store added players
  players: Array<{
    name: string;
    number: string;
    position: string;
  }> = [];

  // Array to store added subplayers
  subNames: Array<{
    name: string;
    number: string;
  }> = []

  constructor(private teamService: TeamService) { }

  // Utility to reset the form after submission
  resetForm() {
    this.PlayerName = '';
    this.PlayerNumber = '';
    this.PlayerPosition = '';
    this.SubPlayerName = '';
    this.SubPlayerNumber = '';
    this.currentFormation = this.availableFormations[0];
  }

  // Get the current formation background image URL
  backgroundImage(): string {
    return `url('${this.formations[this.currentFormation]}')`;
  }

  // Toggle section visibility for styling, players, etc.
  toggleSection(section: string) {
    this.currentSection = section;
  }

  // Handle changes in formation selection
  onFormationChange(event: Event) {
    this.currentFormation = (event.target as HTMLSelectElement).value;
  }

  onTeamTitleChange(newTitle: string) {
    // Trim the input and assign it to the teamTitle property
    this.teamTitle = newTitle.trim();

    // Optional: Add validation logic if needed
    if (this.teamTitle.length === 0) {
      alert('Team title cannot be empty.');
    }
  }


  // Add a player to the team
  addPlayer() {
    // Validate required fields
    if (!this.PlayerName.trim() || !this.PlayerNumber || !this.PlayerPosition.trim()) {
      alert('Please ensure all player details are provided.');
      return;
    }

    // Check if the player already exists in the players list (based on name and number)
    const playerExists = this.players.some(player =>
      player.name === this.PlayerName.trim() && player.number === this.PlayerNumber
    );

    if (playerExists) {
      alert('This player has already been added.');
      return;
    }

    // Add player to the list
    this.players.push({
      name: this.PlayerName.trim(),
      number: this.PlayerNumber,
      position: this.PlayerPosition.trim(),
    });

    // Reset fields after adding the player
    this.PlayerName = '';
    this.PlayerNumber = '';
    this.PlayerPosition = '';

    alert('Player added successfully!');
  }


  addSubPlayer() {
    // Validate inputs
    if (!this.SubPlayerName.trim() || !this.SubPlayerNumber) {
      alert('Please provide sub-player name.');
      return;
    }

    // Check if the sub-player already exists in the subNames array
    const subPlayerExists = this.subNames.some(subPlayer =>
      subPlayer.name === this.SubPlayerName.trim() && subPlayer.number === this.SubPlayerNumber);

    if (subPlayerExists) {
      alert('This sub-player has already been added.');
      return;
    }

    // Add sub-player to the array
    this.subNames.push({
      name: this.SubPlayerName.trim(),
      number: this.SubPlayerNumber
    });

    // Clear input fields after adding the sub-player
    this.SubPlayerName = '';
    this.SubPlayerNumber = '';

    alert(`Sub-player added successfully!`);
  }


  deletePlayer(player: any): void {
    const index = this.players.indexOf(player);
    if (index !== -1) {
      this.players.splice(index, 1);  // Removes the player from the array
    }
  }

  deletesubPlayer(subPlayer: any): void {
    const index = this.subNames.indexOf(subPlayer);
    if (index !== -1) {
      this.subNames.splice(index, 1);  // Removes the subplayer from the array
    }
  }


  // Submit team data to the TeamService
  async submitTeam() {
    try {
      // Check if there are players in the team
      if (this.players.length === 0 && this.subNames.length === 0) {
        alert('There are no players or sub-players to submit.');
        return;
      }

      if (this.players.length > 0) {
        for (const player of this.players) {
          await this.teamService.submitTeam(
            this.teamTitle.trim(),
            this.currentFormation,
            player.name,
            player.number,
            player.position
          );
        };
      }

      if (this.subNames.length > 0) {
        for (const subPlayer of this.subNames) {
          await this.teamService.submitTeam(
            this.teamTitle.trim(),
            this.currentFormation,
            subPlayer.name,
            subPlayer.number,
            'Substitute'
          );
        };
      }

      // Reset the form after submission
      this.resetForm();
    } catch (error) {
      // Handle any errors that occur during submission
      console.error('Error submitting team and sub-players:', error);
      alert('An error occurred while submitting the team. Please try again.');
    }
  }
}
