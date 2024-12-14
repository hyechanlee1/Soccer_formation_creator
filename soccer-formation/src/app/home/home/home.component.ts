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
  newPlayerPosition: string = '';
  newSubPlayerName: string = '';

  // Lists to store players and sub-players
  players: { [number: string]: { name: string; position: string } } = {};
  newPlayer = { number: null, name: '', position: '' }; // Define newPlayer
  playersMap = new Map(); // Define playersMap
  subplayers: { name: string }[] = [];

  // Current section and formation tracking
  currentSection: string = 'styles';
  availableFormations = Object.keys(this.formations);
  currentFormation = this.availableFormations[0] || ''; // Default formation

  constructor(private teamService: TeamService) { }

  // Utility to reset the form after submission
  resetForm() {
    this.teamTitle = '';
    this.teamColor = '#ffffff';
    this.players = {};
    this.subplayers = [];
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

  // You can trigger this whenever the teamTitle changes
  onTeamTitleChange() {
    this.playersMap.clear();
  }

  // Handle changes in formation selection
  onFormationChange(event: Event) {
    this.currentFormation = (event.target as HTMLSelectElement).value;
    this.playersMap.clear();
  }

  // Add a player to the map
  addPlayer() {
    if (this.newPlayer.number !== null &&
      this.newPlayer.number !== undefined &&
      this.newPlayer.name.trim() &&
      this.newPlayer.position.trim()) {
      this.playersMap.set(this.newPlayer.number, {
        name: this.newPlayer.name,
        position: this.newPlayer.position
      });
      this.newPlayer = { number: null, name: '', position: '' };
    } else {
      alert('Please fill in all player details.');
    }
  }

  // Add a sub-player
  addSubPlayer() {
    if (this.newSubPlayerName.trim()) {
      this.subplayers.push({ name: this.newSubPlayerName });
      this.newSubPlayerName = '';
    } else {
      alert('Please enter a sub-player name.');
    }
  }

  // Delete a player by number
  deletePlayer(playerNumber: string) {
    if (this.playersMap.has(playerNumber)) {
      this.playersMap.delete(playerNumber);
    } else {
      alert('Player not found.');
    }
  }

  // Submit team data to the TeamService
  async submitTeam() {
    try {
      // Debugging: Log the playersMap to check its contents
      console.log('Players Map before submission:', Array.from(this.playersMap.entries()));

      // Ensure necessary data is available
      if (!this.teamTitle || this.playersMap.size === 0) {
        alert('Please ensure all team details are provided.');
        return;
      }

      // Prepare team data to be submitted
      const teamData = {
        title: this.teamTitle,
        formation: this.currentFormation,
        players: Array.from(this.playersMap.entries()).map(([number, player]) => ({
          number: number,
          name: player.name,
          position: player.position
        })),
        subplayers: this.subplayers // Array of sub-players
      };

      // Submit the data to the TeamService
      await this.teamService.submitTeam(teamData);

      // Inform the user of successful submission
      alert('Team submitted successfully!');

      // Reset the form after submission
      this.resetForm();
    } catch (error) {
      // Handle any errors that occur during submission
      console.error('Error submitting team:', error);
      alert('An error occurred while submitting the team. Please try again.');
    }
  }

  // Method to get the keys of playersMap
  getPlayersCount(): number {
    return this.playersMap.size; // Return the number of players in the Map
  }
}
