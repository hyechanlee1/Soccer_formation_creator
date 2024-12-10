import { Component } from '@angular/core';

@Component({
  selector: 'app-saved-formation',
  templateUrl: './saved-formation.component.html',
  styleUrls: ['./saved-formation.component.scss']
})
export class SavedFormationComponent {
  formations = [
    { name: 'Formation 1', date: '2024-12-01' },
    { name: 'Formation 2', date: '2024-12-02' }
  ];

  loadFormation(formation: any) {
    console.log('Loading formation:', formation);
  }

  deleteFormation(formation: any) {
    console.log('Deleting formation:', formation);
    this.formations = this.formations.filter(f => f !== formation);
  }
}
