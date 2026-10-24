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

A abertura usa uma ilustração conceitual 3D de aros, criada com o image_gen builtin. Ela não representa uma peça à venda nem uma instalação real da empresa. O arquivo está em `public/images/hero-aro-salgueiro.png`; o prompt exato e a origem estão no arquivo `.prompt.txt` ao lado. As fotos da galeria e o vídeo da oficina continuam sendo mídias reais do Maps. O botão “Ver a oficina” abre o vídeo com controles e pausa a reprodução ao fechar.

O modelo visual foi fornecido pelo usuário. As microinterações foram adaptadas da demonstração pública [Daily Direction, de Joseph Berry](https://daily-direction.webflow.io/): texto deslizante (01), pulso do play (02), menu animado (07), abertura de contatos (08) e setas nos links (09). A implementação usa os componentes Next.js e CSS do projeto, sem carregar o runtime do Webflow. O site não usa marcas de parceiros, preços, estatísticas ou clientes fictícios do modelo de agência.

Os trechos de avaliações foram conferidos em português em 23/10/2026 no [Maps](https://www.google.com/maps?cid=10604754035794480067&hl=pt-BR), com links para os perfis públicos. Não são depoimentos fictícios. O mapa interativo carrega por solicitação, com foto de referência, estado de carregamento, nova tentativa e link de rota sempre disponível. O formulário oferece oficina ou lavajato; nome, data e observações são opcionais. O orçamento e o agendamento continuam sujeitos à confirmação da equipe.

Alterações comerciais ficam centralizadas em `src/config/site.ts`. A indexação está desativada durante a preparação: ajustar `robots` em `src/app/layout.tsx` quando houver domínio e aprovação para publicação.
