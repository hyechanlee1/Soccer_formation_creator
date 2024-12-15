import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc, query, collectionData, orderBy, where, getDocs } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

// Define a type for player
export interface FirestoreRec {
  teamTitle: string,
  formation: string,
  playerNumber: number,
  playerName: string,
  playerPosition: string,
  subPlayer?: string
}

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  public teams$: Observable<FirestoreRec[]>;

  private firestore: Firestore = inject(Firestore);

  teamCollection = collection(this.firestore, 'teams')

  constructor() {
    const q = query(this.teamCollection, orderBy('teamTitle'));
    this.teams$ = collectionData(q, { idField: 'id' }) as Observable<FirestoreRec[]>;
  }

  // Submit team data
  async submitTeam(
    teamTitle: string,
    formation: string,
    playerName: string,
    playerNumber: string,
    playerPosition: string,
    subPlayer?: string // subPlayer is optional
  ) {
    try {
      // Check if the player already exists by querying Firestore
      const playerQuery = query(
        this.teamCollection,
        where('playerName', '==', playerName),
        where('playerNumber', '==', playerNumber)
      );

      const querySnapshot = await getDocs(playerQuery);

      if (!querySnapshot.empty) {
        // Player already exists, return or notify
        console.log('Player already exists.');
        return;
      }

      // Create the team data object
      const teamData: { [key: string]: any } = {
        teamTitle: teamTitle,
        formation: formation,
        playerName: playerName,
        playerNumber: playerNumber,
        playerPosition: playerPosition
      };

      // Only add subPlayer to the object if it exists
      if (subPlayer) {
        teamData['subPlayer'] = subPlayer;
      }

      // Submit the team data to Firestore
      await addDoc(this.teamCollection, teamData);

    } catch (error) {
      console.error('Error submitting team data:', error);
      throw new Error('Error submitting team data');
    }
  }
}
