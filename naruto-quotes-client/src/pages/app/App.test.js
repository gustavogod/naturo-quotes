// import { rest } from 'msw';
// import { setupServer } from 'msw/node';
import { render, screen, fireEvent } from '@testing-library/react';
import { App } from './App';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const response = { speaker: 'Speaker', quote: 'test quote'};

const server = setupServer(
  rest.get(process.env.REACT_APP_API, (req, res, ctx) => {
    return res(ctx.json(response));
  })
);

//Ações a serem feitas antes de executar os testes
beforeAll(() => server.listen());
//Ações a serem feitas depois de cada teste
//É bom resetar os handlers pq pode ser q a cada teste algo diferente seja testado
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

//Quero ver se na tela tem um botão, uma frase, e um botão
//getByRole -> pegar pelo tipo do elemento
// regex -> expressões entre /expressão/
test('renders the app with a button, a quote and a button', () => {
  render(<App />);

  const buttonEl = screen.getByRole('button');
  const imageEl = screen.getByRole('img');
  const textEl = screen.getByText(/loading speaker/);

  expect(buttonEl).toBeInTheDocument();
  expect(imageEl).toBeInTheDocument();
  expect(textEl).toBeInTheDocument();
});

//Diferença do get para o find:
//find é assíncrono, ele fica esperando que algo apareça 
//é ideal quando tem q esperar algo executar, tipo uma chamada de servidor
test('calls api on button click and update its text', async () => {
  render(<App />);

  const buttonEl = screen.getByRole('button');

  fireEvent.click(buttonEl);

  const quoteEl = await screen.findByText(response.quote);

  expect(quoteEl).toBeInTheDocument();
});

//Teste para ver se ele traz uma frase já no carregamento da aplicação
test('calls api on startup and renders it reponse', async () => {
  render(<App />);

  const quoteEl = await screen.findByText(response.quote);

  expect(quoteEl).toBeInTheDocument();
});
