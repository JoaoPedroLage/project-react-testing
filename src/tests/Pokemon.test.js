import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';
import expectToBeInTheDocument from './alias';

describe('Test the <Pokemon.js /> component', () => {
  test('Test whether a card is rendered with the information of a particular Pokémon',
    () => {
      render(
        <MemoryRouter>
          <App />
        </MemoryRouter>,
      );
      const screenPokemon = screen.getByText(/pikachu/i);
      const screenPokemonType = screen.getByTestId('pokemon-type');
      const screenWeigth = screen.getByText(/Average weight: 6.0 kg/i);
      const pokemonImgEl = screen.getByRole('img');

      expectToBeInTheDocument(screenPokemon, screenWeigth);
      expect(screenPokemonType.textContent).toBe('Electric');
      expect(pokemonImgEl.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
      expect(pokemonImgEl.alt).toBe('Pikachu sprite');
    });

  test(`Test whether the Pokémon card indicated on Pokédex contains a navigation link 
  to display details of this Pokémon`,
  () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const moreDetailsLink = screen.getByRole('link', { name: /more details/i });

    expect(moreDetailsLink.href).toBe('http://localhost/pokemons/25');
  });

  test(`Test if clicking on the Pokémon navigation link redirects the application 
  to the Pokémon details page`,
  () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const moreDetlinkEl = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetlinkEl);

    const textEl = screen.getByText(/summary/i);
    expect(textEl).toBeInTheDocument();
  });

  test('Test whether the URL displayed in the browser changes to /Pokemon/<id>',
    () => {
      render(
        <MemoryRouter>
          <App />
        </MemoryRouter>,
      );

      const moreDetLinkEl = screen.getByRole('link', { name: /more details/i });
      expect(moreDetLinkEl.href).toBe('http://localhost/pokemons/25');
    });

  test('Test if there is a star icon in your favorite Pokémon.',
    () => {
      render(
        <MemoryRouter>
          <App />
        </MemoryRouter>,
      );

      const moreDetLinkEl = screen.getByRole('link', { name: /more details/i });
      userEvent.click(moreDetLinkEl);

      const checkBoxFavorite = screen.getByRole('checkbox',
        { name: /pokémon favoritado?/i });

      userEvent.click(checkBoxFavorite);

      const favoriteLinkEl = screen.getByRole('link', { name: /favorite pokémons/i });
      userEvent.click(favoriteLinkEl);

      const pokemonImgEl = screen.getByRole('img',
        { name: /pikachu is marked as favorite/i });

      expect(pokemonImgEl.src).toBe('http://localhost/star-icon.svg');
    });
});
