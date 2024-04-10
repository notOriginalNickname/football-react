import React, { Component } from 'react';
import Team from '../../components/team/Team';
import consts from '../../utils/consts';
import './teams.css';

class Teams extends Component {
    state = {
        searchQuery: '',
        originalResult: {},
        filteredResult: {},
        errorMessage: ''
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = () => {
        fetch(`${consts.BASE_PATH}${consts.TEAMS}`, {
            headers: {
                "Content-Type": "application/json",
                "X-Auth-Token": consts.TOKEN
            }
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Произошла ошибка при загрузке данных.');
                }
                return res.json();
            })
            .then(result => {
                console.log("Запрос всех команд");
                console.log(result);
                this.setState({
                    originalResult: result,
                    filteredResult: result
                });
                document.title = "Команды";
            })
            .catch(error => {
                console.error(error);
                this.setState({ errorMessage: 'Произошла ошибка при загрузке данных.' });
            });
    }

    handleInputChange = ({ target: { value } }) => {
        const { originalResult } = this.state;
        const filteredTeams = originalResult.teams.filter(team => {
            return team.name.toLowerCase().includes(value.toLowerCase());
        });
        this.setState({
            searchQuery: value,
            filteredResult: { ...originalResult, teams: filteredTeams }
        });
    }

    render() {
        const { searchQuery, filteredResult, errorMessage } = this.state;
        const { teams = [] } = filteredResult;

        return (
            <>
                {errorMessage ? (
                    <div className="error-container">
                        <p className="error-message-centered">{errorMessage}</p>
                    </div>
                ) : (
                    <>
                        <input
                            className='search-team'
                            type="text"
                            placeholder='Введите название команды'
                            onChange={this.handleInputChange}
                            value={searchQuery}
                        />

                        <div className="contain">
                            <ul className='team-ul'>
                                {teams.length === 0 && !errorMessage ? (
                                    <p className="error-message-centered">Загрузка...</p>
                                ) : (
                                    teams.map(team => (
                                        <Team
                                            name={team.name}
                                            crest={team.crest}
                                            address={team.address}
                                            website={team.website}
                                            founded={team.founded}
                                            venue={team.venue}
                                            key={team.id}
                                            id={team.id}
                                        />
                                    ))
                                )}
                            </ul>
                        </div>
                    </>
                )}
            </>
        );
    }
}

export default Teams;
