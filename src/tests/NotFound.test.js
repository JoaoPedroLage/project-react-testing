import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { NotFound } from '../components';

describe('Test the <NotFound.js /> component', () => {
  test('Test if the page contains an heading H2 with the text Page requested not found 😭',
    () => {
      render(
        <MemoryRouter>
          <NotFound />
        </MemoryRouter>,
      );

      const headingEl = screen.getByRole('heading', {
        name: /page requested not found Crying emoji/i,
      });

      expect(headingEl).toBeDefined();
    });

  test('Test if the page contains the following picture of a Pokédex',
    () => {
      render(
        <MemoryRouter>
          <NotFound />
        </MemoryRouter>,
      );

      const notFoundImgEl = screen.getByRole('img',
        { name: /Pikachu crying because the page requested was not found/i });

      expect(notFoundImgEl.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    });
});
