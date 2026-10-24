# Centro Automotivo Salgueiro

Site independente da oficina e lavajato no Maiobão, Paço do Lumiar — MA. Projeto Next.js, React e TypeScript com exportação estática. A estrutura da Clinic Car serviu de referência; nenhum arquivo, dado de demonstração, histórico Git ou destino de publicação da Clinic Car integra este projeto.

## Desenvolvimento

Redesign em implementação local na branch `codex/salgueiro-redesign-clean`, sem push/deploy automático. Estado, testes e limitações estão em `docs/IMPLEMENTACAO_REDESIGN.md`; autorizações pendentes em `docs/INVENTARIO_MIDIAS.md`.

```sh
npm ci
npm run dev
```

`npm run build` gera `out/`. `npm run lint` e `npm run typecheck` verificam código e tipos. A exportação pode ser hospedada como site estático, sem servidor de aplicação. Este projeto não configura publicação ou serviços pagos.

## Conteúdo e contato

Dados comerciais e WhatsApp foram consultados em 23/10/2026 no [perfil do estabelecimento no Maps](https://maps.app.goo.gl/KmWV1oBNv76wHkei6). A foto da fachada também vem desse perfil e é mantida em `public/images/`. Validar com o responsável a autorização de uso das mídias antes de publicar o site. A versão local de redesign usa um recorte de referência da marca presente na publicação oficial, sem redesenho. O arquivo original e sua aplicação definitiva continuam pendentes de validação.

Lavajato é uma atividade informada pelo usuário. Modalidades e preços não foram inventados. Horários de feriado, estoque, valores, disponibilidade e prazo dependem da confirmação da equipe. A nota exibida é uma consulta datada, não uma integração em tempo real.

O formulário em `/contato/#solicitar` prepara uma mensagem para oficina, autopeças ou lavajato: não envia sozinho, não grava dados e não confirma agendamentos. `/horarios/` encaminha ao formulário único, preservando o acesso antigo sem simular redirect HTTP. Não há painel, autenticação, pagamento ou backend de produção.

`src/config/catalog.ts` mantém produtos e ofertas vazios até aprovação comercial. As categorias de planejamento também têm aprovação explícita e ficam ocultas enquanto pendentes. A página Autopeças oferece consulta humana, sem inventar produtos, preços, marcas ou quantidades. Quando houver conteúdo validado, a estrutura de busca/filtros/modal e ofertas poderá ser exercitada com os dados reais.

## Verificações do redesign

`npm test` executa os testes de regras com Node e o TypeScript já instalado, sem biblioteca extra. `npm run lint` e `npm run build` verificam lint, tipos e export.

O teste de navegador é `node tests/site.mjs`, com `BASE_URL` apontando à prévia local e `PLAYWRIGHT_MODULE` apontando a uma instalação existente do Playwright. `BROWSER_CHANNEL` permite selecionar o navegador instalado. Não se inclui um caminho pessoal fixo no script e nenhuma dependência foi instalada para essa execução. A suíte percorre cinco páginas nas sete larguras aprovadas, formulário, teclado/galeria, menu e compatibilidade. Ela não envia mensagens.

A abertura apresenta a foto real da fachada, publicada no Maps e mantida em `public/images/salgueiro-oficina.jpg`, com enquadramentos próprios para computador e celular. A ilustração conceitual de aros usada anteriormente foi preservada em `public/images/hero-aro-salgueiro.png`, com seu prompt e origem no arquivo `.prompt.txt` ao lado, mas não é exibida na abertura. As fotos da galeria e o vídeo da oficina também são mídias reais do Maps. O botão “Ver a oficina” abre o vídeo com controles e pausa a reprodução ao fechar.

O modelo visual foi fornecido pelo usuário. As microinterações foram adaptadas da demonstração pública [Daily Direction, de Joseph Berry](https://daily-direction.webflow.io/): referências de botões, play, menu, contato e setas. O redesign reduz esses efeitos a feedback discreto e movimento progressivo. A implementação usa os componentes Next.js e CSS do projeto, sem carregar o runtime do Webflow. O site não usa marcas de parceiros, preços, estatísticas ou clientes fictícios do modelo de agência.

Os trechos de avaliações foram conferidos em português em 23/10/2026 no [Maps](https://www.google.com/maps?cid=10604754035794480067&hl=pt-BR), com links para os perfis públicos. Não são depoimentos fictícios. O mapa interativo carrega por solicitação, com foto de referência, estado de carregamento, nova tentativa e link de rota sempre disponível. O formulário oferece oficina ou lavajato; nome, data e observações são opcionais. O orçamento e o agendamento continuam sujeitos à confirmação da equipe.

Alterações comerciais ficam centralizadas em `src/config/site.ts`. A indexação está desativada durante a preparação: ajustar `robots` em `src/app/layout.tsx` quando houver domínio e aprovação para publicação.

A seção de Instagram destaca o perfil oficial e duas publicações públicas conferidas em 24/10/2026: troca de óleo (23/10) e revisão para viagem (21/10). As prévias locais mantêm as artes originais e levam aos posts por links diretos. A lista fica em `instagramPosts`, na configuração do site, e é uma seleção manual, sem API, feed automático ou contador de seguidores. Cashback citado na bio não é anunciado no site sem confirmação das condições.
