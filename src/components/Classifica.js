import React, { useEffect, useState } from "react";

const Classifica = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetchPlayers();
  });

  const fetchPlayers = async () => {
    try {
      const response = await fetch("players.json");
      const data = await response.json();

      // Ordina i giocatori in base al punteggio in ordine decrescente
      data.sort((a, b) => b.punteggio - a.punteggio);
      // Assegna dinamicamente la posizione ai giocatori in base all'ordine
      data.forEach((player, index) => {
        player.position = index + 1;
        player.medal = getMedalSymbol(player.position);
      });

      setPlayers(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getMedalSymbol = (position) => {
    switch (position) {
      case 1:
        return "🥇"; // Simbolo oro per il 1° posto
      case 2:
        return "🥈"; // Simbolo argento per il 2° posto
      case 3:
        return "🥉"; // Simbolo bronzo per il 3° posto
      default:
        return `#${position}`;
    }
  };

  return (
    <div>
      <h1>Distortion Tournament</h1>
      <table>
        <thead>
          <tr>
            <th className="no-display"></th>
            <th className="no-display"></th>
            <th className="no-display"></th>
            <th>Try</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.position}>
              <td>{player.medal}</td>
              <td>
                <a href={player.link} target="_blank" rel="noopener noreferrer">
                  <div className="image-wrapper">
                    <img
                      src={player.foto}
                      alt={`Foto ${player.nome}`}
                      className="player-img"
                    />
                    <div className="overlay">
                      <span className="view-label">Canale</span>
                    </div>
                  </div>
                </a>
              </td>
              <td className="player-name">{player.nome}</td>
              <td>{player.tentativi}</td>
              <td>{player.punteggio}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Classifica;
