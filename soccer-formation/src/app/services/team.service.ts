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
    return setDoc(formationRef, {
      ...formationData,
      players: {} // Initialize players as an empty map
    });
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
      // Get the reference to the correct team collection
      const teamRef = collection(this.firestore, teamData.title); // Use team title as collection

      // Add the team data to Firestore without the formation in the field section
      await setDoc(doc(teamRef, teamData.formation), { // Use formation as document ID
        players: teamData.players.reduce((acc, player) => {
          acc[player.number] = { name: player.name, position: player.position }; // Map player number to object
          return acc;
        }, {})
      });
    } catch (error) {
      console.error('Error submitting team data:', error);
      throw new Error('Error submitting team data');
    }
  }
}
