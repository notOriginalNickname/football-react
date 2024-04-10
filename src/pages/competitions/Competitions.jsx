import React, { Component } from 'react';
import Competition from '../../components/competition/Competition';
import './competitions.css';
import consts from '../../utils/consts';

class Competitions extends Component {
    state = {
        searchQuery: '',
        originalResult: null,
        filteredResult: null,
        errorMessage: '',
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = () => {
        fetch(`${consts.BASE_PATH}${consts.COMPETITIONS_PATH}`, {
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
                console.log("Запрос всех лиг");
                this.setState({
                    originalResult: result,
                    filteredResult: result,
                    errorMessage: ''
                });
                document.title = "Лиги / Соревнования";
            })
            .catch(error => {
                console.error(error);
                this.setState({ errorMessage: 'Произошла ошибка при загрузке данных.' });
            });
    }

    handleInputChange = ({ target: { value } }) => {
        const { originalResult } = this.state;
        if (!originalResult) return;

        const filteredCompetitions = originalResult.competitions.filter(competition => {
            return competition.name.toLowerCase().includes(value.toLowerCase());
        });
        this.setState({
            searchQuery: value,
            filteredResult: { ...originalResult, competitions: filteredCompetitions }
        });
    }

    render() {
        const { searchQuery, filteredResult, errorMessage } = this.state;
        const competitions = filteredResult ? filteredResult.competitions : [];

        return (
            <>
                {errorMessage ? (
                    <div className="error-container">
                        <p className="error-message-centered">{errorMessage}</p>
                    </div>
                ) : (
                    <>
                        <input
                            className='search-league'
                            type="text"
                            placeholder='Введите название лиги или соревнования'
                            onChange={this.handleInputChange}
                            value={searchQuery}
                        />

                        <div className="contain">
                            {!filteredResult ? (
                                <p className="error-message-centered">Загрузка...</p>
                            ) : (
                                <ul className='competition-ul'>
                                    {competitions.map(competition => (
                                        <Competition
                                            country={competition.area.name}
                                            name={competition.name}
                                            flag={competition.area.flag}
                                            startDate={competition.currentSeason.startDate}
                                            endDate={competition.currentSeason.endDate}
                                            emblem={competition.emblem}
                                            key={competition.id}
                                            code={competition.code}
                                        />
                                    ))}
                                </ul>
                            )}
                        </div>
                    </>
                )}
            </>
        );
    }
}

export default Competitions;
