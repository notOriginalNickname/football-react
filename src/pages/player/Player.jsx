import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import consts from '../../utils/consts';
import { Link } from 'react-router-dom';
import { formatDate, getPositionTranslation, getNationalityTranslation } from '../../utils/functions';
import './player.css';

function Player() {
  const { id } = useParams();
  const [playerData, setPlayerData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${consts.BASE_PATH}${consts.PLAYER}/${id}`, {
          headers: {
            "Content-Type": "application/json",
            "X-Auth-Token": consts.TOKEN
          }
        });

        if (!response.ok) {
          if (response.status === 403) {
            setErrorMessage('Данная страница недоступна.');
          } else {
            setErrorMessage('Произошла ошибка при загрузке данных.');
          }
          return;
        }

        const data = await response.json();
        console.log("Запрос игрока");
        console.log(data);
        setPlayerData(data);
        document.title = data.name; 
      } catch (error) {
        console.error(error);
        setErrorMessage('Произошла ошибка при загрузке данных.');
      }
    };

    fetchData();
  }, [id]);

  if (errorMessage) return <div className="error-container"><p className="error-message-centered">{errorMessage}</p></div>;
  if (!playerData) return <div className="error-message-centered">Загрузка...</div>;

  return (
    <div className="player-info">
      <h1>{playerData.name}</h1>
      <p>Команда:&nbsp; <Link className="player-team-link" to={`${consts.TEAMS}/${playerData.currentTeam.id}`}>{playerData.currentTeam.name}</Link></p>
      <p>Позиция: {getPositionTranslation(playerData.position)}</p>
      <p>Национальность: {getNationalityTranslation(playerData.nationality)}</p>
      <p>Дата рождения: {formatDate(playerData.dateOfBirth)}</p>
      <p>Номер: {playerData.shirtNumber}</p>
      <img className="player-team-emblem" src={playerData.currentTeam.crest} alt="Team Crest" />
      <h4>Текущие соревнования:</h4>
      <ul>
        {playerData.currentTeam.runningCompetitions.map((competition, index) => (
          <li key={index}>
            <Link className="player-competition-link" to={`${consts.COMPETITION}/${competition.code}${consts.MATCHES}`}>{competition.name}</Link>
          </li>
        ))}
      </ul>
      <p>Контракт: с {playerData.currentTeam.contract.start} до {playerData.currentTeam.contract.until}</p>
    </div>
  );
}

export default Player;
