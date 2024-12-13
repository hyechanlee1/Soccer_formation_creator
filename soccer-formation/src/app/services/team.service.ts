import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, updateDoc, doc, getDoc, getDocs, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private firestore: Firestore) { }

  // Method to add a formation document
  addFormation(teamTitle: string, formation: string, formationData: any): Promise<void> {
    // Reference to the collection for the team title
    const teamRef = collection(this.firestore, teamTitle);

    // Add the formation data as a document in the team collection
    const formationRef = doc(teamRef, formation);
    return setDoc(formationRef, formationData);
  }

  // Delete a player from a team in a specific formation
  async deletePlayer(formation: string, teamId: string, playerNumber: number) {
    const teamRef = doc(this.firestore, `formations/${formation}/teams/${teamId}`);

    // Fetch the current team data
    const docSnapshot = await getDoc(teamRef);
    if (docSnapshot.exists()) {
      const teamData = docSnapshot.data();
      const updatedPlayers = teamData?.['players'].filter((player: { number: number }) => player.number !== playerNumber);

      // Update the team's players list
      await updateDoc(teamRef, {
        players: updatedPlayers
      });
    }
  }
}

