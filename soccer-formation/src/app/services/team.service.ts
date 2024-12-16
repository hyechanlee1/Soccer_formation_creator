import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc, query, collectionData, orderBy, where, getDocs } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

// Define a type for player
export interface FirestoreRec {
  teamTitle: string,
  formation: string,
  playerNumber: string,
  playerName: string,
  playerPosition: string
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
    playerPosition: string
  ) {
    try {
      // Check if the player already exists by querying Firestore
      const playerQuery = query(
        this.teamCollection,
        where('playerName', '==', playerName),
        where('playerNumber', '==', playerNumber),
      );

      const querySnapshot = await getDocs(playerQuery);

      if (!querySnapshot.empty) {
        // Player already exists, return or notify
        alert(`${playerNumber} - ${playerName} player already exists.`);
        return;
      }

      // Check if the subPlayer already exists (only for sub-players)
      if (playerPosition === 'Substitute') {
        const subPlayerQuery = query(
          this.teamCollection,
          where('playerName', '==', playerName),
          where('playerPosition', '==', 'Substitute')
        );

        const subPlayerQuerySnapshot = await getDocs(subPlayerQuery);

        if (!subPlayerQuerySnapshot.empty) {
          // Sub-player already exists, return or notify
          alert(`${playerNumber} - ${playerName} sub-player already exists.`);
          return;
        }
      }

      // Submit the team data to Firestore
      await addDoc(this.teamCollection, {
        teamTitle: teamTitle,
        formation: formation,
        playerName: playerName,
        playerNumber: playerNumber,
        playerPosition: playerPosition
      });
      alert('Team submitted successfully')

    } catch (error) {
      console.error('Error submitting team data:', error);
      throw new Error('Error submitting team data');
    }
  }
}
