import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';
import pokemons from '../data';
import expectToBeInTheDocument from './alias';

describe('Test the <Pokedex.js /> component', () => {
  test('Test if page contains a header with the text Encountered Pokémons',
    () => {
      render(
        <MemoryRouter>
          <App />
        </MemoryRouter>,
      );

      const headingEl = screen.getByRole('heading', {
        level: 2,
        name: /encountered pokémons/i,
      });

      expect(headingEl).toBeDefined();
    });

  test(`Test whether the next Pokémon from the list appears 
  when the Next Pokémon button is clicked`,
  () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const nextButton = screen.getByRole('button', { name: /próximo pokémon/i });

    expect(nextButton).toBeDefined();

    pokemons.forEach((pokemon) => {
      const nextPokemon = screen.getByText(pokemon.name);
      expect(nextPokemon).toBeDefined();
      userEvent.click(nextButton);
    });
  });

  test('Test if only one Pokémon is shown at a time',
    () => {
      render(
        <MemoryRouter>
          <App />
        </MemoryRouter>,
      );

      const nextPokemon = screen.getAllByText(/average weight/i);
      console.log(nextPokemon);
      expect(nextPokemon).toHaveLength(1);
    });

  test('Test if Pokédex has filter buttons',
    () => {
      render(
        <MemoryRouter>
          <App />
        </MemoryRouter>,
      );

      const arrayPokemons = [
        'Electric',
        'Fire',
        'Bug',
        'Poison',
        'Psychic',
        'Normal',
        'Dragon'];

      arrayPokemons.forEach((type) => {
        const typesOfPokemon = screen.getByRole('button', { name: type });
        const pokemonDataTestId = screen.getAllByTestId('pokemon-type-button');
        const numberOfTagsWithId = 7;

        expect(typesOfPokemon).toBeInTheDocument();
        expect(pokemonDataTestId).toHaveLength(numberOfTagsWithId);
      });

      const allTypesButton = screen.getByRole('button', { name: /all/i });
      const fireButton = screen.getByRole('button', { name: /fire/i });
      const fireCard = screen.getByText(/fire/i);

      userEvent.click(fireButton);

      expectToBeInTheDocument(allTypesButton, fireButton, fireCard);
    });

  test('Test if Pokédex contains a button to reset the filter',
    () => {
      render(
        <MemoryRouter>
          <App />
        </MemoryRouter>,
      );

      const allTypesButton = screen.getByRole('button', { name: /all/i });
      expectToBeInTheDocument(allTypesButton);

      userEvent.click(allTypesButton);

      const startPokemon = screen.getByText(/pikachu/i);

      expectToBeInTheDocument(allTypesButton, startPokemon);
    });
});
