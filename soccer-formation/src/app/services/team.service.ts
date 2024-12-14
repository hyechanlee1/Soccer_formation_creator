import { Injectable } from '@angular/core';
import { Firestore, collection, updateDoc, doc, getDoc, setDoc } from '@angular/fire/firestore';

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

  // Delete a player from a team in a specific formation using a map
  async deletePlayer(formation: string, teamId: string, playerNumber: number) {
    const teamRef = doc(this.firestore, `formations/${formation}/teams/${teamId}`);

    // Fetch the current team data
    const docSnapshot = await getDoc(teamRef);
    if (docSnapshot.exists()) {
      const teamData = docSnapshot.data();
      const playersMap = teamData?.['players']; // Fetch the players map

      if (playersMap && playersMap[playerNumber]) {
        delete playersMap[playerNumber]; // Remove the player by key (player number)

        // Update the team's players map
        await updateDoc(teamRef, {
          players: playersMap
        });
      }
    }
  }

  // Add a player to a team in a specific formation using a map
  async addPlayer(formation: string, teamId: string, playerNumber: number, playerName: string, playerPosition: string) {
    const teamRef = doc(this.firestore, `formations/${formation}/teams/${teamId}`);

    // Fetch the current team data
    const docSnapshot = await getDoc(teamRef);
    let playersMap: { [key: number]: { name: string; position: string } } = {};

    if (docSnapshot.exists()) {
      const teamData = docSnapshot.data();
      playersMap = teamData?.['players'] || {}; // Fetch existing players map or initialize as empty
    }

    // Add or update the player in the map
    playersMap[playerNumber] = { name: playerName, position: playerPosition };

    // Update the team's players map
    await updateDoc(teamRef, {
      players: playersMap
    });
  }

  // Submit team data
  async submitTeam(teamData: { title: string, formation: string, players: any[], subplayers: any[] }) {
    try {
      // Get the reference to the correct team collection and formation
      const teamRef = collection(this.firestore, `formations/${teamData.formation}/teams`);

      // Add the team data to Firestore (or use `setDoc` to overwrite if you prefer)
      await setDoc(doc(teamRef), {
        title: teamData.title,
        formation: teamData.formation,
        players: teamData.players,
        subplayers: teamData.subplayers
      });
    } catch (error) {
      console.error('Error submitting team data:', error);
      throw new Error('Error submitting team data');
    }
  }
}
