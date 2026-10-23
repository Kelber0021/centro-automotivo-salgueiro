# Centro Automotivo Salgueiro

Site independente da oficina e lavajato no Maiobão, Paço do Lumiar — MA. Projeto Next.js, React e TypeScript com exportação estática. A estrutura da Clinic Car serviu de referência; nenhum arquivo, dado de demonstração, histórico Git ou destino de publicação da Clinic Car integra este projeto.

## Desenvolvimento

```sh
npm ci
npm run dev
```

`npm run build` gera `out/`. `npm run lint` e `npm run typecheck` verificam código e tipos. A exportação pode ser hospedada como site estático, sem servidor de aplicação. Este projeto não configura publicação ou serviços pagos.

## Conteúdo e contato

Dados comerciais e WhatsApp foram consultados em 23/10/2026 no [perfil do estabelecimento no Maps](https://maps.app.goo.gl/KmWV1oBNv76wHkei6). A foto da fachada também vem desse perfil e é mantida em `public/images/`. Validar com o responsável a autorização de uso das mídias antes de publicar o site. A identidade tipográfica é uma interpretação do letreiro, não uma reprodução do arquivo oficial do logotipo.

Lavajato é uma atividade informada pelo usuário. Modalidades e preços não foram inventados. Horários de feriado, estoque, valores, disponibilidade e prazo dependem da confirmação da equipe. A nota exibida é uma consulta datada, não uma integração em tempo real.

O formulário prepara uma mensagem e oferece um link para o WhatsApp: não envia mensagens sozinho, não grava dados e não confirma agendamentos. Não há painel, autenticação, pagamento ou backend de produção.

A abertura reproduz, sem som, vídeo horizontal no computador e vertical no celular. Os dois foram observados no Maps, atribuídos a “Centro Automotivo Salgueiro”, publicados em maio de 2026 (vertical) e no perfil de mídia do estabelecimento (horizontal). Os arquivos estão em `public/images/`, junto às fotos reais. O vídeo pode ser pausado, para quando a aba fica oculta e dá lugar à foto para preferência de movimento reduzido ou falha de mídia. A galeria mantém um player com controles para assistir à oficina. Nenhuma mídia foi gerada por IA.

Alterações comerciais ficam centralizadas em `src/config/site.ts`. A indexação está desativada durante a preparação: ajustar `robots` em `src/app/layout.tsx` quando houver domínio e aprovação para publicação.
