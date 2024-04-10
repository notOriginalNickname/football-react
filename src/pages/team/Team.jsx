import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import consts from '../../utils/consts';
import { Link } from 'react-router-dom';
import './team.css';
import { getPositionTranslation, getCountryTranslation } from '../../utils/functions';

function Team() {
  const { id } = useParams();
  const [clubData, setClubData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${consts.BASE_PATH}${consts.TEAMS}/${id}`, {
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
        console.log("Запрос команды");
        console.log(data);
        setClubData(data);
        document.title = data.name;
      } catch (error) {
        console.error(error);
        setErrorMessage('Произошла ошибка при загрузке данных.');
      }
    };

    fetchData();
  }, [id]);

  if (errorMessage) {
    return (
      <div className="error-container">
        <p className="error-message-centered">{errorMessage}</p>
      </div>
    );
  }

  if (!clubData) {
    return (
      <div className="error-container">
        <p className="error-message-centered">Загрузка...</p>
      </div>
    );
  }

  return (
    <>
      <div className="contain">
        <div className="left-col">
          <h1 className='team-club-name'>{clubData.name}</h1>
          <p className='team-country'>Страна: {getCountryTranslation(clubData.area.name)}</p>
          <p className='team-coach'>Тренер: {clubData.coach.name}</p>
          <p className='team-foundation'>Дата основания: {clubData.founded}</p>
          <p className='team-short-name'>Короткое название: {clubData.shortName}</p>
          <p>Сайт: &nbsp;<a className='team-site' href={clubData.website}>{clubData.website}</a></p>
          <h4 className='team-competition'>Текущие соревнования:</h4>
          <ul className='team-competition-ul'>
            {clubData.runningCompetitions.map((competition, index) => (
              <li className='team-competition-li' key={index}>
                <Link to={`${consts.COMPETITION}/${competition.code}${consts.MATCHES}`} className="link-competition">{competition.name}</Link>
              </li>
            ))}
          </ul>
          <Link to={`${consts.TEAMS}/${id}${consts.MATCHES}`} className="link-team-matches">Список матчей команды</Link>

          <img className='team-crest' src={clubData.crest} />
        </div>

        <div className="right-col">
          <h3 className='team-players'>Игроки:</h3>
          <ul className='team-players-ul'>
            {clubData.squad.map((player, index) => (
              <li className='team-players-li' key={index}>
                <Link to={`${consts.PLAYER}/${player.id}`} className="link-player">
                  {player.name}
                </Link>&nbsp;
                ({getPositionTranslation(player.position)})
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Team;
