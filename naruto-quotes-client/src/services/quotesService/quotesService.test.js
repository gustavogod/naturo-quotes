import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { getQuote } from './quotesService';

const response = { test: 'testing' }; //resposta fictícia

// Servidor fictício que vai interceptar as requisições enviadas para a porta específicada,
// e response com a resposta fornecida acima
//Está retornando um json, que será atribuído a um objeto javaScript
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

test('transform json response into object', async () => {
  const quote = await getQuote();

  //a resposta do servidor deve ser exatamente um objeto javaScript
  expect(quote).toStrictEqual(response);
});