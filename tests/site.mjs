import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const load = createRequire(import.meta.url);
const { chromium } = load(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = process.env.BASE_URL || 'http://127.0.0.1:3012';
(async () => {
  const browser = await chromium.launch({ channel: process.env.BROWSER_CHANNEL || 'msedge', headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  const errors = [];
  const failedResources = [];
  page.on('response', r => { if (r.status() >= 400) failedResources.push({ status: r.status(), path: new URL(r.url()).pathname }); });
  page.on('pageerror', e => errors.push(e.message));
  let cases = 0;
  try {
    await page.goto(base, { waitUntil: 'networkidle' });
    assert.equal(await page.locator('.desktop-nav').getByRole('link', { name: 'Autopeças', exact: true }).count(), 1, 'Navegação precisa incluir Autopeças');
    for (const width of [320, 360, 390, 768, 1024, 1440, 1920]) {
      await page.setViewportSize({ width, height: 900 });
      for (const route of ['/', '/servicos/', '/autopecas/', '/sobre/', '/contato/']) {
        const response = await page.goto(base + route, { waitUntil: 'networkidle' });
        assert.equal(response.status(), 200, route);
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false, `${route} em ${width}`);
        assert.match(await page.locator('meta[name="robots"]').getAttribute('content'), /noindex/);
        cases++;
      }
    }
    await page.setViewportSize({ width: 360, height: 844 });
    await page.goto(base, { waitUntil: 'networkidle' });
    await page.getByRole('button', { name: 'Ver a oficina', exact: true }).click();
    await page.locator('.video-dialog[open]').waitFor();
    await page.keyboard.press('Escape');
    await page.waitForFunction(() => document.querySelector('.video-dialog video').paused);
    assert.equal(await page.locator('.video-dialog video').evaluate(v => v.paused), true);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.waitForFunction(() => !document.querySelector('.hero').hasAttribute('data-scroll-active'));
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.getByRole('button', { name: 'Abrir menu', exact: true }).click();
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('#menu-mobile').count(), 0);
    assert.equal(await page.getByRole('button', { name: 'Abrir menu', exact: true }).evaluate(e => e === document.activeElement), true);
    await page.getByRole('button', { name: 'Abrir menu', exact: true }).click();
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.waitForFunction(() => document.activeElement?.getAttribute('aria-label') === 'Salgueiro, página inicial');
    await page.setViewportSize({ width: 360, height: 844 });
    await page.goto(base + '/contato/', { waitUntil: 'networkidle' });
    await page.getByLabel('O que você precisa?', { exact: true }).fill('Preciso de orientação');
    await page.getByRole('button', { name: 'Preparar mensagem', exact: true }).click();
    await page.locator('.quote-result').waitFor();
    assert.match(await page.locator('.quote-result pre').innerText(), /Preciso de orientação/);
    await page.getByText('Adicionar nome, data ou observações', { exact: true }).click();
    await page.getByLabel('Nome (opcional)', { exact: true }).fill('Teste interno');
    assert.equal(await page.locator('.quote-result').count(), 0);
    await page.getByRole('radio', { name: 'Autopeças', exact: true }).check();
    await page.getByLabel('O que você precisa?', { exact: true }).fill('Consultar aplicação');
    await page.getByRole('button', { name: 'Preparar mensagem', exact: true }).click();
    assert.match(await page.locator('.quote-result pre').innerText(), /Autopeças/);
    await page.goto(base + '/sobre/', { waitUntil: 'networkidle' });
    await page.getByRole('button', { name: /Ampliar fotografia:/ }).first().click();
    await page.locator('.gallery-dialog[open]').waitFor();
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('.gallery-dialog').evaluate(e => e.open), false);
    await page.goto(base + '/horarios/', { waitUntil: 'networkidle' });
    assert.equal(await page.locator('form').count(), 0, 'Compatibilidade não deve duplicar formulário');
    await page.getByRole('link', { name: 'Solicitar atendimento', exact: true }).click();
    await page.waitForURL('**/contato/#solicitar');
    assert.match(page.url(), /contato\/#solicitar$/);
    assert.deepEqual(errors, []);
    assert.equal(failedResources.length, 0, JSON.stringify(failedResources));
    console.log(JSON.stringify({ pagesAndWidths: cases, menuEscape: true, forms: true, gallery: true, legacy: true, pageErrors: errors, sentMessages: false, failedResourceCount: failedResources.length, failedResourceExamples: failedResources.slice(0, 3) }));
  } finally { await context.close(); await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
