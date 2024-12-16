import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TeamService, FirestoreRec } from '../../services/team.service';
import { MatCardModule } from '@angular/material/card';
import { DatePipe } from '@angular/common';

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
  imports: [RouterModule, MatCardModule, DatePipe],
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

}
