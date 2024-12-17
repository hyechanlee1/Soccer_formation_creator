import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TeamService, FirestoreRec } from '../../services/team.service';
import { MatCardModule } from '@angular/material/card';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';


interface Formation {
  name: string;
  players: FirestoreRec[];
  timestamp: any;
}
interface GroupedTeams {
  teamTitle: string;
  formations: Formation[];
}
@Component({
  selector: 'app-savedformations',
  imports: [RouterModule, MatCardModule, DatePipe, CommonModule],
  templateUrl: './savedformations.component.html',
  styleUrl: './savedformations.component.css'
})
export class SavedformationsComponent {
  groupedTeams: GroupedTeams[] = [];

  constructor(private teamService: TeamService) {
    // Fetch and group teams in the constructor
    this.teamService.teams$.subscribe((teams) => {
      this.groupedTeams = this.groupTeamsByTitle(teams);
    });
  }

  private groupTeamsByTitle(teams: FirestoreRec[]): GroupedTeams[] {
    const grouped: { [key: string]: Formation[] } = {};

    // Group players by teamTitle
    teams.forEach((team) => {
      if (!grouped[team.teamTitle]) {
        grouped[team.teamTitle] = [];
      }
      // Check if the formation already exists for this team
      const formationIndex = grouped[team.teamTitle].findIndex(
        (formation) => formation.name === team.formation // Assuming team has a `formationName` property
      );

      if (formationIndex === -1) {
        // If formation doesn't exist, create it
        grouped[team.teamTitle].push({
          name: team.formation, // Assuming `formationName` is a field in `FirestoreRec`
          timestamp: team.timestamp,
          players: [team],
        });
      } else {
        // If formation exists, add player to the existing formation
        grouped[team.teamTitle][formationIndex].players.push(team);
      }
    });

    // Convert the grouped object into an array of GroupedTeams
    return Object.keys(grouped).map((teamTitle) => ({
      teamTitle,
      formations: grouped[teamTitle],
    }));
  }
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
  backgroundImage(formation:string): string {
    return `${this.formations[formation]}`;
  }

}
