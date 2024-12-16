import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TeamService } from '../../services/team.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-savedformations',
  imports: [RouterModule, AsyncPipe],
  templateUrl: './savedformations.component.html',
  styleUrl: './savedformations.component.css'
})
export class SavedformationsComponent {
  public teamService = inject(TeamService);
}
