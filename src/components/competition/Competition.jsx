import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './competition.css';
import { formatDate, getCountryTranslation } from '../../utils/functions'

class Competition extends Component {
    render() {
        const { flag, startDate, endDate, emblem, country, id, name, code } = this.props;


        return (

            <li key={id} className="competition-li">
                <Link to={`/competition/${code}/matches`} className="link-league">
                    <img className='emblem' src={emblem} alt={emblem} />
                    <span className='name'>{name}</span>
                    <div className="row">
                        {flag && (
                            <img className='flag' src={flag} />
                        )}
                        <span className='country'>{getCountryTranslation(country)}</span>
                    </div>
                    <p>Начало: {formatDate(startDate)}</p>
                    <p>Конец: {formatDate(endDate)}</p>
                </Link>
            </li>
        );
    }
}

export default Competition;
