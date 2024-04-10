import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CompetitionCalendarLi from '../../components/competition-calendar-li/CompetitionCalendarLi';
import consts from '../../utils/consts';
import { formatDate } from '../../utils/functions';
import './teamMatches.css';

function TeamMatches() {
    const { id } = useParams();
    const [competitionData, setCompetitionData] = useState(null);
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [filteredMatches, setFilteredMatches] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetch(`${consts.BASE_PATH}${consts.TEAMS}/${id}${consts.MATCHES}`, {
            headers: {
                "Content-Type": "application/json",
                "X-Auth-Token": consts.TOKEN
            }
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Страница не найдена');
                }
                return res.json();
            })
            .then(data => {
                console.log("Запрос матчей команды");
                setCompetitionData(data);
                console.log(data);
                document.title = "Матчи команды";
            })
            .catch(error => {
                if (error.message === 'Страница не найдена') {
                    setErrorMessage('Страница не найдена');
                } else {
                    console.error(error);
                }
            });
    }, [id]);

    useEffect(() => {
        filterMatches();
    }, [fromDate, toDate, competitionData]);

    useEffect(() => {
        if (competitionData && competitionData.competition && competitionData.competition.name) {
            document.title = competitionData.competition.name;
        }
    }, [competitionData]);

    function handleFromDateChange(event) {
        setFromDate(new Date(event.target.value));
    }

    function handleToDateChange(event) {
        const toDateValue = new Date(event.target.value);
        const selectedToDate = new Date(event.target.value);
        if (!competitionData) return;

        const { first, last } = competitionData.resultSet;

        if (fromDate && toDateValue < fromDate) {
            alert("Дата окончания должна быть больше даты начала");
            return;
        }
        if (selectedToDate < new Date(first) || selectedToDate > new Date(last)) {
            alert(`Дата окончания должна быть между ${first} и ${last}`);
            return;
        }
        setToDate(toDateValue);
        setToDate(selectedToDate);
        setErrorMessage('');
    }

    function filterMatches() {
        if (!competitionData || !competitionData.matches) {
            setFilteredMatches([]);
            return;
        }

        let filtered = competitionData.matches;

        if (fromDate && toDate) {
            const fromDateWithoutTime = fromDate.toISOString().split('T')[0];
            const toDateWithoutTime = toDate.toISOString().split('T')[0];

            filtered = filtered.filter(match => {
                const matchDateWithoutTime = new Date(match.lastUpdated).toISOString().split('T')[0];
                return matchDateWithoutTime >= fromDateWithoutTime && matchDateWithoutTime <= toDateWithoutTime;
            });
        } else if (fromDate) {
            const fromDateWithoutTime = fromDate.toISOString().split('T')[0];
            filtered = filtered.filter(match => {
                const matchDateWithoutTime = new Date(match.lastUpdated).toISOString().split('T')[0];
                return matchDateWithoutTime >= fromDateWithoutTime;
            });
        } else if (toDate) {
            const toDateWithoutTime = toDate.toISOString().split('T')[0];
            filtered = filtered.filter(match => {
                const matchDateWithoutTime = new Date(match.lastUpdated).toISOString().split('T')[0];
                return matchDateWithoutTime <= toDateWithoutTime;
            });
        }

        if (filtered.length === 0) {
            setErrorMessage('Матчей в выбранный день не было');
        } else {
            setErrorMessage('');
        }

        setFilteredMatches(filtered);
    }

    return (
        <div className="wrapper">
            {errorMessage && errorMessage === 'Страница не найдена' ? (
                <div className="error-container">
                    <p className="error-message-centered">{errorMessage}</p>
                </div>
            ) : (
                <>
                    <div className="date-input-container">
                        <label className='calendar-label' >Дата с:</label>
                        <input type="date" id="from" name="date-from" className='date-calendar' onChange={handleFromDateChange} />
                        <label className='calendar-label' >Дата до:</label>
                        <input type="date" id="to" name="date-to" className='date-calendar' onChange={handleToDateChange} />
                    </div>
                    <div className="contain">
                        {filteredMatches.length === 0 && !errorMessage ? (
                            <p className="error-message-centered">Загрузка...</p>
                        ) : (
                            <>
                                <ul className='competition-calendar-ul'>
                                    {filteredMatches.map((match, index) => (
                                        <CompetitionCalendarLi
                                            key={index}
                                            homeName={match.homeTeam.name}
                                            awayName={match.awayTeam.name}
                                            homeScore={match.score.fullTime.home}
                                            awayScore={match.score.fullTime.away}
                                            code={match.competition.code}
                                            flag={match.area.flag}
                                            homeEmblem={match.homeTeam.crest}
                                            awayEmblem={match.awayTeam.crest}
                                            homeId={match.homeTeam.id}
                                            awayId={match.awayTeam.id}
                                            date={formatDate(match.lastUpdated)}
                                        />
                                    ))}
                                </ul>
                                {errorMessage && <p className="error-message-centered">{errorMessage}</p>}
                            </>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default TeamMatches;
