# DoomsDay — resumo do projeto

Última atualização: 16 de julho de 2026.

## Conceito geral

O site apresenta a obra original **DoomsDay**, ambientada em um apocalipse e construída como uma experiência cinematográfica e interativa. A linguagem visual mistura:

- terminal militar;
- arquivos confidenciais recuperados;
- interferência CRT e glitch;
- registros de sobreviventes;
- documentos do FBI e do Pentágono;
- tons escuros, vermelho, âmbar e verde de monitor.

As fontes principais são Anton, Courier Prime e VT323.

## Estrutura atual

- `index.html`: introdução cinematográfica e entrada no site.
- `home.html`: página principal e navegação pelos arquivos.
- `historia.html`: conteúdo relacionado à história e aos testemunhos.
- `personagens.html`: fichas pesquisáveis e filtráveis dos personagens.
- `personagem.html`: arquivo secreto dinâmico de cada personagem.
- `evidencias.html`: cofre dinâmico com os lotes completos de fotografias encontradas.
- `acesso-restrito.html`: portal protegido do material ainda em construção da Melissa.
- `ameaca.html`: informações sobre a ameaça.
- `galeria.html`: registros visuais do universo.
- `cursor-site.css` e `cursor-site.js`: cursor personalizado compartilhado pelas páginas gerais.

## Introdução — `index.html`

A abertura possui:

- tela inicial “Toque para iniciar”;
- trilha sonora em `audio/themeintro.mp3`;
- três testemunhos apresentados em sequência;
- transição de sangue cobrindo a tela;
- revelação inicial do título **DOOMSDAY**;
- neve rápida começando somente quando o título aparece;
- transformação gradual, letra por letra, de **DOOMSDAY** para **APOCALIPSE**;
- chamada para entrar no site;
- redirecionamento para `home.html`.

A transformação está na função `transformTitle()`. Cada letra antiga sobe e desaparece antes de ser substituída pela letra correspondente de “APOCALIPSE”. As duas letras adicionais são criadas no final.

## Página principal — `home.html`

Antes da página principal aparecer, existe um texto introdutório em formato de crawl. Depois dele, o título é montado por partículas.

### Composição do título

- **DOOMSDAY** é o título principal.
- “DOOMS” permanece claro.
- “DAY” possui vermelho, brilho e glitch.
- **APOCALIPSE** aparece abaixo como uma sombra projetada do título.
- A primeira e a última letra de “APOCALIPSE” são alinhadas às extremidades de “DOOMSDAY”.
- As letras intermediárias são distribuídas dentro da mesma largura.
- As letras de “APOCALIPSE” descem individualmente e lentamente.
- Primeiro a palavra se forma como uma sombra escura.
- Depois o fogo é aceso letra por letra, do “A” até o “E”.
- O fogo representa o caos e o pico do surto.
- A frase “Era uma manhã como qualquer outra...” recebeu mais espaço abaixo da composição.

### Sangue

Filetes de sangue são gerados dinamicamente sobre o título. Atualmente o contêiner `.blood-drips` começa em `top: 8%`, fazendo o sangue nascer próximo ao topo e escorrer por praticamente toda a altura das letras de “DOOMSDAY”.

Esse foi o último ajuste visual realizado e pode ser refinado caso a posição ainda varie demais em diferentes resoluções.

## Personagens — `personagens.html`

A página contém:

- pesquisa por nome, função ou família;
- filtros para Bradock, Hanson e Pentágono;
- contador de resultados;
- fichas em estilo de terminal;
- modal acessível com registro completo;
- navegação anterior/próximo no modal;
- imagens preservando sua proporção, sem exigir conversão manual para banners;
- blocos maiores para acomodar os retratos;
- botão **Abrir arquivo secreto** ao lado do status, na parte inferior da ficha.

No momento, Mick e Mei possuem arquivo secreto porque são os personagens que já têm conjuntos de imagens no projeto.

## Arquivos secretos — `personagem.html`

Uma única página dinâmica lê o parâmetro da URL:

- `personagem.html?id=mick`
- `personagem.html?id=mei`

Cada arquivo apresenta:

- identificação confidencial;
- histórico recuperado;
- nota do investigador;
- linha do tempo do Dia Zero;
- localização no momento do surto;
- evidências fotográficas numeradas;
- ampliação das evidências em lightbox.

Quando uma informação ainda não foi definida na história, o texto usa “não confirmado”, “registro incompleto” ou conteúdo classificado em vez de inventar fatos.

As fotografias não são apresentadas como uma galeria tradicional. Elas aparecem como documentos e evidências anexadas ao caso. Os blocos são compactos, possuem a mesma largura e preservam a proporção original das imagens.

## Efeitos exclusivos dos personagens

### Mick Bradock

Por ser agente do FBI, o arquivo de Mick possui:

- varredura verde de vigilância;
- retículo sobre a fotografia de identificação;
- indicador “SUBJECT TRACKED”;
- pulsos na linha do tempo;
- reação nas evidências ao passar o mouse;
- cursor exclusivo em formato de mira tática;
- ponto vermelho central;
- mudança da mira sobre elementos interativos;
- pulso vermelho ao clicar.

### Melissa “Mei” Bradock

Por ser arquiteta, o arquivo de Mei possui:

- grade técnica semelhante a uma planta arquitetônica;
- linhas horizontais e verticais de medição;
- detalhes em azul técnico.
- cursor exclusivo de desenho técnico;
- coordenadas X/Y acompanhando o movimento do mouse;
- marcações de enquadramento e escala `1:50`;
- linhas de cotagem animadas nos documentos;
- reação visual técnica sobre as evidências.

O sistema já aplica os temas automaticamente conforme o parâmetro `id` da URL.

## Evidências encontradas

Os arquivos individuais possuem um segundo nível de material em `evidencias.html`:

- Mick possui seis registros fotográficos disponíveis;
- Melissa possui vinte registros catalogados;
- cada item recebe número de evidência e código de lote;
- as imagens preservam sua proporção original;
- os registros aparecem conforme a rolagem;
- clicar em uma fotografia abre a evidência em tela cheia;
- o botão de retorno leva ao dossiê correto.

No arquivo de Melissa, a terceira evidência preliminar exibida em `personagem.html` usa atualmente `img-mei/meicaseira.png`.

## Acesso restrito da Melissa

Enquanto as fotografias de Melissa ainda estão sendo preparadas:

- o acesso visível foi substituído por um símbolo arquitetônico discreto `⌖`;
- o símbolo abre `acesso-restrito.html`;
- a tela apresenta o setor como “obra em andamento” e “área interditada”;
- uma credencial é solicitada antes da abertura do cofre;
- a senha é comparada por hash e não aparece em texto aberto no código;
- uma tentativa incorreta exibe “Acesso negado”;
- a autorização é mantida apenas durante a sessão do navegador;
- abrir diretamente as evidências de Melissa sem autorização redireciona para o portal restrito.

Esta proteção é adequada apenas para a fase atual de demonstração do site estático. Antes de uma publicação profissional, o material deverá ser liberado ou protegido por autenticação no servidor.

## Cursor geral do site

As páginas gerais usam um cursor de “terminal de sobrevivência”, enquanto os arquivos individuais preservam seus efeitos próprios.

Características:

- ponteiro angular âmbar;
- núcleo vermelho;
- pequeno rastro de interferência;
- `[ ACESSAR ]` sobre links e botões;
- `[ ANALISAR ]` sobre imagens;
- glitch rápido ao clicar;
- cursor de texto normal em campos editáveis;
- desativação automática em dispositivos de toque;
- redução das animações conforme as preferências de acessibilidade.

O cursor geral está ligado a:

- `index.html`;
- `home.html`;
- `historia.html`;
- `personagens.html`;
- `galeria.html`;
- `ameaca.html`.

Ele não é carregado em `personagem.html`, permitindo que Mick mantenha sua mira exclusiva.

## Imagens disponíveis

### Mick / Bradock

Pasta `img-bradock/`, incluindo retratos e evidências como:

- `mick.png`;
- `mick2.png`;
- `mick3.png`;
- `mick4.png`.

### Mei

Pasta `img-mei/`, incluindo:

- `mei1.png`;
- `meiurbana.png`;
- `meiurbana2.png`;
- `mellissa2.png`;
- outras variações disponíveis na mesma pasta.

## Decisões importantes

- Não transformar manualmente todas as imagens em banners.
- Preservar a proporção original dos arquivos.
- Evitar galerias convencionais nas páginas dos personagens.
- Tratar as fotos como evidências de um arquivo secreto.
- Não inventar eventos da história que ainda não foram definidos.
- Criar efeitos específicos de acordo com a personalidade ou profissão de cada personagem.
- Manter “DOOMSDAY” como nome principal da obra.
- Usar “APOCALIPSE” como tradução/sombra e representação visual do caos.

## Próximos passos possíveis

- Testar a posição do sangue em diferentes tamanhos de tela.
- Refinar o alinhamento da sombra “APOCALIPSE” em celulares.
- Definir onde Mick e Mei estavam exatamente no Dia Zero.
- Criar imagens e arquivos secretos para os demais personagens.
- Criar efeitos exclusivos para Chris, Diana, Emma, James, Stayci e Samuel.
- Revisar o tempo completo das animações de `index.html` e `home.html`.
- Fazer uma revisão final de desempenho, acessibilidade e responsividade.
