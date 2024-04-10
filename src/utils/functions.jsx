export function formatDate(dateString) {
  const date = new Date(dateString);
  const monthNames = [
    "янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"
  ];
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();
  const month = monthNames[monthIndex];
  return `${day} ${month}. ${year} г`;
}

export function getPositionTranslation(position) {
  switch (position) {
    case 'Midfield':
      return 'Полузащита';
    case 'Offence':
      return 'Нападение';
    case 'Forward':
      return 'Нападение';
    case 'Goalkeeper':
      return 'Вратарь';
    case 'Keeper':
      return 'Вратарь';
    case 'Defence':
      return 'Защита';
    case 'Midfielder':
      return 'Полузащитник';
    default:
      return position;
  }
}

export function getNationalityTranslation(nationality) {
  switch (nationality) {
    case 'Turkey':
      return 'Турок';
    case 'England':
      return 'Англичанин';
    case 'Brazil':
      return 'Бразилец';
    case 'Germany':
      return 'Немец';
    case 'Argentina':
      return 'Аргентинец';
    case 'Italy':
      return 'Итальянец';
    case 'France':
      return 'Француз';
    case 'Spain':
      return 'Испанец';
    case 'Portugal':
      return 'Португалец';
    case 'Netherlands':
      return 'Голландец';
    case 'Mexico':
      return 'Мексиканец';
    case 'Colombia':
      return 'Колумбиец';
    case 'Uruguay':
      return 'Уругваец';
    case 'Russia':
      return 'Русский';
    default:
      return nationality;
  }
}

export function getCountryTranslation(country) {
  switch (country) {
    case 'Italy':
      return 'Италия';
    case 'Europe':
      return 'Европа';
    case 'World':
      return 'Мир';
    case 'Brazil':
      return 'Бразилия';
    case 'England':
      return 'Англия';
    case 'Germany':
      return 'Германия';
    case 'France':
      return 'Франция';
    case 'Portugal':
      return 'Португалия';
    case 'Netherlands':
      return 'Нидерланды';
    case 'South America':
      return 'Южная Америка';
    case 'Spain':
      return 'Испания';
    case 'Russia':
      return 'Россия';
    default:
      return country;
  }
}
