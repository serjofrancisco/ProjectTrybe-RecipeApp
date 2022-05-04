import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import Login from '../pages/Login';

describe('2 - Crie todos os elementos para a tela de login',
  () => {
    test('O input de email deve possuir o atributo data-testid="email-input"',
      () => {
        renderWithRouter(<Login />);
        const email = screen.getByTestId('email-input');
        expect(email).toBeInTheDocument();
      });
    test('O input de senha deve possuir o atributo data-testid="password-input"',
      () => {
        renderWithRouter(<Login />);
        const senha = screen.getByTestId('password-input');
        expect(senha).toBeInTheDocument();
      });
    test('O botão "Enter" deve possuir o atributo data-testid="login-submit-btn"',
      () => {
        renderWithRouter(<Login />);
        const button = screen.getByText(/Enter/i);
        expect(button).toBeInTheDocument();
      });
  });
