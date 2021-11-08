import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { FavoritePokemons } from '../components';

describe('Test the <FavoritePokemons.js /> component', () => {
  test('Test if the page contains information FavoritePokemons Pokédex',
    () => {
      render(
        <MemoryRouter>
          <FavoritePokemons />
        </MemoryRouter>,
      );

      const paragEl = screen.getByText(
        // eslint-disable-next-line max-len
        /this application simulates a pokédex, a digital encyclopedia containing all pokémons/i,
      );
      expect(paragEl).toBeDefined();
    });

  test('Test if the page contains an heading H2 with the text FavoritePokemons Pokédex',
    () => {
      render(
        <MemoryRouter>
          <FavoritePokemons />
        </MemoryRouter>,
      );

      const headingEl = screen.getByRole('heading', {
        name: /FavoritePokemons pokédex/i,
      });

      expect(headingEl).toBeDefined();
    });

  test('Test if the page contains two paragraphs with text FavoritePokemons Pokédex',
    () => {
      render(
        <MemoryRouter>
          <FavoritePokemons />
        </MemoryRouter>,
      );

      expect(getAllByAllText(/pokémons/i)[2]).toBeInTheDocument();
    });

  test('Test if the page contains the following picture of a Pokédex',
    () => {
      render(
        <MemoryRouter>
          <FavoritePokemons />
        </MemoryRouter>,
      );

      const pokemonImgEl = screen.getByRole('img', { name: /pokédex/i });

      expect(pokemonImgEl).toBeInTheDocument();
    });
});
