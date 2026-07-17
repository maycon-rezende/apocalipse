# DoomsDay — resumo do projeto

Última atualização: 17 de julho de 2026.

## Conceito geral

O site apresenta a obra original **DoomsDay**, ambientada em um apocalipse e construída como uma experiência cinematográfica e interativa. A linguagem visual mistura:

- terminal militar;
- arquivos confidenciais recuperados;
- interferência CRT e glitch;
- registros de sobreviventes;
- documentos do FBI e do Pentágono;
- tons escuros, vermelho, âmbar e verde de monitor.

As fontes principais são Anton, Courier Prime e VT323.

### Significado do título

O nome **DoomsDay** possui uma divisão narrativa deliberada:

- **DOOM** é o nome dado ao elemento viral descoberto por cientistas na Antártida, preservado no gelo desde uma era remota junto a organismos ainda desconhecidos;
- **DAY** representa o dia em que o surto atinge seu ápice e o caos rompe a normalidade;
- **Z**, incorporado visualmente a **APOCALIPSEZ**, representa o **Dia Zero**, conectando a origem do elemento ao começo do colapso.

Por isso, o gelo e a neve da introdução representam a origem antártica de DOOM, enquanto o fogo da Home representa DAY, o dia do caos. O Z encerra as duas composições como marca do ponto inicial do apocalipse.

## Estrutura atual

- `index.html`: introdução cinematográfica e entrada no site.
- `home.html`: página principal e navegação pelos arquivos.
- `historia.html`: conteúdo relacionado à história e aos testemunhos.
- `personagens.html`: fichas pesquisáveis e filtráveis dos personagens.
- `personagem.html`: arquivo secreto dinâmico de cada personagem.
- `evidencias.html`: cofre dinâmico com os lotes completos de fotografias encontradas.
- `acesso-restrito.html`: portal protegido do material ainda em construção da Melissa.
- `ameaca.html`: informações sobre a ameaça.
- `projeto-doom.html`: arquivo ultrassecreto sobre a descoberta antártica e a cadeia de custódia incompleta de DOOM.
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
- transformação gradual, letra por letra, de **DOOMSDAY** para **APOCALIPSEZ**;
- chamada para entrar no site;
- redirecionamento para `home.html`.

A transformação está na função `transformTitle()`. Cada letra antiga sobe e desaparece antes de ser substituída pela letra correspondente de “APOCALIPSEZ”. As três letras adicionais são criadas no final, sendo o Z a marca visual do Dia Zero.

Depois que a transformação termina, a parte superior de cada letra de **APOCALIPSEZ** congela em sequência, da esquerda para a direita. O efeito possui:

- cobertura branca e azulada;
- borda de gelo irregular;
- brilho frio;
- pequenos pingentes;
- integração visual com a neve que já cai ao fundo.

## Página principal — `home.html`

Antes da página principal aparecer, existe um texto introdutório em formato de crawl. A fonte desse texto foi aumentada para melhorar a leitura.

A sequência cinematográfica da abertura é exibida somente na primeira visita à página durante a sessão do navegador. Ao retornar de Personagens ou de outro setor, a página monta imediatamente o estado final da hero, com o título, o arquivo recuperado e o restante da navegação já disponíveis. Uma nova sessão volta a apresentar a abertura completa.

Ao final do crawl:

- a parte final do relato permanece visível por um instante;
- os caracteres perdem definição e se desfazem em poeira;
- partículas claras, cinzas, vermelhas e âmbar convergem para o centro da tela;
- essa transição conduz diretamente à formação do título.

### Composição do título

- **DOOMSDAY** é o título principal e agora surge letra por letra.
- Cada letra nasce de sua própria nuvem de poeira e ganha definição gradualmente.
- “DOOMS” é formado por partículas claras, cinza queimado e pequenos pontos âmbar.
- “DAY” é formado por cinzas vermelhas e brasas âmbar.
- “DOOMS” permanece claro.
- “DAY” possui vermelho, brilho e glitch.
- **APOCALIPSEZ** aparece abaixo como uma sombra projetada do título.
- A primeira e a última letra de “APOCALIPSEZ” são alinhadas às extremidades de “DOOMSDAY”.
- As letras intermediárias são distribuídas dentro da mesma largura.
- As letras de “APOCALIPSEZ” descem individualmente e lentamente.
- Primeiro a palavra se forma como uma sombra escura.
- Depois o fogo é aceso letra por letra, do “A” até o “E”.
- O fogo representa o caos e o pico do surto.
- A frase “Era uma manhã como qualquer outra...” recebeu mais espaço abaixo da composição.

### Sangue

Filetes de sangue são gerados dinamicamente sobre o título. Atualmente o contêiner `.blood-drips` começa em `top: 8%`, fazendo o sangue nascer próximo ao topo e escorrer por praticamente toda a altura das letras de “DOOMSDAY”.

Esse foi o último ajuste visual realizado e pode ser refinado caso a posição ainda varie demais em diferentes resoluções.

### Arquivo recuperado

Depois da formação do título, do fogo e do sangue, a página apresenta um painel funcional de recuperação:

- identificação `DD-01`;
- origem no setor de contenção;
- classificação de nível vermelho;
- integridade avançando de `00%` até `63%`;
- mensagens de localização, reconstrução e validação dos registros;
- linha de varredura e indicador pulsante;
- botão bloqueado durante a recuperação;
- botão **Acessar arquivos recuperados** liberado ao final;
- rolagem direta até o diretório principal.

### Diretório recuperado

A antiga seção “Explorar” foi transformada em um diretório militar com quatro setores:

- Setor 01 — História;
- Setor 02 — Personagens;
- Setor 03 — Ameaça;
- Setor 04 — Galeria.

Cada setor possui código, estado, cor própria, varredura ao interagir, descrição contextual e chamada de acesso específica. O setor de personagens apresenta um contador animado com os oito registros existentes.

### Dossiês prioritários

A página principal agora oferece acesso direto aos arquivos secretos já disponíveis:

- Mick Bradock: `personagem.html?id=mick`, com retrato, mira e indicação `SUBJECT TRACKED`;
- Melissa “Mei” Bradock: `personagem.html?id=mei`, com grade arquitetônica, coordenadas técnicas e aviso de evidências restritas.

Os cards preservam as identidades visuais dos respectivos dossiês e se adaptam a telas menores.

Antes de navegar, cada card pode ser expandido para revelar uma prévia operacional, a quantidade de evidências e o comando final de autorização. Os acessos a Personagens e aos arquivos secretos usam uma transição compartilhada de rasgos e marcas de garras, como se a interface fosse violada por uma criatura.

A Home também passou a incluir:

- linha do tempo parcial do Dia Zero, sem confirmar acontecimentos ainda indefinidos;
- mapa operacional estilizado com zonas e origem do sinal não confirmadas;
- painel contextual dos quatro setores ao interagir com o diretório;
- memória de setores consultados durante a sessão;
- painel numérico com o progresso atual da investigação;
- transmissões ocasionais e discretas do sistema;
- última transmissão interrompida antes do rodapé;
- retorno inteligente dos arquivos secretos, com rolagem e destaque do dossiê consultado.

## História — `historia.html`

A página de História foi reorganizada como um arquivo cronológico recuperado. Ela possui:

- cabeçalho confidencial com classificação, integridade e estado da reconstrução;
- abertura identificada como **Sinopse**, com letras reconstruídas individualmente e interferência discreta;
- índice fixo para resumo, Dia Zero, documentos e testemunhos;
- filtros dos registros por Bradock, Hanson e Pentágono;
- indicadores editoriais de fonte e confiabilidade em cada cena;
- transcrição de rádio baseada somente nos acontecimentos já definidos;
- memorando censurado que sinaliza explicitamente informações ainda não confirmadas;
- testemunhos reservados para futuros trechos reais da obra, sem conteúdo narrativo inventado.

## Galeria — `galeria.html`

A Galeria foi transformada em um arquivo visual recuperado com:

- doze registros visuais de Mick; as imagens de Mei foram retiradas da Galeria enquanto essa parte é reestruturada;
- preservação da proporção original das imagens em composição tipo arquivo/mosaico;
- filtros por personagem e por retrato, ambiente ou registro pessoal;
- códigos, integridade, procedência e contexto editorial sem inventar datas ou acontecimentos;
- contador dinâmico dos registros visíveis;
- visualizador em tela cheia com metadados, teclado e navegação anterior/próximo.

## Ameaça — `ameaca.html`

A página de Ameaça foi transformada em um relatório científico-militar sobre DOOM. Ela apresenta:

- designação DOOM e origem confirmada na Antártida;
- representação técnica da amostra preservada no gelo;
- ficha de recuperação com equipe e coordenadas classificadas;
- separação entre dados confirmados, informações em análise e arquivos bloqueados;
- filtros interativos para os três estados de conhecimento;
- cadeia de custódia do gelo ao Dia Zero, mantendo em aberto transporte, pesquisa e falha de contenção;
- remoção das antigas afirmações sobre transmissão, comportamento e vulnerabilidades que ainda não foram definidas na história.

## Projeto DOOM — `projeto-doom.html`

O arquivo de nível 05 separa a origem do agente biológico do relatório geral de ameaça. Ele apresenta:

- descoberta confirmada da amostra no gelo antártico;
- protocolo de acesso obrigatório com inicialização digitada, cinco fragmentos escondidos pelo site e credencial persistente do laboratório;
- mapa interativo do laboratório com Recepção, Observação, Criogenia, Testes, Contenção e Arquivo Central;
- terminal de inspeção que diferencia setores recuperados, registros ausentes e áreas ainda bloqueadas;
- cadeia de custódia expansível entre recuperação, expedição, transporte, pesquisa, ruptura e Dia Zero;
- documentos classificados e perguntas de continuidade ainda pendentes;
- campos preparados para receber fatos novos durante a reescrita, sem antecipar respostas;
- acesso pela navegação da Home e pelo relatório de Ameaça.

## Continuidade da família Bradock

- **Melissa “Mei” Bradock** substitui definitivamente o antigo nome Elisabeth;
- os filhos de Mick e Mei são **Chris**, **Maya** e **Hanna**;
- Maya substitui o antigo nome Diana;
- Hanna substitui o antigo nome Emma.

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

- trilha sonora exclusiva em `audio/thememick.mp3`, reproduzida em loop somente no dossiê de Mick;
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
- Usar “APOCALIPSEZ” como tradução/sombra e representação visual do caos, com o Z representando o Dia Zero.

## Versionamento e GitHub

O projeto é versionado no repositório:

- `https://github.com/maycon-rezende/apocalipse.git`
- branch principal: `main`.

A partir desta atualização, as mudanças relevantes do projeto também serão registradas neste resumo e enviadas ao GitHub. Antes de cada envio, devem ser conferidos os arquivos alterados, a validade do JavaScript e os caminhos locais utilizados pelas páginas.

### Última sincronização

Em 17 de julho de 2026, o projeto foi sincronizado com a branch `main` no commit `392afe6` (`Expande arquivos narrativos e visuais do DoomsDay`). O envio incluiu:

- significado narrativo de DOOM, DAY e do Z de Dia Zero;
- composição **APOCALIPSEZ** no `index.html` e na sombra da Home;
- abertura da Home executada somente uma vez por sessão;
- novos painéis operacionais, mapa, dossiês expansíveis e retorno inteligente na Home;
- transição compartilhada de rasgos entre páginas e dossiês;
- trilha exclusiva de Mick em `audio/thememick.mp3`;
- reformulação inicial das páginas História e Ameaça;
- Galeria ampliada para todos os 41 registros de Mick e Mei;
- melhorias visuais nos cards de personagens;
- novas imagens adicionadas às pastas `img-bradock/` e `img-mei/`.

Após o envio, o commit local e `origin/main` foram conferidos e estavam sincronizados no hash `392afe6a57a27559a7d7e88c8217ee7dbd092ff2`.

### Atualização atual — 17 de julho de 2026

Esta versão também foi preparada e sincronizada com o GitHub na branch `main`. A atualização inclui:

- correção de continuidade: Elisabeth passa definitivamente a ser Melissa “Mei” Bradock;
- atualização dos nomes das filhas para Maya e Hanna;
- remoção das fotografias de Mei da Galeria, que será reconstruída futuramente com imagens do apocalipse e do caos;
- criação do arquivo ultrassecreto `projeto-doom.html`;
- protocolo de inicialização anterior ao acesso ao Projeto DOOM;
- puzzle com cinco fragmentos escondidos na Home, em Personagens, nos dossiês de Mick e Mei e no relatório de Ameaça;
- credencial final organizada como origem, amostra, integridade, Dia Zero e risco;
- armazenamento local do progresso e da autorização do usuário;
- tela de laboratório bloqueado com retorno aos arquivos públicos;
- mapa interativo do laboratório com seis setores e terminal de inspeção;
- áreas preparadas para futuros experimentos, documentos, gravações e registros secretos;
- correção da tela da credencial para mostrar os fragmentos recuperados em vez de losangos genéricos;
- novos arquivos compartilhados `doom-puzzle.css` e `doom-puzzle.js`.

Com esta sincronização, o resumo do projeto e o repositório GitHub voltam a representar o mesmo estado do site.

## Próximos passos possíveis

- Testar a posição do sangue em diferentes tamanhos de tela.
- Refinar o alinhamento da sombra “APOCALIPSEZ” em celulares.
- Testar visualmente as novas transições de poeira, recuperação e diretório em diferentes navegadores.
- Definir onde Mick e Mei estavam exatamente no Dia Zero.
- Criar imagens e arquivos secretos para os demais personagens.
- Criar efeitos exclusivos para Chris, Maya, Hanna, James, Stayci e Samuel.
- Revisar o tempo completo das animações de `index.html` e `home.html`.
- Fazer uma revisão final de desempenho, acessibilidade e responsividade.
