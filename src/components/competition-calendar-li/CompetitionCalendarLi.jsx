import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './competitionCalendarLi.css';

class CompetitionCalendarLi extends Component {
    render() {
        const { homeId, awayId, homeName, awayName, homeScore, awayScore, code, flag, homeEmblem, awayEmblem, date } = this.props;
        const noScore = homeScore === null && awayScore === null;


        return (
            <li className='competition-calendar-li'>
                <div className="col1">

                    <div className="home-row">
                        <img className='calendar-emblem-li' src={homeEmblem} />
                        <Link className="competition-team-link" to={`/teams/${homeId}`}>{homeName}</Link>
                    </div>
                    <div className="away-row">
                        <img className='calendar-emblem-li' src={awayEmblem} />
                        <Link className="competition-team-link" to={`/teams/${awayId}`}>{awayName}</Link>
                    </div>

                </div>

                <div className="col2">
                    <img className='competition-calendar-flag' src={flag} />
                    <span className='codeLeague'>{code}</span>
                </div>

                <div className="col3">
                    <p className={`score ${noScore ? 'no-score' : ''}`}>{noScore ? "Счёта нет" : `${homeScore}:${awayScore}`}</p>
                    <p className='competition-calendar-date'>{date}</p>
                </div>


            </li>
        );
    }
}

export default CompetitionCalendarLi;
