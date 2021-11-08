import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { FavoritePokemons } from '../components';
import App from '../App';

describe('Test the <FavoritePokemons.js /> component', () => {
  test('Test if the message was found if the person has no favorite Pokémon',
    () => {
      render(
        <MemoryRouter>
          <FavoritePokemons />
        </MemoryRouter>,
      );

      const alertEl = screen.getByText(/No favorite pokemon found/i);
      expect(alertEl).toBeDefined();
    });

  test('Test whether all favorite Pokémon cards are displayed',
    () => {
      render(
        <MemoryRouter>
          <App />
        </MemoryRouter>,
      );
      const pikachuMoreDLink = screen.getByRole('link', { name: /more details/i });
      userEvent.click(pikachuMoreDLink);

      const checkBoxFavorite = screen.getByRole('checkbox',
        { name: /pokémon favoritado?/i });

      userEvent.click(checkBoxFavorite);

      const favoritePokemonsLink = screen.getByRole('link',
        { name: /favorite Pokémons/i });
      userEvent.click(favoritePokemonsLink);

      const pikachuEL = screen.getByText(/pikachu/i);

      expect(pikachuEL).toBeInTheDocument();
    });
});
