import HomePage from 'pages/HomePage/HomePage';
import Game from 'pages/Game/Game';
import HighScore from 'pages/HighScore/HighScore';
import * as routes from './routeTypes';

export const mainRoutes = [
  {
    exact: true,
    path: routes.HOME,
    component: HomePage,
    name: 'Home',
  },
  {
    exact: true,
    path: routes.GAME,
    component: Game,
    name: 'Game',
  },
  {
    exact: true,
    path: routes.HIGH_SCORE,
    component: HighScore,
    name: 'Hig Score',
  },
];
