# Verificação visual e funcional — Salgueiro

Data: 24/10/2026. Escopo: adaptação da referência visual fornecida pelo usuário, preservando dados e funções da Salgueiro.

## Referência e evidências

A imagem fornecida reúne dois recortes de layout. A verificação compara composição, hierarquia e linguagem visual; não declara igualdade de pixels entre a composição e um viewport de navegador.

Capturas locais em `output/modelo-reference/`: `comparacao.png`, `desktop.png`, `desktop-completo.png`, `celular.png`, `estrutura.png`, `avaliacoes-cta.png` e `agendamento-celular.png`. Desktop: 1440 × 1000; celular: 390 × 844. A comparação coloca referência e implementação na mesma imagem.

## Superfícies verificadas

- Tipografia: Manrope para conteúdo e títulos; Barlow Condensed preservada na marca. Hierarquia sem serifa e destaque no título seguem a referência.
- Composição: abertura escura com arte à direita, faixa de serviços, quatro destaques, área clara, bloco de estrutura com fotos, avaliações com CTA, galeria, processo e opções de atendimento. Moldura com margens laterais corrigida.
- Cores: amarelo, vermelho e grafite da Salgueiro substituem o laranja da referência. Contrastes medidos: botão 10,95:1; corpo dos serviços 5,77:1; rótulo claro 4,60:1; texto do destaque 5,94:1; texto do CTA 5,71:1.
- Imagens: arte 3D conceitual gerada, com origem e prompt registrados ao lado do arquivo. Fotografias e vídeo reais preservados. Não há logos de parceiros, clientes, preços ou resultados fictícios copiados do modelo.
- Conteúdo: português e serviços reais da empresa. Valores, peças, lavagem e agenda dependem da confirmação da equipe.

## Correções e confirmação

- Corrigido o reposicionamento do bloco durante o foco por ponteiro, que podia cancelar o primeiro clique das avaliações. Reproduzido com eventos de ponteiro e confirmado após a correção, inclusive após abrir e fechar o vídeo.
- A captura inicial do formulário estava incompleta por causa das animações; foi refeita após revelar o bloco e confirmar a hidratação pelos controles. A captura final mostra todo o formulário.
- Capturas finais em contexto novo, com `caret: initial`, sem erro de hidratação ou erro de execução registrado.

## Fluxos exercitados

- Cinco páginas em 360, 768 e 1440 px: HTTP 200, sem rolagem horizontal.
- Vídeo: abre, reproduz, fecha com Escape e pausa ao fechar.
- Avaliações: primeiro clique alterna o trecho e o autor.
- Galeria e serviços: filtros retornam os conjuntos esperados.
- Contato rápido: duas opções com o WhatsApp correto; Escape fecha o painel.
- Formulário: mensagens de oficina e lavagem, nome opcional e limpeza da mensagem ao editar. Nenhuma mensagem enviada.
- Toque emulado: rolagem altera o efeito, menu navega e formulário prepara o atendimento.
- Preferência por movimento reduzido: conteúdo visível e efeitos desativados.
- Build, TypeScript e lint concluídos. Detector visual executado sem ocorrências na implementação inicial do modelo.

Limites: teste móvel emulado em Chromium/Edge; não representa validação em aparelhos físicos ou Safari. O mapa depende do serviço externo e mantém foto, nova tentativa e link de rota disponíveis. Melhorias estéticas adicionais são opcionais.

## Destaque do Instagram — 24/10/2026

- Perfil público conferido no navegador: `salgueiro_centro_automotivo`. Duas artes originais vinculadas às publicações de 23/10/2026 e 21/10/2026; seleção manual, sem apresentar contador de seguidores como informação ao vivo.
- Link do perfil, chamada principal e dois links de posts confirmados; novas abas com `noopener noreferrer`. Quatro links externos para o domínio oficial.
- Seção verificada em 360, 768 e 1440 px, sem rolagem horizontal ou erros de execução registrados. Prévias locais carregadas, com enquadramento `contain` para preservar o anúncio inteiro.
- Capturas revisadas em `output/instagram-desktop.png` e `output/instagram-celular.png`. Build, TypeScript e lint concluídos; detector sem ocorrências.
- Cashback mencionado na bio permanece sujeito à confirmação de regras antes de anúncio próprio no site.

final result: passed
