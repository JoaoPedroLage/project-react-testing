import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';
import expectToBeInTheDocument from './alias';

describe('Test the <Pokemon.js /> component', () => {
  test('Test if detailed information of the selected Pokémon is shown on the screen',
    () => {
      render(
        <MemoryRouter>
          <App />
        </MemoryRouter>,
      );
      const moreDetlinkEl = screen.getByRole('link', { name: /more details/i });
      userEvent.click(moreDetlinkEl);

      const screenPokemonDetails = screen.getByText(/pikachu details/i);
      const screenSummary = screen.getByRole('heading', { name: /summary/i });
      const screenParag = screen
        .getByText(/This intelligent Pokémon roasts hard berries with electricity/i);

      expectToBeInTheDocument(screenPokemonDetails, screenSummary, screenParag);
    });

  test('Test whether there is a section in page with maps containing Pokémon locations',
    () => {
      render(
        <MemoryRouter>
          <App />
        </MemoryRouter>,
      );

      const moreDetlinkEl = screen.getByRole('link', { name: /more details/i });
      userEvent.click(moreDetlinkEl);

      const screenGameLocations = screen.getByRole('heading',
        { name: /Game Locations of Pikachu/i });

      const imgEl = screen.getAllByRole('img', { name: /pikachu location/i });
      const locationOneEL = screen.getByText(/kanto viridian forest/i);
      const locationTwoEL = screen.getByText(/kanto power plant/i);

      expectToBeInTheDocument(screenGameLocations, locationOneEL, locationTwoEL);
      expect(imgEl).toHaveLength(2);
      expect(imgEl[0].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
      expect(imgEl[1].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    });

  test('Test whether the user can bookmark a Pokémon through the details page',
    () => {
      render(
        <MemoryRouter>
          <App />
        </MemoryRouter>,
      );

      const moreDetlinkEl = screen.getByRole('link', { name: /more details/i });
      userEvent.click(moreDetlinkEl);

      const checkBoxFavorite = screen.getByRole('checkbox',
        { name: /pokémon favoritado?/i });

      userEvent.click(checkBoxFavorite);
      expect(checkBoxFavorite.checked).toBe(true);
      userEvent.click(checkBoxFavorite);
      expect(checkBoxFavorite.checked).toBe(false);

      expect(checkBoxFavorite).toBeInTheDocument();
    });
});
