import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Test the <App.js /> component', () => {
  test('Test whether the top of the application contains a fixed set of navigation links',
    () => {
      render(
        <MemoryRouter>
          <App />
        </MemoryRouter>,
      );

      const homeEL = screen.getByRole('link', { name: /home/i });
      const aboutEl = screen.getByRole('link', { name: /about/i });
      const favoritePokemons = screen.getByRole('link', { name: /favorite pokémons/i });

      expect(homeEL).toBeInTheDocument();
      expect(aboutEl).toBeInTheDocument();
      expect(favoritePokemons).toBeInTheDocument();
    });

  test(`Test whether the application is redirected to the home page in the / URL 
  by clicking the Home link in the navigation bar.`,
  () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const homeLink = screen.getByRole('link', { name: /home/i });
    userEvent.click(homeLink);

    const headingEl = screen.getByRole('heading', {
      name: /encountered pokémons/i,
    });

    expect(headingEl).toBeDefined();
  });

  test(`Test if the application is redirected to the About Page,
   on URL /about, by clicking the About link from the Navigation Bar`,
  () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const aboutLink = screen.getByRole('link', { name: /about/i });
    userEvent.click(aboutLink);

    const headingEl = screen.getByRole('heading', {
      name: /about pokédex/i,
    });

    expect(headingEl).toBeDefined();
  });

  test(`Test if the application is redirected to the Favorite Pokemons Page,
   on URL /favorites, by clicking the Favorite Pokemons link from the Navigation Bar`,
  () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const favoritesLink = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(favoritesLink);

    const headingEl = screen.getByRole('heading', {
      name: /favorite pokémons/i,
    });

    expect(headingEl).toBeDefined();
  });

  test(`Test whether the application is redirected to the Not Found page
   by entering an unknown URL.`,
  () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const { history } = renderWithRouter(<App />);

    history.push('/route-non-existent');

    const notFoundTextEl = screen.getByRole('heading', {
      name: /page requested not found/i,
    });

    expect(notFoundTextEl).toBeInTheDocument();
  });
});
