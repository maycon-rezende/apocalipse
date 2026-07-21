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
- `acesso-restrito.html`: portal protegido do material ainda em construção de Mei.
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

### Central de sinais recuperados

A antiga seção de dossiês prioritários foi substituída por uma área de comunicações de emergência, evitando repetir na Home os arquivos já disponíveis em Personagens.

O pronunciamento presidencial ganhou uma seção própria em formato de televisão de emergência, posicionada na abertura da Home imediatamente abaixo da frase “Era uma manhã como qualquer outra...”. Uma faixa vermelha pulsante de alerta máximo interrompe a programação e, ao ser acionada, revela uma mensagem extensa e humana à população, incluindo a decretação da lei marcial, instruções de isolamento e a orientação de não permitir a entrada de pessoas cuja segurança não possa ser confirmada. A transmissão termina abruptamente antes da conclusão.

O painel de recuperação DD-01 e o registro visual seguinte permanecem totalmente ocultos enquanto o comunicado não é aberto. Depois que o usuário aciona o alerta e chega ao final do pronunciamento, a recuperação do arquivo começa automaticamente; quem ignora a transmissão não recebe acesso ao restante da abertura investigativa.

Depois da recuperação, o DD-01 funciona como porta efetiva para o diretório. O comando “Abrir arquivo-mestre” executa autenticação, remoção da criptografia, descompactação e localização dos quatro setores. O diretório permanece oculto até o fim dessa sequência e então surge identificado como “Conteúdo recuperado do DD-01”.

O testemunho “Não escrevo mais datas...” deixou de aparecer imediatamente após a abertura presidencial. Ele agora encerra o conteúdo do arquivo-mestre, depois da Central de Sinais, funcionando como epílogo emocional antes da última transmissão e permanecendo oculto enquanto o DD-01 não for aberto.

O antigo quadro da Câmera 04 com uma silhueta humanoide foi substituído por uma câmera urbana da última manhã normal, ligada diretamente ao subtítulo da Home. A captura mostra trânsito, pedestres e o primeiro helicóptero observado por Mei. O segundo sobrevoo acontece cinco minutos depois e, em menos de dez minutos, ela contabiliza cinco aeronaves — nunca as cinco juntas. A linha do tempo foi ajustada para preservar essa continuidade.

A Central de Sinais permanece abaixo, com radar animado e duas transmissões expansíveis:

- canal interno incompleto da Casa Branca, encerrado com a localização do presidente não confirmada;
- frequência civil não identificada e interrompida.

Os registros apresentam frequência, procedência, integridade e estado de autenticação. Os textos permanecem deliberadamente fragmentados para ampliar o mistério sem confirmar acontecimentos ainda indefinidos na história.

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

A página de Ameaça é um relatório público de sobrevivência sobre os infectados, sem revelar o Projeto DOOM. Ela apresenta:

- progressão observada entre alteração inicial, ruptura, conversão e variações avançadas;
- padrões de campo como atração por estímulos, resposta imprevisível e formação de aglomerações;
- hipóteses sobre memória residual, adaptação e evoluções ainda não classificadas;
- separação interativa entre observações confirmadas, dados em análise e ocorrências não identificadas;
- aviso explícito de que a origem do fenômeno não foi determinada;
- remoção de toda referência pública à Antártida, amostra, cadeia de custódia, falha de contenção e designação DOOM;
- ausência de ligação direta para o arquivo ultrassecreto, preservando sua descoberta como parte do puzzle.

A atmosfera de `ameaca.html` foi aprofundada para acompanhar `themeameaca.mp3`. Névoa contaminada, sombras de infectados nas bordas, faixa de alerta, pulsos orgânicos e falhas breves no título tornam o relatório progressivamente mais inquietante. Um visor de proximidade reage à rolagem e aos cartões inspecionados, elevando o risco diante de padrões não identificados. Os registros ganham varredura e profundidade no hover, a cronologia reage à aproximação e um cursor de rastreamento informa dinamicamente o alcance da evidência observada. Movimentos intensos são desativados quando o sistema solicita animações reduzidas.

A entrada da página passou a usar uma intro obrigatória em tela cheia. `img-ameaca/zumbi.jpg` ocupa o fundo sob baixa luminosidade, névoa animada e alertas graduais de imagens sensíveis, sinal contaminado, movimento detectado e risco desconhecido. O visitante precisa acionar `ACESSAR RELATÓRIO DE AMEAÇA`; o clique abre a névoa, libera a rolagem e garante uma tentativa de reprodução de `themeameaca.mp3` dentro de uma interação autorizada pelo navegador.

Logo após o cabeçalho, a seção `Antes de Chamarem de Surto` reconstrói as 72 horas anteriores ao reconhecimento público da crise. Seis transmissões ficcionais registram desaparecimentos na Costa Oeste, suspeita de canibalismo na Europa Central, pacientes violentos no Leste Asiático, corpos desaparecidos na América do Sul, ataques familiares na Costa Leste e uma evacuação final em local não confirmado. A linguagem inicial usa termos como agressores, pacientes, droga sintética e falha documental, sem mencionar zumbis, explicar a origem ou expor o Projeto DOOM. Uma faixa de notícias, estados de retenção e reação do visor de proximidade reforçam a escalada. O painel identifica explicitamente o material como ficcional e mantém locais e datas exatas não recuperados.

`img-ameaca/zumbi.jpg` foi incorporada após a progressão observada como `EVENTO 04 // AGLOMERAÇÃO`. O registro fotográfico é tratado com baixa luminosidade, dessaturação, enquadramento técnico, varredura vermelha e metadados de cerco. A imagem ganha detalhes e movimento de paralaxe durante a inspeção; ao aproximar o cursor, o visor de risco muda para `CERCO IMINENTE` e o rastreador marca alcance crítico. A composição central da imagem recebe a mensagem de que o campo de visão foi comprometido segundos após a captura.

A página termina com o arquivo selado `img-ameaca/primeiraevidencia.avif`. Antes da imagem, o visitante encontra apenas a pergunta `O primeiro registro?` e a hipótese de que o arquivo seja anterior às primeiras transmissões oficiais, embora seus metadados tenham sido destruídos. O comando `RECUPERAR EVIDÊNCIA VISUAL` expande o encerramento e revela a imagem com baixa luminosidade, aproximação lenta, ruído e moldura cinematográfica. A legenda usa o próprio nome do arquivo — `PRIMEIRA EVIDÊNCIA` — acompanhada de autoria, local e momento desconhecidos. Durante a revelação, o visor muda para `REGISTRO ANTERIOR DETECTADO`; a imagem pode ser novamente ocultada pelo mesmo controle.

## Projeto DOOM — `projeto-doom.html`

O arquivo de nível 05 concentra com exclusividade as informações secretas sobre a origem do agente biológico. Ele apresenta:

- descoberta confirmada da amostra no gelo antártico;
- protocolo de acesso obrigatório com inicialização digitada, cinco fragmentos escondidos pelo site e credencial persistente do laboratório;
- mapa interativo do laboratório com Recepção, Observação, Criogenia, Testes, Contenção e Arquivo Central;
- terminal de inspeção que diferencia setores recuperados, registros ausentes e áreas ainda bloqueadas;
- cadeia de custódia expansível entre recuperação, expedição, transporte, pesquisa, ruptura e Dia Zero;
- documentos classificados e perguntas de continuidade ainda pendentes;
- campos preparados para receber fatos novos durante a reescrita, sem antecipar respostas;
- acesso protegido pelo protocolo do Projeto DOOM; o relatório público de Ameaça não conduz mais diretamente a este arquivo.

## Continuidade da família Bradock

- **Mei Bradock** é o único nome usado nos arquivos acessíveis; seu registro civil completo é um segredo conhecido apenas por Mick;
- da mesma forma, somente Mei conhece o nome completo de Mick, que permanece ausente dos arquivos;
- os filhos usam a herança materna e paterna nos nomes: **Chris Sato Bradock**, **Maya Sato Bradock** e **Hanna Sato Bradock**;
- Maya substitui o antigo nome Diana;
- Hanna substitui o antigo nome Emma.

Chris Sato Bradock recebeu um dossiê próprio em `personagem.html?id=chris`. Ele tem 17 anos, é o primogênito de Mick e Mei, mantém uma relação excelente com os pais e as irmãs Maya e Hanna e herdou do pai o impulso de proteger pessoas vulneráveis. No início do Dia D, começava seu primeiro ano na universidade, ainda sem profissão ou curso confirmados. Chris é músico amador, toca guitarra e usa a música como forma de expressão. Namora Suyang Lee, uma jovem coreana cuja casa foi projetada e construída por Mei. `img-chris/chris.png` é a identificação principal; guitarra, registro com Mick e retrato individual formam as três evidências públicas. O arquivo `evidencias.html?id=chris` possui agora sete registros: dois com Suyang, um com Mick e quatro novos fragmentos de sua rotina (`chris0.png` a `chris3.png`). A identidade visual exclusiva transforma o quarto de músico em um palco interativo: tons violetas, cordas de guitarra, equalizador, iluminação que acompanha o cursor, palheta reativa e notas que surgem nos cliques. Uma pedaleira visual oferece os modos `CLEAN`, `DRIVE` e `ECHO`; cada modo altera cores, vibração, intensidade, sombras e rastros da interface. Os efeitos mais fortes são removidos quando o visitante prefere movimentos reduzidos.

O arquivo restrito de Chris também recebeu uma atmosfera musical própria, tratada como uma sessão privada recuperada. Cordas de guitarra atravessam o cofre, um equalizador acompanha a interface e cada fotografia é apresentada como um `TAKE`. Ao passar sobre os registros surgem marcações de braço de guitarra e o comando `PLAY TRACK`; o cursor-palheta identifica dinamicamente o número da evidência. Clicar em uma imagem produz palhetada e notas visuais, enquanto o visualizador abre sob iluminação violeta de palco. As animações são reduzidas ou removidas conforme a preferência de acessibilidade.

Maya Sato Bradock recebeu um dossiê próprio em `personagem.html?id=maya`. Ela é a segunda filha de Mick e Mei, tem 15 anos e está próxima de completar 16, sendo dois anos mais nova que Chris. Maya é uma adolescente moderna, ligada às tendências e apaixonada por moda; usa roupas, cores e acessórios como expressão de identidade e independência. As fotografias também preservam sua rotina de livros, anotações e concentração. `img-maya/maya.png` é a identificação principal e `maya1.png`, `maya2.png` e `maya3.png` compõem as três evidências da página. Seis imagens familiares e sociais ficam em `evidencias.html?id=maya`, incluindo registros com Mei e amigos. A página principal funciona como um `lookbook` editorial: passarela ao fundo, faixa de coleção, molduras de revista, marcações `VIEW LOOK`, paleta interativa com os modos âmbar, rosa, azul e monocromático, além de um cursor de prova que identifica cada evidência como um look. Os efeitos respeitam a preferência por movimentos reduzidos.

O arquivo restrito de Maya funciona como um closet pessoal misturado a recortes de revista, amizades e lembranças familiares. A interface inclui fita métrica lateral, painel de referências, amostras de tecido, etiquetas coloridas e fotografias identificadas como `PRIVATE LOOK`. Ao inspecionar uma imagem, aparecem moldura editorial e o comando `OPEN EDIT`; o cursor em forma de alfinete identifica dinamicamente o número do registro. Abrir uma fotografia produz um flash e transforma o visualizador em uma página editorial iluminada. As animações são reduzidas quando solicitado pelo sistema.

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

No momento, Mick, Mei e James Hanson possuem arquivos secretos. Mick e Mei têm conjuntos fotográficos; Hanson já possui uma identificação principal, mas seu lote de evidências continua aguardando validação narrativa.

O Capitão James William Hanson recebeu um dossiê dinâmico próprio em `personagem.html?id=hanson`. A antiga patente de General foi corrigida para Capitão e Stayci Hanson foi substituída por Natasha Becker Hanson. O arquivo reúne biografia, perfil operacional, especializações, identificação física e os acontecimentos confirmados do início do Dia D. A identificação principal utiliza `img-hanson/home.png`. Quatro evidências cronológicas mostram o ingresso no Exército, treinamento de resistência, instrução tática e promoção a Capitão. A imagem `jh.png`, ambientada durante o colapso urbano, permanece reservada até seu contexto narrativo ser confirmado.

Natasha Evelyn Becker Hanson recebeu um dossiê próprio em `personagem.html?id=natasha`. A personagem foi definida como jornalista investigativa e virologista, com formação em Ciências Biomédicas por Harvard, pesquisa avançada em doenças infecciosas e Jornalismo Investigativo por Columbia. O arquivo preserva James William Hanson como nome canônico do marido e reúne sua investigação pré-Dia D sobre laboratórios privados, relatórios e pesquisadores desaparecidos. `img-nat/natstudy.png` é a capa; `img-nat/nat.png` e `img-nat/natstudy.png` aparecem como evidências. O tema exclusivo usa tons de biossegurança, varredura biológica e marcações de análise documental. A localização exata de Natasha na manhã do colapso permanece não confirmada.

As galerias Hanson foram ampliadas. James possui agora dez evidências, incluindo retratos militares, café, licença nas montanhas, encontro com antigos companheiros e operação urbana. Natasha possui nove evidências, combinando investigação, laboratório, rotina doméstica, jardim, lazer e registros civis. A foto do bar não é descrita como consumo de álcool, preservando a definição canônica de que James nunca bebe. O contador da home foi atualizado para 45 evidências catalogadas.

O tema exclusivo de Natasha foi aprofundado como uma interface de investigação biológica. Ele inclui cursor de amostragem com identificação dinâmica de evidências, varredura de biossegurança, moldura de fonte verificada, análise luminosa sobre documentos, pulsos celulares na cronologia e reações forenses nas fotografias e painéis. Os movimentos são desativados quando o sistema solicita redução de animações.

O tema de Natasha passou a unir biologia, natureza e jornalismo investigativo. A atmosfera inclui células flutuantes, folhas orgânicas, uma hélice de DNA discreta, fio de notícias confidenciais, credencial de imprensa, documentos tratados como notas de campo e mensagens alternadas entre a mesa de virologia e a redação. A intenção narrativa é apresentá-la como uma repórter científica corajosa, elegante e obstinada, com energia de grande jornalista investigativa sem reproduzir diretamente uma personagem existente.

O cofre de Natasha usa o “Protocolo Fonte Protegida”. Os arquivos `proibido.png`, `proibido1.png` e cinco novas fotografias únicas (`bhn.png` e `natasha1.png` a `natasha4.png`) aparecem como sete cartões censurados, sem carregar as imagens enquanto bloqueados. Ao clicar, o visitante deve reconstruir a credencial `FONTE → AMOSTRA → VERDADE`. A autorização fica registrada na sessão do navegador e revela os arquivos com animação de desclassificação. `nats.png` e `nbh.png` não são exibidos separadamente porque são cópias byte a byte de `natasha3.png` e `natasha4.png`. Somados aos seis registros comuns, o cofre de Natasha possui treze evidências.

O modelo de arquivos especiais foi aplicado à galeria de Mei com identidade arquitetônica. Onze imagens profissionais, urbanas e cotidianas permanecem visíveis. Nove registros pessoais das séries `mell` e `mellissa` foram movidos para um “Arquivo Estrutural Privado”, sem duplicação na galeria comum. O desbloqueio exige a sequência `PLANTA → ESTRUTURA → ABRIGO`, utiliza grade de projeto em azul técnico e salva a autorização apenas durante a sessão. `mel.png`, por ser um retrato urbano, permanece entre os arquivos comuns. O total de evidências de Mei continua em 20.

A evidência `EVID. 002`, identificada originalmente como `LOTE DD-MEI // ARQ_002` (`img-mei/mei0.png`), foi incorporada ao Arquivo Estrutural Privado. As evidências `EVID. 003` e `EVID. 004` permanecem visíveis normalmente. A galeria usa uma sequência unificada de registros públicos e privados, mantendo posição e numeração originais. Mei possui dez arquivos especiais dentro das mesmas 20 evidências.

Novas trilhas foram associadas às páginas conforme seus nomes. `themehanson.mp3` toca no dossiê de James, `thememei.mp3` no de Mei, `themenat.mp3` no de Natasha e `thememick.mp3` no de Mick. `themeameaca.mp3` voltou a acompanhar `ameaca.html`, em loop, enquanto `themelab.mp3` permanece ligado à antecâmara do Projeto DOOM. Todas as trilhas usam repetição contínua, tentativa de reprodução automática e nova tentativa no primeiro clique ou tecla quando o navegador bloqueia autoplay.

O Projeto DOOM deixou de reutilizar uma autorização permanente salva no navegador. A chave legada `dd_doom_lab_access_v1` é removida, e toda nova entrada em `projeto-doom.html` passa obrigatoriamente pelo protocolo de inicialização e pela reconstrução da credencial. Os cinco fragmentos encontrados continuam armazenados para preservar o progresso da investigação; somente o passe direto para o laboratório foi eliminado.

O interior do Projeto DOOM foi temporariamente selado até que sua parte central seja escrita. Mesmo com todos os fragmentos e a credencial correta, o visitante não entra no mapa do laboratório. Em seu lugar, surge uma antecâmara informando “Instalação incompleta”, com câmara de contenção vazia, tubos de amostra, setores em construção, arquivo biológico não recuperado e contenção selada. A tela confirma que a credencial é autêntica, preserva o valor do puzzle e oferece retorno à Home ou ao relatório de Ameaça. A estrutura interna permanece no código para desenvolvimento futuro, mas não é revelada ao público.

O cofre de evidências de Mick (`evidencias.html?id=mick`) recebeu uma atmosfera exclusiva do FBI. A mesma `thememick.mp3` do dossiê toca em loop na galeria. O visual inclui grade de vigilância, varredura verde, terminal de rede do FBI, marcações de alvo sobre as fotografias, reação das evidências ao passar o mouse e cursor tático que identifica dinamicamente o número do registro observado.

O cofre de Mei (`evidencias.html?id=mei`) também recebeu uma atmosfera exclusiva. `thememei.mp3` acompanha a galeria em loop. Linhas móveis de projeto atravessam a tela, as evidências são tratadas como pranchas em escala 1:50, a grade técnica aparece sobre os cartões, o enquadramento reage à inspeção e um cursor de medição exibe coordenadas em tempo real. O estilo azul de arquitetura também permanece nos arquivos privados e no protocolo estrutural.

Os cartões de James e Natasha na página `personagens.html` agora exibem retratos no mesmo padrão dos cartões em destaque de Mick e Mei. James usa `img-hanson/home.png` com identificação `SUBJECT_06 // U.S. ARMY`; Natasha usa `img-nat/natstudy.png` com identificação `SUBJECT_07 // BIOINT`. As mesmas imagens também alimentam o retrato do modal de ficha completa.

Posteriormente, a grade de personagens foi uniformizada: Mick, Mei, James e Natasha deixaram de exibir fotografias diretamente nos cards. Todos os blocos agora mantêm o mesmo formato textual, e os retratos são revelados somente no modal ao clicar no card. Os atributos `data-image` continuam vinculando cada personagem à sua imagem. Os botões de arquivo secreto navegam diretamente para os dossiês sem abrir o modal por baixo.

As galerias de James e Natasha foram divididas entre dossiê público e cofre confidencial. Cada página principal exibe somente três imagens: James mantém ingresso, treinamento e promoção; Natasha mantém pesquisa documental, mural investigativo e laboratório. O restante está em `evidencias.html?id=hanson` (sete arquivos) e `evidencias.html?id=natasha` (seis arquivos), acessível pelo bloco de acesso restrito ao fim de cada dossiê. O cofre preserva temas visuais próprios para os arquivos militar e biológico. O total geral de 45 evidências não foi alterado.

### Publicação no GitHub — 19/07/2026

Esta atualização foi publicada com sucesso na branch `main` do repositório `maycon-rezende/apocalipse`. O envio foi concluído no commit `df56ddb` (`Atualiza dossies de James e Natasha`), avançando o repositório remoto de `abc1634` para `df56ddb`. Após o `push`, a branch local `main` e `origin/main` foram verificadas e estavam sincronizadas.

O pacote publicado inclui os dossiês completos de James e Natasha, seus efeitos exclusivos, cartões com retratos, novas imagens, separação das galerias públicas e confidenciais, atualização dos contadores da home e revisão deste resumo de continuidade.

### Segunda publicação no GitHub — 19/07/2026

As atualizações posteriores desta sessão também foram publicadas com sucesso na branch `main` do repositório `maycon-rezende/apocalipse`. O commit `3d5882e` (`Expande galerias e protocolos do projeto`) avançou o repositório remoto de `df56ddb` para `3d5882e`. Depois do envio, `main` e `origin/main` foram verificadas e estavam sincronizadas.

Esse pacote publicado reúne:

- uniformização dos cards de personagens, deixando os retratos para o modal de ficha rápida;
- protocolos privados e independentes para Natasha e Mei;
- bloqueio `FONTE → AMOSTRA → VERDADE` no arquivo protegido de Natasha;
- bloqueio `PLANTA → ESTRUTURA → ABRIGO` no Arquivo Estrutural Privado de Mei;
- preservação da numeração original dos registros públicos e privados da galeria de Mei;
- inclusão das imagens `proibido` da Natasha e de novos ativos ainda reservados;
- efeitos exclusivos do FBI no cofre de Mick e efeitos arquitetônicos no cofre de Mei;
- novas trilhas para James, Natasha, Mei, Ameaça e laboratório;
- remoção do passe permanente do Projeto DOOM;
- exigência da credencial em toda entrada no projeto;
- bloqueio narrativo do interior do laboratório por meio da tela “Instalação incompleta”;
- atualização do total geral para 47 evidências catalogadas;
- preservação inicial das imagens de Chris em `img-chris/` para desenvolvimento futuro.

Os novos arquivos de áudio publicados foram `themeameaca.mp3`, `themehanson.mp3`, `themelab.mp3`, `thememei.mp3` e `themenat.mp3`. Os ativos `img-nat/ensaio.png`, `img-nat/meifantasia.png`, `img-nat/proibido0.png`, `img-nat/proibido2.png`, `img-chris/chris.png` e `img-chris/chrisguitar.png` foram enviados como material reservado e ainda não possuem exibição definitiva no site.

O tema exclusivo de Hanson representa uma central de comando tático: grade militar verde-oliva, varredura horizontal, rede de comando ativa, marcações angulares na identificação, pulsos de ordem na linha do tempo, leitura operacional nos painéis e cursor quadrado de seleção com direção em graus. Ao interagir, o cursor expande sobre alvos de comando e responde ao clique como emissão de uma ordem.

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

### Mei Bradock

Por ser arquiteta, o arquivo de Mei possui:

- grade técnica semelhante a uma planta arquitetônica;
- linhas horizontais e verticais de medição;
- detalhes em azul técnico.
- cursor exclusivo de desenho técnico;
- coordenadas X/Y acompanhando o movimento do mouse;
- marcações de enquadramento e escala `1:50`;
- linhas de cotagem animadas nos documentos;
- reação visual técnica sobre as evidências.

O dossiê também registra seu background: nascimento em Kyoto, educação bilíngue, influência profissional de Daniel Collins e Aiko Sato Collins, perda dos pais aos 12 e 15 anos, mudança para Seattle, convivência com William e Margaret Collins, amizade e namoro com Mick, formação em Arquitetura e fundação do Bradock Atelier aos 28 anos. Na interface ela aparece somente como **Mei Bradock**; seu nome civil não é exibido nem mesmo no campo confidencial e permanece conhecido apenas por Mick.

O sistema já aplica os temas automaticamente conforme o parâmetro `id` da URL.

## Evidências encontradas

Os arquivos individuais possuem um segundo nível de material em `evidencias.html`:

- Mick possui seis registros fotográficos disponíveis;
- Mei possui vinte registros catalogados;
- Hanson possui quatro registros cronológicos disponíveis no dossiê principal;
- cada item recebe número de evidência e código de lote;
- as imagens preservam sua proporção original;
- os registros aparecem conforme a rolagem;
- clicar em uma fotografia abre a evidência em tela cheia;
- o botão de retorno leva ao dossiê correto.

No arquivo de Mei, a terceira evidência preliminar exibida em `personagem.html` usa atualmente `img-mei/meicaseira.png`.

## Acesso restrito de Mei

Enquanto as fotografias de Mei ainda estão sendo preparadas:

- o acesso visível foi substituído por um símbolo arquitetônico discreto `⌖`;
- o símbolo abre `acesso-restrito.html`;
- a tela apresenta o setor como “obra em andamento” e “área interditada”;
- uma credencial é solicitada antes da abertura do cofre;
- a senha é comparada por hash e não aparece em texto aberto no código;
- uma tentativa incorreta exibe “Acesso negado”;
- a autorização é mantida apenas durante a sessão do navegador;
- abrir diretamente as evidências de Mei sem autorização redireciona para o portal restrito.

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

- correção de continuidade: Elisabeth passa definitivamente a ser Mei Bradock;
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

### Publicação no GitHub — 20 de julho de 2026

As atualizações recentes do site foram publicadas com sucesso na branch `main` do repositório `maycon-rezende/apocalipse`. O envio avançou o repositório de `3d5882e` para o commit `f625342` (`Expande ameacas e dossies da familia Bradock`). O commit reuniu 49 arquivos, com 310 inserções e 82 remoções.

A publicação incluiu:

- reconstrução pública de `ameaca.html` como relatório sobre comportamento e evolução dos infectados, sem revelar a origem ou o Projeto DOOM;
- transferência da origem antártica, amostra, contenção e cadeia de custódia para o arquivo secreto do projeto;
- intro de perigo em tela cheia, trilha `themeameaca.mp3`, névoa, silhuetas, visor de proximidade e cursor de rastreamento;
- painel ficcional de notícias das 72 horas anteriores ao reconhecimento do surto;
- incorporação de `img-ameaca/zumbi.jpg` como evento de aglomeração e `primeiraevidencia.avif` como encerramento selado;
- criação e aprofundamento dos dossiês de Chris Sato Bradock e Maya Sato Bradock;
- atualização dos nomes de Chris, Maya e Hanna com o sobrenome materno `Sato`;
- preservação de Mei apenas como `Mei Bradock`, mantendo os nomes civis completos dela e de Mick fora dos arquivos acessíveis;
- identidade musical de Chris com cordas, equalizador, palheta, pedaleira `CLEAN / DRIVE / ECHO` e cofre em formato de sessão privada;
- identidade de moda de Maya com lookbook, passarela, paletas editoriais e cofre em formato de closet pessoal;
- ampliação das galerias de Chris e Maya com registros pessoais, familiares e sociais;
- ampliação do protocolo censurado de Natasha, mantendo as novas imagens protegidas até a credencial correta;
- manutenção do interior do Projeto DOOM selado e da credencial obrigatória a cada nova entrada;
- inclusão das novas imagens reservadas nas pastas de Chris, Maya, Natasha, Hanson e Ameaças.

Após o `push`, `HEAD` e `origin/main` foram conferidos e apontavam para o mesmo hash completo: `f62534237e85f994b65d4270f030f5dd7f1ed37a`. A árvore de trabalho estava limpa imediatamente após a publicação. Esta anotação foi acrescentada localmente depois dessa conferência e será incluída no próximo envio ao GitHub.

### Cofre militar de James Hanson — 21 de julho de 2026

A galeria confidencial de James em `evidencias.html?id=hanson` recebeu uma identidade militar completa. O cofre agora funciona como um arquivo de inteligência visual do Exército: grade cartográfica, orientação em graus, varredura tática, marcações de alvo, identificação operacional dos registros, paleta verde-oliva e cursor de comando que reconhece cada evidência. A trilha `themehanson.mp3` também acompanha essa área.

As fotografias são desclassificadas gradualmente quando entram no campo de visão. Cada registro começa escuro, dessaturado e encoberto, sendo revelado lentamente por uma linha de varredura; os cartões entram em sequência, com atrasos progressivos, em vez de surgirem todos ao mesmo tempo. A ampliação preserva a mesma linguagem de reconhecimento militar.

### Cofre eco-investigativo de Natasha — 21 de julho de 2026

A galeria restrita de Natasha em `evidencias.html?id=natasha` ganhou uma atmosfera exclusiva que combina jornalismo investigativo, inteligência biológica e natureza. O ambiente possui rede de fontes, células orgânicas, partículas flutuantes, linhas de pauta, varredura de análise, identificação `SOURCE MATERIAL // N.B.H.`, cursor em forma de lente investigativa e a trilha `themenat.mp3`. Os cartões reagem como materiais sendo verificados e o lightbox revela as fotografias como registros em desenvolvimento.

Quatro novas imagens foram incorporadas ao conteúdo protegido: `hansinatasha.png`, `hanson.png`, `onça.png` e `proibido3.png`. Seguindo a regra definida para os novos registros de Natasha, todas permanecem censuradas até a credencial `FONTE → AMOSTRA → VERDADE`. O cofre passa a reunir 17 evidências, sendo seis registros visíveis e onze fontes protegidas.

### Ampliação dos cofres de James e da família Bradock — 21 de julho de 2026

As galerias restritas foram atualizadas com os arquivos recentes das respectivas pastas. James recebeu `cjh.jpg`, elevando seu cofre militar para oito registros. Mick recebeu `mickpraia.png`, totalizando sete evidências no arquivo do FBI. Chris passou de sete para doze registros com novas fotografias ligadas a Suyang e à rotina universitária. Maya passou de seis para dezoito registros, reunindo novas imagens de amizade, escola, irmãos, música e vida social no seu closet pessoal. As fotografias principais dos dossiês continuam separadas para evitar repetição direta entre a página pública e o cofre.

O cofre arquitetônico de Mei também foi ampliado de 20 para 24 registros. As novas imagens `mei4.png`, `bradock.png`, `bradockmei.png` e `meibradocl.png` foram classificadas como registros comuns por mostrarem trabalho, estudo e identidade familiar sem expor o nome civil secreto. O conjunto associado a `mell/mellissa` e o registro `mei0` continuam protegidos pela credencial `PLANTA → ESTRUTURA → ABRIGO`.

### Publicação no GitHub — 21 de julho de 2026

As ampliações e identidades visuais das galerias privadas foram publicadas com sucesso na branch `main` do repositório `maycon-rezende/apocalipse`. O commit `b6ef02c` (`Amplia galerias privadas dos personagens`) avançou o repositório remoto de `f625342` para `b6ef02c`.

O pacote publicado contém a reformulação militar do cofre de James, a correção da revelação gradual das fotografias, o novo cofre eco-investigativo de Natasha, a trilha exclusiva dela, quatro fontes protegidas adicionais e a ampliação dos arquivos de Mick, Chris, Maya e Mei. Foram enviados 16 arquivos, com 82 inserções, nove remoções e 14 novas imagens incorporadas às galerias.

Após o `push`, `HEAD` e `origin/main` foram conferidos e apontavam para o mesmo hash completo: `b6ef02c3e373c74166f8063dab0aaa4489438a47`. Esta anotação foi acrescentada ao resumo local depois da publicação e será incluída no próximo envio ao GitHub.

### Autorização individual das fontes de Natasha — 21 de julho de 2026

O protocolo das fotografias proibidas de Natasha deixou de autorizar o conjunto inteiro. Cada execução correta de `FONTE → AMOSTRA → VERDADE` libera somente a evidência que originou o puzzle; todas as outras permanecem censuradas e exigem suas próprias verificações. A antiga autorização global foi substituída por uma lista individual de registros autorizados na sessão.

A primeira autorização ainda mantém a fotografia fortemente desfocada e identificada como `FONTE PARCIAL`. A revelação integral depende da consulta aos quatro setores recuperados da home — História, Personagens, Ameaças e Galeria — aproveitando o sistema de exploração que o projeto já registrava. O lightbox preserva o blur e informa claramente o requisito enquanto a investigação estiver incompleta.

### Trilhas exclusivas de Chris e Maya — 21 de julho de 2026

Chris e Maya receberam trilhas próprias no mesmo sistema musical dos demais personagens. `audio/themechris.mp3` toca em loop no dossiê e no cofre musical de Chris; `audio/thememaya.mp3` acompanha o dossiê e o closet restrito de Maya. As páginas tentam iniciar a reprodução automaticamente e repetem a tentativa na primeira interação ou tecla caso o navegador bloqueie o autoplay.

### Autorização individual dos projetos de Mei — 21 de julho de 2026

O conjunto privado de Mei passou a seguir a mesma progressão individual criada para Natasha. O portal de entrada do cofre continua obrigatório, mas cada fotografia privada exige separadamente a sequência `PLANTA → ESTRUTURA → ABRIGO`; concluir um puzzle não libera os demais projetos.

O primeiro nível mostra somente uma versão fortemente desfocada, marcada como `PROJETO PARCIAL`. O cartão e o lightbox usam linguagem arquitetônica azul própria, com o aviso `PLANTA INCOMPLETA`. A imagem integral é revelada apenas após a consulta aos quatro setores recuperados da home. A autorização global antiga de Mei foi substituída por uma lista individual de projetos liberados durante a sessão.

### Reclassificação visual de Mei — 21 de julho de 2026

O card de Mei em `personagens.html` e o dossiê em `personagem.html?id=mei` passaram a usar somente retratos profissionais ligados à arquitetura e ao Bradock Atelier. O card utiliza `arquiteta2.png`; o dossiê usa a mesma imagem como capa e mantém `arquiteta1.png`, `arquiteta3.png` e `arquitetamei.png` como evidências públicas.

Os registros com shorts curtos, roupas íntimas, saias curtas ou decotes acentuados foram transferidos para o modo proibido do cofre. A galeria de Mei agora possui 29 registros: quatro projetos profissionais visíveis e 25 imagens privadas, cada uma sujeita ao desbloqueio individual, ao blur parcial e à exploração dos quatro setores. A chave individual foi atualizada para `dd_mei_private_items_v3` para impedir que autorizações antigas apontem para fotografias diferentes após a reorganização.

## Próximos passos possíveis

- Testar a posição do sangue em diferentes tamanhos de tela.
- Refinar o alinhamento da sombra “APOCALIPSEZ” em celulares.
- Testar visualmente as novas transições de poeira, recuperação e diretório em diferentes navegadores.
- Definir onde Mick e Mei estavam exatamente no Dia Zero.
- Criar imagens e arquivos secretos para os demais personagens.
- Criar o dossiê e os efeitos exclusivos de Hanna; revisar os personagens secundários ainda sem página própria.
- Revisar o tempo completo das animações de `index.html` e `home.html`.
- Fazer uma revisão final de desempenho, acessibilidade e responsividade.
