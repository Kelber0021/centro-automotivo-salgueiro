# Redesign Salgueiro — execução local

Base: decisões funcionais aprovadas pelo usuário em 24/10/2026. Autorização de implementação recebida; sem autorização de publicação comercial.

## Limites

- Não fazer push/deploy nem apresentar ao proprietário.
- Preservar `noindex`, fontes originais de mídia e relatório de auditoria.
- Logo em referência interna: recorte visual de publicação oficial, sem redesenho. Aplicação definitiva depende do original autorizado.
- Fachada/endereço de referência aprovados condicionalmente; direitos das mídias pendentes.
- Produtos, categorias comerciais e ofertas não validados ficam fora da publicação.
- Sem CMS, backend, ERP ou checkout.

## Decisões de execução

- Branch local `codex/salgueiro-redesign-clean`, no repositório Salgueiro. A ferramenta nativa de worktree desta conversa aponta para o outro projeto (Clinic Car); não a usar para misturar os projetos. Alterações locais nesta branch, sem commits automáticos.
- Reaproveitar componentes e CSS existentes; aplicar camada de redesign com seletores próprios, sem apagar comportamentos anteriores.
- Manter `/horarios/` como página de compatibilidade que encaminha ao formulário único em Contato. Redirect HTTP depende de futura configuração autorizada no hosting.
- Ano opcional de 1900 até ano local + 1; é uma faixa técnica configurável, não comprovação de aplicação veicular.
- Datas de ofertas exigem offset e término; relógio do aparelho continua sendo limitação conhecida.

## Progresso

- [x] Reinspeção de código, instruções e estado Git.
- [x] Testes RED: sete cenários falharam por ausência dos módulos de regras.
- [x] Design System/navegação e páginas — implementação local.
- [x] Formulário, galeria e estrutura de catálogo/ofertas. Conteúdo comercial permanece pendente.
- [x] Testes GREEN, lint, build e QA responsivo em Edge emulado.
- [x] Revisão final e registro de limites comerciais/dispositivos.

## Verificações e revisão

- `npm run lint`, sete testes de regras e build com TypeScript: passaram na versão atual.
- Revisão independente somente leitura: ano informado sem marca/modelo, referência indevida a data em autopeças e foco após redimensionamento foram corrigidos com cobertura de teste.
- Identificado prefetch RSC com 404 no export estático. `SiteLink` usa navegação nativa por documento, mantendo query/hash e fallback sem JavaScript. Teste de rede adicional exige zero respostas de recurso >=400 na amostra de rotas válidas.
- Fase 5 continua parcial: sem Lighthouse/axe instalados no runtime, sem medição de campo e sem Safari/iPhone/Android físico nesta execução. Não instalar novas ferramentas só para produzir um score.
- Produtos e ofertas reais não existem nos arrays; filtros/validade têm testes de domínio, e estado vazio é exercitado no navegador. Modal com produtos comerciais e ofertas efetivas precisam ser validados com o conteúdo autorizado.
- Sem commits, push ou deploy. Originais de mídia e auditoria anterior preservados.

## Resultado final desta execução

- Suíte de domínio: 7/7 passou. Lint e build/TypeScript passaram.
- Edge headless: 5 páginas × 7 larguras (320, 360, 390, 768, 1024, 1440, 1920): 35 carregamentos, sem overflow. Formulário, menu/Escape, foco após resize, vídeo/pausa, movimento reduzido, galeria/teclado e compatibilidade passaram. Zero exceções JS e zero respostas de recursos >=400 na amostra final.
- Os 10 arquivos de mídia originais foram comparados por SHA-256 e permaneceram idênticos.
- Capturas reais em `output/redesign-implementado/`, com imagens lazy carregadas por rolagem.
- Prévia local: http://127.0.0.1:3012/ (export estático servido somente em loopback).
- Fases 1/2/4 possuem implementação local; Fase 3 tem estrutura sem conteúdo comercial validado. Fase 5 tem verificações funcionais, mas não homologação comercial, Lighthouse, medição de campo ou hardware físico.
- A marca é referência raster da arte oficial; arquivo original definitivo, fachada atual, endereço e direitos das mídias continuam pendentes. Produtos/ofertas permanecem vazios.

## Publicação para visualização — 24/10/2026

Usuário autorizou publicar esta versão no Render e fornecer o link. A autorização permite o envio necessário à branch de publicação. Manter noindex e as pendências comerciais documentadas; isso não confirma direitos de mídia ou dados definitivos da empresa.
