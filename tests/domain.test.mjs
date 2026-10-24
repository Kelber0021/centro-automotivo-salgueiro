import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

function source(file) {
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const compiled = { exports: {} };
  vm.runInNewContext(`(function(exports,module){${code}\n})`, { Date, Intl, URLSearchParams })(compiled.exports, compiled);
  return compiled.exports;
}
const rules = () => source('src/lib/consultation.ts');
const commerce = () => source('src/lib/commerce.ts');

test('data de São Paulo não acompanha a virada antecipada em UTC', () => {
  assert.equal(rules().localDate(new Date('2026-10-25T01:30:00Z')), '2026-10-24');
});
test('ano é opcional, aceita próximo ano-modelo e rejeita ano implausível', () => {
  for (const year of ['', '2027']) assert.equal(rules().validateRequest({ type: 'oficina', request: 'Orientação', year }, '2026-10-24').year, undefined);
  assert.ok(rules().validateRequest({ type: 'oficina', request: 'Orientação', year: '2028' }, '2026-10-24').year);
  assert.ok(rules().validateRequest({ type: 'oficina', request: 'Orientação', year: '0010' }, '2026-10-24').year);
});
test('data impossível ou passada é rejeitada, hoje e ausência são aceitos', () => {
  for (const date of ['2026-10-23', '2026-02-30']) assert.ok(rules().validateRequest({ type: 'lavajato', request: 'Lavagem', date }, '2026-10-24').date);
  for (const date of ['', '2026-10-24']) assert.equal(rules().validateRequest({ type: 'lavajato', request: 'Lavagem', date }, '2026-10-24').date, undefined);
});
test('consulta exige necessidade, não exige conhecimento técnico do veículo', () => {
  assert.ok(rules().validateRequest({ type: 'autopecas', request: '   ' }, '2026-10-24').request);
  assert.equal(Object.keys(rules().validateRequest({ type: 'oficina', request: 'Preciso de orientação' }, '2026-10-24')).length, 0);
});
test('mensagem de autopeças preserva o ano conhecido sem mencionar data', () => {
  const message = rules().buildRequestMessage({ type: 'autopecas', request: 'Item confirmado', productCode: 'REF-1', date: '2026-10-30', year: '2020' });
  assert.match(message, /REF-1/);
  assert.match(message, /2020/);
  assert.doesNotMatch(message, /2026-10-30|Data de preferência|A data|agendamento confirmado/i);
});
test('pesquisa ignora acentos, combina categoria e marca e exclui itens não aprovados', () => {
  const data = [{ id: 'teste', name: 'Óleo de teste', description: 'Fixture', categoryId: 'oleos', brand: 'Marca de teste', approved: true }, { id: 'privado', name: 'Óleo privado', categoryId: 'oleos', approved: false }];
  assert.equal(commerce().filterProducts(data, { query: 'oleo', category: 'oleos', brand: 'Marca de teste' }).length, 1);
  assert.equal(commerce().filterProducts(data, { query: 'inexistente' }).length, 0);
});
test('oferta só vigora aprovada, publicada e com datas válidas, término exclusivo', () => {
  const offer = { approved: true, published: true, startsAt: '2026-10-24T00:00:00-03:00', endsAt: '2026-10-25T00:00:00-03:00' };
  assert.equal(commerce().isOfferActive(offer, new Date('2026-10-24T03:00:00Z')), true);
  assert.equal(commerce().isOfferActive(offer, new Date('2026-10-25T03:00:00Z')), false);
  for (const change of [{ approved: false }, { published: false }, { endsAt: '' }, { startsAt: 'inválido' }]) assert.equal(commerce().isOfferActive({ ...offer, ...change }, new Date('2026-10-24T12:00:00Z')), false);
});
