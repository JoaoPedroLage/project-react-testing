import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { About } from '../components';

describe('Test the <About.js /> component', () => {
  test('Test if the page contains information about Pokédex',
    () => {
      render(
        <MemoryRouter>
          <About />
        </MemoryRouter>,
      );

      const paragEl = screen.getByText(
        // eslint-disable-next-line max-len
        /this application simulates a pokédex, a digital encyclopedia containing all pokémons/i,
      );
      expect(paragEl).toBeDefined();
    });

  test('Test if the page contains an heading H2 with the text About Pokédex',
    () => {
      render(
        <MemoryRouter>
          <About />
        </MemoryRouter>,
      );

      const headingEl = screen.getByRole('heading', {
        name: /about pokédex/i,
      });

      expect(headingEl).toBeDefined();
    });

  test('Test if the page contains two paragraphs with text about Pokédex',
    () => {
      render(
        <MemoryRouter>
          <About />
        </MemoryRouter>,
      );
      const paragELs = screen.getAllByText(/pokémons/i);

      expect(paragELs).toHaveLength(2);
    });

  test('Test if the page contains the following picture of a Pokédex',
    () => {
      render(
        <MemoryRouter>
          <About />
        </MemoryRouter>,
      );

      const pokemonImgEl = screen.getByRole('img');

      expect(pokemonImgEl.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    });
});
