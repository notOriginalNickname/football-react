import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './team.css';
import consts from '../../utils/consts';

class Team extends Component {
    render() {
        const { id, name, crest, address, founded, venue, } = this.props;

        return (
            <li key={id} className="team-li">
                <Link to={`${consts.TEAMS}/${id}`} className="link-team">
                    <img className='team-crest' src={crest} alt={name} />
                    <span className='team-name'>{name}</span>
                    <p>Адрес: {address}</p>
                    <p className='teams-founded'>Основан: {founded}</p>
                    <p className='stadion'>Стадион: {venue}</p>
                </Link>
            </li>
        );
    }
}

export default Team;
