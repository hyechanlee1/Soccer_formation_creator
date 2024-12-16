import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc, query, collectionData, orderBy, where, getDocs, Timestamp } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

// Define a type for player
export interface FirestoreRec {
  teamTitle: string,
  formation: string,
  playerNumber: string,
  playerName: string,
  playerPosition: string,
  timestamp: Timestamp
}

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  public teams$: Observable<FirestoreRec[]>;

  private firestore: Firestore = inject(Firestore);

  teamCollection = collection(this.firestore, 'teams')

  constructor() {
    const teamQuery = query(this.teamCollection, orderBy('teamTitle'));
    this.teams$ = collectionData(teamQuery, { idField: 'id' }) as Observable<FirestoreRec[]>;
  }

  // Submit team data
  async submitTeam(
    teamTitle: string,
    formation: string,
    playerName: string,
    playerNumber: string,
    playerPosition: string,
  ) {
    try {
      // Check if the player already exists by querying Firestore
      const duplicateCheckQuery = query(
        this.teamCollection,
        where('playerName', '==', playerName),
        where('playerNumber', '==', playerNumber),
        where('teamTitle', '==', teamTitle),
        where('formation', '==', formation)
      );

      const duplicateSnapshot = await getDocs(duplicateCheckQuery);

      if (!duplicateSnapshot.empty) {
        // Player already exists, return or notify
        alert(`${playerNumber} - ${playerName} already exists in the team.`);
        return;
      }

      // Submit the team data to Firestore
      await addDoc(this.teamCollection, {
        teamTitle,
        formation,
        playerName,
        playerNumber,
        playerPosition,
        timestamp: new Date()
      });

      alert('Team submitted successfully')

    } catch (error) {
      console.error('Error submitting team data:', error);
      throw new Error('Error submitting team data');
    }
  }
}
