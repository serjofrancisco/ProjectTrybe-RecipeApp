import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import Login from '../pages/Login';

const EMAIL_TESTID_INPUT = 'email-input';
const EMAIL_VALID = 'email@email.com';
const EMAIL_INVALID = '@email.com';
const PASSWORD_TESTID_INPUT = 'password-input';
const PASSWORD_VALID = '1234567';
const PASSWORD_INVALID = '123456';
const BTN_ENTER_TESTID_INPUT = 'login-submit-btn';

describe('2 - Teste se Login tem todos os elementos pedidos',
  () => {
    it('O input de email deve possuir o atributo data-testid="email-input"',
      () => {
        renderWithRouter(<Login />);
        const email = screen.getByTestId(EMAIL_TESTID_INPUT);
        expect(email).toBeInTheDocument();
      });
    it('O input de senha deve possuir o atributo data-testid="password-input"',
      () => {
        renderWithRouter(<Login />);
        const senha = screen.getByTestId(PASSWORD_TESTID_INPUT);
        expect(senha).toBeInTheDocument();
      });
    it('O botão "Enter" deve possuir o atributo data-testid="login-submit-btn"',
      () => {
        renderWithRouter(<Login />);
        const button = screen.getByText(/Enter/i);
        expect(button).toBeInTheDocument();
      });
  });

describe('3 - Desenvolva a tela de maneira que a pessoa'
+ 'deve conseguir escrever seu email no input de email',
() => {
  it('É possível escrever o email',
    () => {
      renderWithRouter(<Login />);
      const email = screen.getByTestId(EMAIL_TESTID_INPUT);

      userEvent.type(email, EMAIL_VALID);
      expect(email).toHaveValue('email@email.com');
    });
});

describe('4 - Desenvolva a tela de maneira que a pessoa'
+ 'deve conseguir escrever sua senha no input de senha',
() => {
  it('É possível escrever a senha',
    () => {
      renderWithRouter(<Login />);
      const senha = screen.getByTestId(PASSWORD_TESTID_INPUT);

      userEvent.type(senha, PASSWORD_VALID);
      expect(senha).toHaveValue(PASSWORD_VALID);
    });
});

describe('5 - Desenvolva a tela de maneira que o formulário só seja válido após'
+ ' um email válido e uma senha de mais de 6 caracteres serem preenchidos',
() => {
  it('O botão deve estar desativado se o email for inválido'
  + 'se a senha deve tiver 6 caracteres ou menos',
  () => {
    renderWithRouter(<Login />);
    const email = screen.getByTestId(EMAIL_TESTID_INPUT);
    const senha = screen.getByTestId(PASSWORD_TESTID_INPUT);
    const button = screen.getByTestId(BTN_ENTER_TESTID_INPUT);

    userEvent.type(email, EMAIL_INVALID);
    userEvent.type(senha, PASSWORD_INVALID);
    expect(button).toBeDisabled();
  });
  it('O botão deve estar ativado se o email e a senha forem válidos',
    () => {
      renderWithRouter(<Login />);
      const email = screen.getByTestId(EMAIL_TESTID_INPUT);
      const senha = screen.getByTestId(PASSWORD_TESTID_INPUT);
      const button = screen.getByTestId(BTN_ENTER_TESTID_INPUT);

      userEvent.type(email, EMAIL_VALID);
      userEvent.type(senha, PASSWORD_VALID);
      expect(button).toBeEnabled();
    });
});
describe('6 - Salve 2 tokens no localStorage após a submissão, '
+ 'identificados pelas chaves mealsToken e cocktailsToken',
() => {
  it('Após a submissão mealsToken e cocktailsToken devem estar salvos em localStorage',
    () => {
      const { history } = renderWithRouter(<Login />);

      const email = screen.getByTestId(EMAIL_TESTID_INPUT);
      const senha = screen.getByTestId(PASSWORD_TESTID_INPUT);
      const button = screen.getByText('Enter');

      userEvent.type(email, EMAIL_VALID);
      userEvent.type(senha, PASSWORD_VALID);
      userEvent.click(button);

      expect(history.location.pathname).toBe('/foods');
      expect(localStorage.getItem('mealsToken')).toBe('1');
      expect(localStorage.getItem('cocktailsToken')).toBe('1');
      localStorage.clear();
    });
});
describe('7 - Salve o e-mail da pessoa usuária no'
+ ' localStorage na chave user após a submissão',
() => {
  it('Após a submissão a chave user deve estar salva em localStorage',
    () => {
      renderWithRouter(<Login />);

      const email = screen.getByTestId(EMAIL_TESTID_INPUT);
      const senha = screen.getByTestId(PASSWORD_TESTID_INPUT);
      const button = screen.getByText('Enter');

      userEvent.type(email, EMAIL_VALID);
      userEvent.type(senha, PASSWORD_VALID);
      userEvent.click(button);

      expect(localStorage.getItem('user')).toBe(JSON.stringify({ email: EMAIL_VALID }));
      localStorage.clear();
    });
});
describe('8 - Redirecione a pessoa usuária para a tela principal de receitas'
+ ' de comidas após a submissão e validação com sucesso do login',
() => {
  it('A rota muda para a tela principal de receitas de comidas',
    () => {
      const { history } = renderWithRouter(<Login />);

      const email = screen.getByTestId(EMAIL_TESTID_INPUT);
      const senha = screen.getByTestId(PASSWORD_TESTID_INPUT);
      const button = screen.getByText('Enter');

      userEvent.type(email, EMAIL_VALID);
      userEvent.type(senha, PASSWORD_VALID);
      userEvent.click(button);

      expect(history.location.pathname).toBe('/foods');
    });
});
