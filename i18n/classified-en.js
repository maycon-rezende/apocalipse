(function () {
  'use strict';
  window.DD_I18N_DICTIONARIES = window.DD_I18N_DICTIONARIES || {};
  const source = window.DD_I18N_DICTIONARIES['pt-BR'] || {};
  const catalog = window.DD_I18N_DICTIONARIES.en = window.DD_I18N_DICTIONARIES.en || {};
  const classified = {};
  Object.keys(source).forEach(function (key) {
    if (key.indexOf('classified.') === 0) classified[key] = source[key];
  });
  Object.assign(classified, {
    'classified.access.meta.title': 'RESTRICTED ACCESS // WORK IN PROGRESS',
    'classified.access.back': '← Return to dossier',
    'classified.access.status': 'Incomplete archive',
    'classified.access.title': 'Restricted access',
    'classified.access.subtitle': 'Project Mei // work in progress',
    'classified.access.notice': 'This sector is still under construction. Blueprints, records, and evidence remain isolated until the archive is complete.',
    'classified.access.closed': 'Restricted area',
    'classified.access.code': 'Authorization code',
    'classified.access.validate': 'Validate credentials',
    'classified.access.accepted': 'Credentials accepted // releasing archive...',
    'classified.access.denied': 'Access denied // invalid credentials',

    'classified.doom.meta.title': 'PROJECT DOOM // TOP SECRET',
    'classified.doom.meta.description': 'Top-secret Project DOOM archive, covering its Antarctic sample and the sectors that remain classified.',
    'classified.doom.intro.label': 'Project DOOM access protocol',
    'classified.doom.close': '← Close archive',
    'classified.doom.clearance': 'Clearance level 05 // top secret',
    'classified.doom.project': 'PROJECT',
    'classified.doom.hero.lead': 'Custody file for the Antarctic sample.',
    'classified.doom.hero.copy': 'This document records only confirmed information and investigative gaps. Any detail not yet established in the story remains classified.',
    'classified.doom.file': 'FILE',
    'classified.doom.origin': 'ORIGIN',
    'classified.doom.antarctica': 'ANTARCTICA',
    'classified.doom.integrity': 'INTEGRITY',
    'classified.doom.risk': 'RISK',
    'classified.doom.omega': 'OMEGA',
    'classified.doom.lab.kicker': 'Recovered facility // internal access',
    'classified.doom.lab.title': 'Laboratory map',
    'classified.doom.lab.label': 'Project DOOM laboratory sectors',
    'classified.doom.sector.01': 'SECTOR 01',
    'classified.doom.sector.02': 'SECTOR 02',
    'classified.doom.sector.03': 'SECTOR 03',
    'classified.doom.sector.04': 'SECTOR 04',
    'classified.doom.sector.05': 'SECTOR 05',
    'classified.doom.sector.06': 'SECTOR 06',
    'classified.doom.sector.reception': 'Reception',
    'classified.doom.sector.observation': 'Observation',
    'classified.doom.sector.cryo': 'Cryogenics',
    'classified.doom.sector.tests': 'Testing',
    'classified.doom.sector.containment': 'Containment',
    'classified.doom.sector.archive': 'Central archive',
    'classified.doom.sector.open': 'ACCESS GRANTED',
    'classified.doom.sector.read': 'READ-ONLY ACCESS',
    'classified.doom.sector.sample': 'SAMPLE LOGGED',
    'classified.doom.sector.corrupt': 'DATA CORRUPTED',
    'classified.doom.sector.lockdown': 'EMERGENCY LOCKDOWN',
    'classified.doom.sector.recovered': '31% RECOVERED',
    'classified.doom.system.online': 'SYSTEM ONLINE',
    'classified.doom.console.label': 'SECTOR 01 // AUTHORIZED',
    'classified.doom.console.title': 'Technical reception',
    'classified.doom.console.description': 'Facility entry point. The terminal recognized the reconstructed credentials and granted access to the partially recovered sectors.',
    'classified.doom.state': 'STATUS',
    'classified.doom.operational': 'OPERATIONAL',
    'classified.doom.access': 'ACCESS',
    'classified.doom.level05': 'LEVEL 05',
    'classified.doom.alert': 'ALERT',
    'classified.doom.noSignal': 'NO SIGNAL',
    'classified.doom.console.prompt': 'Select a sector to inspect its records.',
    'classified.doom.chain.kicker': 'Chain of custody',
    'classified.doom.chain.title': 'From the ice to Day Zero',
    'classified.doom.chain.00.time': 'MILESTONE 00 // CONFIRMED',
    'classified.doom.chain.00.title': 'Recovery',
    'classified.doom.chain.00.copy': 'An unknown viral element is found preserved in Antarctic ice and designated DOOM.',
    'classified.doom.chain.01.time': 'MILESTONE 01 // CLASSIFIED',
    'classified.doom.chain.01.title': 'Expedition',
    'classified.doom.chain.01.copy': 'Coordinates and extraction method await narrative confirmation.',
    'classified.doom.chain.02.time': 'MILESTONE 02 // FILE MISSING',
    'classified.doom.chain.02.title': 'Transport',
    'classified.doom.chain.02.copy': 'The sample destination, route, and personnel have not yet been established.',
    'classified.doom.chain.03.time': 'MILESTONE 03 // CLASSIFIED',
    'classified.doom.chain.03.title': 'Research',
    'classified.doom.chain.03.copy': 'Tests, facilities, and institutional ties remain restricted.',
    'classified.doom.chain.04.time': 'MILESTONE 04 // RECORD CORRUPTED',
    'classified.doom.chain.04.title': 'Breach',
    'classified.doom.chain.04.copy': 'The link between the project and the start of the outbreak will be established as the story is rewritten.',
    'classified.doom.chain.day.time': 'DAY ZERO // CONSEQUENCE',
    'classified.doom.chain.day.copy': 'The day when chaos reaches its peak completes the meaning of DOOMSDAY.',
    'classified.doom.docs.kicker': 'Recovered documents',
    'classified.doom.docs.title': 'Project attachments',
    'classified.doom.sample.title': 'Sample record',
    'classified.doom.sample.copy': 'Provisional scientific classification. Its frozen origin is confirmed; behavior and transmission remain unknown.',
    'classified.doom.designation': 'DESIGNATION',
    'classified.doom.type': 'TYPE',
    'classified.doom.viral': 'VIRAL ELEMENT',
    'classified.doom.age': 'AGE',
    'classified.doom.undetermined': 'UNDETERMINED',
    'classified.doom.incompleteRecord': 'INCOMPLETE RECORD',
    'classified.doom.confidential': 'CONFIDENTIAL',
    'classified.doom.continuity.title': 'Continuity note',
    'classified.doom.continuity.copy': 'Questions reserved for the development of the story:',
    'classified.doom.whoFound': 'WHO FOUND IT?',
    'classified.doom.where': 'WHERE DID IT GO?',
    'classified.doom.whoAuthorized': 'WHO AUTHORIZED IT?',
    'classified.doom.howEscaped': 'HOW DID IT ESCAPE?',
    'classified.doom.pending': 'PENDING',
    'classified.doom.doNotPublish': 'DO NOT PUBLISH',
    'classified.doom.note': 'This file was created as an expandable narrative framework. New facts should be added only after they are confirmed in the rewritten story.',
    'classified.doom.footer': 'DoomsDay // Project DOOM // top-secret document',
    'classified.doom.boot.0': 'INITIALIZING ACCESS PROTOCOL...',
    'classified.doom.boot.1': 'CONNECTING TO BLACK VAULT SERVER...',
    'classified.doom.boot.2': 'FILE LOCATED: ANT-DOOM-00',
    'classified.doom.boot.3': 'CLEARANCE LEVEL: 05 // TOP SECRET',
    'classified.doom.boot.4': 'FILE INTEGRITY: 31%',
    'classified.doom.boot.5': 'VALIDATING CREDENTIALS...',
    'classified.doom.boot.6': '> LABORATORY AWAITING AUTHORIZATION',
    'classified.doom.verify': 'VERIFY CREDENTIALS',
    'classified.doom.gate.title': 'LABORATORY LOCKED',
    'classified.doom.gate.copy': 'Five signatures were scattered throughout the public archives. Recover the fragments and reconstruct the credentials in the correct order.',
    'classified.doom.gate.found': '{total} of 5 fragments found',
    'classified.doom.gate.signature': 'Signature {index}',
    'classified.doom.gate.order': 'ORDER: ORIGIN // SAMPLE // INTEGRITY // DAY // RISK',
    'classified.doom.gate.label': 'Laboratory credentials',
    'classified.doom.gate.placeholder': 'COMBINE THE RECOVERED FRAGMENTS',
    'classified.doom.gate.authorize': 'AUTHORIZE',
    'classified.doom.gate.progress': 'SIGNATURES RECOVERED: {total}/5',
    'classified.doom.gate.all': 'ALL SIGNATURES RECOVERED // COMBINE THE CODES ABOVE',
    'classified.doom.gate.back': '← RETURN TO ARCHIVES',
    'classified.doom.gate.missing': 'ACCESS DENIED // LOCATE ALL SIGNATURES',
    'classified.doom.gate.invalid': 'INVALID CREDENTIALS // FRAGMENTS IN WRONG ORDER',
    'classified.doom.gate.accepted': 'CREDENTIALS ACCEPTED // LABORATORY UNLOCKED',
    'classified.doom.facility.suspended': 'ACCESS SUSPENDED',
    'classified.doom.facility.title': 'Facility incomplete',
    'classified.doom.facility.copy': 'The credentials are authentic. However, reconstruction of this sector is not yet complete. Scientific files, containment records, and the chain of events remain unavailable.',
    'classified.doom.facility.tests': 'TESTING SECTOR',
    'classified.doom.facility.building': 'UNDER CONSTRUCTION',
    'classified.doom.facility.bio': 'BIOLOGICAL ARCHIVE',
    'classified.doom.facility.notRecovered': 'NOT RECOVERED',
    'classified.doom.facility.sealed': 'SEALED',
    'classified.doom.facility.threat': 'VIEW THREAT REPORT',
    'classified.doom.facility.chamber': 'CHAMBER 00 // EMPTY',
    'classified.doom.facility.samples': 'SAMPLES // PENDING',
    'classified.doom.facility.blueprint': 'BLUEPRINT // SUBLEVEL ANT-00',

    'classified.threat.meta.title': 'THREAT // DD_ARCHIVE',
    'classified.threat.meta.description': 'An investigative archive covering the signs that preceded D-Day, correlated cases, and observed patterns among the infected.',
    'classified.threat.intro.code': 'RISK PROTOCOL // FIELD ARCHIVE',
    'classified.threat.intro.title': 'Danger',
    'classified.threat.intro.copy': 'The following material contains records of extreme violence, disappearances, and unidentified human behavior. Do not proceed without an escape route.',
    'classified.threat.intro.label': 'Archive warnings',
    'classified.threat.intro.sensitive': 'DISTURBING IMAGES',
    'classified.threat.intro.contaminated': 'SIGNAL CONTAMINATED',
    'classified.threat.movement': 'MOVEMENT DETECTED',
    'classified.threat.unknownRisk': 'UNKNOWN RISK',
    'classified.threat.intro.enter': 'Access threat report →',
    'classified.threat.vhs.source': 'VHS-C // COPY 04 // UNKNOWN AUTHOR',
    'classified.threat.tracking.label': 'Tape tracking controls',
    'classified.threat.tracking.down': 'Reduce tracking',
    'classified.threat.tracking.up': 'Increase tracking',
    'classified.threat.tracking.clean': 'CLEAN SIGNAL',
    'classified.threat.tracking.unstable': 'UNSTABLE',
    'classified.threat.tracking.damaged': 'DAMAGED',
    'classified.threat.tracking.unsynced': 'OUT OF SYNC',
    'classified.threat.tracking.stabilized': 'FRAME STABILIZED // INCOMPLETE SIGNATURE: N._.H.',
    'classified.threat.proximity': 'PROXIMITY // FIELD',
    'classified.threat.signal.unstable': 'UNSTABLE SIGNAL',
    'classified.threat.back': '← Back to Archive',
    'classified.threat.hero.kicker': 'Field report // data gathered after the collapse',
    'classified.threat.hero.title': 'INFECTED',
    'classified.threat.hero.designation': 'EVOLUTION PATTERNS',
    'classified.threat.hero.copyA': 'This archive contains only what survivors and response teams managed to',
    'classified.threat.hero.strong': 'observe in the field',
    'classified.threat.hero.copyB': '. The origin of the phenomenon remains unknown. Do not mistake recurring patterns for absolute rules: every encounter may present new variations.',
    'classified.threat.classification': 'CLASSIFICATION',
    'classified.threat.hostile': 'HOSTILE',
    'classified.threat.origin': 'ORIGIN',
    'classified.threat.undetermined': 'UNDETERMINED',
    'classified.threat.response': 'RESPONSE',
    'classified.threat.variable': 'VARIABLE',
    'classified.threat.protocol': 'PROTOCOL',
    'classified.threat.avoid': 'AVOID CONTACT',
    'classified.threat.hub.session': 'ANALYSIS SESSION // LOCAL ARCHIVE',
    'classified.threat.hub.title': 'Investigation Center',
    'classified.threat.hub.copy': 'Every discovery on this page is correlated here and preserved in this browser.',
    'classified.threat.recovered': 'RECOVERED',
    'classified.threat.hub.cases.line': 'LINE 01 // INCIDENTS',
    'classified.threat.hub.cases': 'Correlated cases',
    'classified.threat.hub.cases.open': 'OPEN INVESTIGATION BOARD →',
    'classified.threat.hub.forum.line': 'LINE 02 // UNDERGROUND NETWORK',
    'classified.threat.hub.forum': 'DEADWIRE leads',
    'classified.threat.hub.forum.open': 'ACCESS RECOVERED FORUM →',
    'classified.threat.hub.tapes.line': 'LINE 03 // ANALOG MEDIA',
    'classified.threat.hub.tapes': 'Reconstructed tapes',
    'classified.threat.hub.tapes.open': 'INSPECT TAPES →',
    'classified.threat.hub.evidence.line': 'LINE 04 // VISUAL RECORD',
    'classified.threat.firstEvidence': 'First Evidence',
    'classified.threat.blocked': 'LOCKED',
    'classified.threat.hub.evidence.open': 'LOCATE FINAL FILE →',
    'classified.threat.hub.archivist': 'ARCHIVIST OF RECORD',
    'classified.threat.hub.identity.none': 'IDENTITY NOT RECOVERED',
    'classified.threat.hub.resume': 'PREVIOUS SESSION LOCATED // PROGRESS RESTORED SUCCESSFULLY',
    'classified.threat.hub.locked': 'DOSSIER 00 // ACCESS LOCKED — COMPLETE ALL LINES',
    'classified.threat.hub.available': 'DOSSIER 00 // ACCESS AVAILABLE — OPEN FILE',
    'classified.threat.hub.dossier.title': 'The cases did not begin on D-Day',
    'classified.threat.hub.dossier.p1': 'Someone had been tracking the phenomenon for months before the collapse. Bodies, samples, and witnesses were removed through a chain that already knew where to look.',
    'classified.threat.hub.dossier.p2': 'Someone else preserved the evidence before each file disappeared. Their identity is still unconfirmed—but the same initials keep appearing:',
    'classified.threat.news.kicker': 'Transmissions predating official recognition of the outbreak',
    'classified.threat.news.title': 'Before They Called It an Outbreak',
    'classified.threat.news.copy': 'The first signs arrived as isolated news reports. Disappearances, attacks, and medical emergencies seemed unrelated. By the time authorities began comparing records, the channels were already going dark.',
    'classified.threat.news.ticker': 'BREAKING // AUTHORITIES DENY CONNECTION BETWEEN CASES // VIDEOS REMOVED FROM SOCIAL MEDIA // HOSPITALS SUSPEND VISITS // EMERGENCY LINES OVERLOADED //',
    'classified.threat.investigation.kicker': 'Private archive // authorship removed',
    'classified.threat.investigation.title': 'Cases That Should Not Connect',
    'classified.threat.investigation.copy': 'Long before there was a D-Day, someone collected clippings ignored by the press, incomplete medical records, and incidents closed in haste. Select the records that may belong to the same phenomenon and submit a hypothesis.',
    'classified.threat.case.separate': 'Separate evidence',
    'classified.threat.case.separated': 'Evidence separated',
    'classified.threat.case.open': 'OPEN ARTICLE ↗',
    'classified.threat.hypothesis.title': 'Build the hypothesis',
    'classified.threat.hypothesis.copy': 'Mark at least three pieces of evidence before drawing a conclusion. Isolated records may be coincidence; repetition is what someone tried to hide.',
    'classified.threat.hypothesis.wait': 'Awaiting evidence selection.',
    'classified.threat.forum.kicker': 'Underground server // partial copy recovered',
    'classified.threat.forum.copy': 'Before the reports were connected, strangers were already comparing accounts on a forum hidden from search engines. Some accounts vanished. One always appeared shortly before each file was removed.',
    'classified.threat.forum.search': 'Search forum',
    'classified.threat.forum.placeholder': 'SEARCH: hospital, sample, disappearance...',
    'classified.threat.forum.filters': 'Filter topics',
    'classified.threat.forum.all': 'All',
    'classified.threat.forum.medical': 'Medical',
    'classified.threat.forum.missing': 'Missing',
    'classified.threat.forum.removed': 'Removed',
    'classified.threat.forum.none': 'NO TOPIC SURVIVED THIS SEARCH.',
    'classified.threat.forum.select': 'SELECT A TOPIC',
    'classified.threat.forum.distrust': '// DO NOT TRUST EVERY ACCOUNT //',
    'classified.threat.forum.clues': 'ARCHIVED LEADS',
    'classified.threat.tape1.kicker': 'Object linked to WARD_09 topic',
    'classified.threat.tape1.title': 'TAPE 01 // WARD 9',
    'classified.threat.tape1.copy': 'A hospital training tape was found among the deleted DEADWIRE files. The recording was deliberately cut. Control playback, stabilize the tracking, and locate the code preserved in one of the frames.',
    'classified.threat.tape.notLoaded': 'Tape not loaded',
    'classified.threat.tape.insert': 'Insert the recovered media to begin playback.',
    'classified.threat.tape.controls': 'Tape controls',
    'classified.threat.tape.recovery': 'Manual recovery',
    'classified.threat.tape.manifest': 'The transfer manifest contains three digits. The image can only be read once global tracking is stable.',
    'classified.threat.tape.code': 'MANIFEST CODE // 3 DIGITS',
    'classified.threat.tape.recover': 'RECOVER',
    'classified.threat.tape.wait': 'AWAITING FRAME READOUT.',
    'classified.threat.tape2.kicker': 'Environmental receiver // abandoned channel',
    'classified.threat.tape2.title': 'TAPE 02 // ANIMAL EXODUS',
    'classified.threat.tape2.copy': 'Three frequencies were written on the back of a rural bulletin. Tune the receiver and capture each signal before the transmission vanishes again. The phenomenon may not have begun in humans.',
    'classified.threat.radio.title': 'Field tuner',
    'classified.threat.radio.copy': 'Logged frequencies:',
    'classified.threat.radio.capture': 'CAPTURE TRANSMISSION',
    'classified.threat.radio.scan': 'MOVE THE SELECTOR TO BEGIN SCANNING.',
    'classified.threat.tape3.kicker': 'Emergency dispatch // call 03:48',
    'classified.threat.tape3.title': 'TAPE 03 // MORGUE CALL',
    'classified.threat.tape3.copy': 'A call from internal phone 03 was recovered without its original audio track. Adjust the parameters until all three statements are intelligible, then reconstruct the order of events.',
    'classified.threat.audio.corrupt': 'AUDIO CORRUPTED',
    'classified.threat.audio.play': '▶ PLAY CALL',
    'classified.threat.audio.pause': 'Ⅱ PAUSE CALL',
    'classified.threat.audio.title': 'Spectral cleanup',
    'classified.threat.audio.frequency': 'FREQUENCY',
    'classified.threat.audio.noise': 'NOISE REDUCTION',
    'classified.threat.audio.speed': 'SPEED',
    'classified.threat.audio.intelligibility': 'INTELLIGIBILITY',
    'classified.threat.timeline.title': 'Timeline reconstruction',
    'classified.threat.timeline.clear': 'CLEAR',
    'classified.threat.timeline.validate': 'VALIDATE ORDER',
    'classified.threat.reader.close': 'CLOSE [ESC] ×',
    'classified.threat.reader.layers': 'Document layers',
    'classified.threat.reader.article': 'Recovered article',
    'classified.threat.reader.testimony': 'Testimony',
    'classified.threat.reader.biology': 'Biological traces',
    'classified.threat.reader.notes': 'Private notes',
    'classified.threat.reader.uncorrelated': 'DOCUMENT NOT YET CORRELATED',
    'classified.threat.reader.correlated': 'EVIDENCE CORRELATED TO BOARD',
    'classified.threat.progress.kicker': 'Incomplete field readings',
    'classified.threat.progress.title': 'Observed Progression',
    'classified.threat.observation.title': 'Observation protocol',
    'classified.threat.analysis.kicker': 'Behavior matrix',
    'classified.threat.analysis.title': 'Recorded Patterns',
    'classified.threat.analysis.label': 'Filter data by status',
    'classified.threat.analysis.confirmed': 'Confirmed',
    'classified.threat.analysis.pending': 'Under analysis',
    'classified.threat.analysis.unknown': 'Unidentified',
    'classified.threat.chain.kicker': 'Approximate sequence // variations possible',
    'classified.threat.chain.title': 'From Alteration to the Hunt',
    'classified.threat.evidence.kicker': 'File with no confirmed origin',
    'classified.threat.evidence.title': 'The first record?',
    'classified.threat.evidence.copy': 'The file predates the first official transmissions, but its metadata was destroyed. If authentic, someone knew what was happening before everyone else.',
    'classified.threat.evidence.recover': 'Recover visual evidence →',
    'classified.threat.evidence.hide': 'Hide evidence ←',
    'classified.threat.evidence.alt': 'First visual evidence possibly connected to the initial incidents',
    'classified.threat.evidence.caption': 'The author, location, and time of capture remain unknown.',
    'classified.threat.footer': 'DoomsDay — Original work — Unofficial dossier from the book\'s universe',
    'classified.threat.css.civil': 'CIVILIAN DOSSIER // FIELD',
    'classified.threat.css.independent': 'INDEPENDENT INVESTIGATION DOSSIER // WORKING COPY',
    'classified.threat.css.transmission': 'TRANSMISSION 09',
    'classified.threat.css.fieldSignal': 'FIELD SIGNAL // MOVEMENT DETECTED // DISTANCE UNKNOWN // DO NOT APPROACH',
    'classified.threat.css.archived': 'ARCHIVED CLIPPING',
    'classified.threat.css.confirmed': 'CONFIRMED',
    'classified.threat.css.chamber': 'CHAMBER 03',
    'classified.threat.misc.note04': 'NOTE 04',
    'classified.threat.misc.note11': 'NOTE 11',
    'classified.threat.misc.note18': 'NOTE 18',
    'classified.threat.misc.reminder': 'REMINDER',
    'classified.threat.misc.archivist': 'ARCHIVIST OF RECORD //',
    'classified.threat.misc.morgueCall': 'CALL_03 // MUNICIPAL MORGUE',
    'classified.threat.misc.separateEvidence': 'Isolate this evidence',
    'classified.threat.dynamic.notFirst': 'THIS WAS NOT THE FIRST CASE',
    'classified.threat.dynamic.edited': 'THE TAPE WAS EDITED',
    'classified.threat.dynamic.samples': 'WHO REMOVED THE SAMPLES?',
    'classified.threat.dynamic.investigating': 'SHE WAS ALREADY INVESTIGATING',
    'classified.threat.dynamic.missingFrame': 'FRAME MISSING // 00:17:09',
    'classified.threat.dynamic.minimum': 'There are not enough recurring elements to support a hypothesis yet.',
    'classified.threat.dynamic.choose': 'Minimum correlation reached. Select the most likely explanation.',
    'classified.threat.dynamic.rejected': 'CORRELATION REJECTED // Separate at least three pieces of evidence before drawing a conclusion.',
    'classified.threat.dynamic.probable': 'PROBABLE PATTERN // The cases predate D-Day. Someone was tracking a biological agent before its existence was acknowledged.',
    'classified.threat.dynamic.weak': 'WEAK HYPOTHESIS // This explanation does not account for the recurring symptoms, affected wildlife, and systematic disappearance of samples.',
    'classified.threat.dynamic.captured': '{frequency} // CAPTURED ✓',
    'classified.threat.dynamic.sequence': 'SEQUENCE // {sequence}',
    'classified.threat.dynamic.frame': 'FRAME {frame}/06',
    'classified.threat.dynamic.startedBy': 'STARTED BY @{author} // PARTIAL CACHE COPY',
    'classified.threat.dynamic.unverified': '{time} // IDENTITY UNVERIFIED',
    'classified.threat.dynamic.archiveClue': 'ARCHIVE LEAD',
    'classified.threat.dynamic.archivedClue': 'LEAD ARCHIVED ✓',
    'classified.threat.dynamic.rebuild': 'RECONSTRUCT REPLY [31%]',
    'classified.threat.dynamic.hideReply': 'HIDE REPLY',
    'classified.threat.dynamic.evidenceRecovered': 'RECOVERED',
    'classified.threat.dynamic.near': 'RANGE // NEAR',
    'classified.threat.dynamic.critical': 'RANGE // CRITICAL'
  });
  const sourcePairs = [
    ['72H ANTES // COSTA OESTE', '72H BEFORE // WEST COAST'],
    ['Famílias denunciam desaparecimentos em sequência', 'Families report a string of disappearances'],
    ['Delegacias tratam os casos como ocorrências independentes. Testemunhas afirmam que alguns desaparecidos foram vistos caminhando desorientados durante a madrugada.', 'Police departments are treating the cases as unrelated incidents. Witnesses say some of the missing were seen wandering in a disoriented state overnight.'],
    ['CONEXÃO NEGADA', 'CONNECTION DENIED'],
    ['58H ANTES // EUROPA CENTRAL', '58H BEFORE // CENTRAL EUROPE'],
    ['Ataque coletivo é investigado como possível canibalismo', 'Group attack investigated as possible cannibalism'],
    ['Imagens gravadas por moradores mostram agressores avançando mesmo após ferimentos graves. A polícia pede que os vídeos não sejam compartilhados.', 'Footage recorded by residents shows attackers advancing despite severe injuries. Police ask the public not to share the videos.'],
    ['MATERIAL REMOVIDO', 'MATERIAL REMOVED'],
    ['41H ANTES // LESTE ASIÁTICO', '41H BEFORE // EAST ASIA'],
    ['Hospitais isolam pacientes extremamente violentos', 'Hospitals isolate extremely violent patients'],
    ['Profissionais relatam ausência de resposta à comunicação e resistência incomum à contenção. A versão oficial menciona uma possível droga sintética.', 'Medical staff report no response to verbal communication and unusual resistance to restraint. The official statement cites a possible synthetic drug.'],
    ['ALA MÉDICA SELADA', 'MEDICAL WARD SEALED'],
    ['29H ANTES // AMÉRICA DO SUL', '29H BEFORE // SOUTH AMERICA'],
    ['Corpos desaparecem durante transferência de necrotério', 'Bodies vanish during morgue transfer'],
    ['Funcionários são afastados e o prédio entra em quarentena administrativa. Autoridades classificam o ocorrido como falha documental.', 'Staff are removed and the building is placed under administrative quarantine. Authorities classify the incident as a documentation failure.'],
    ['RELATÓRIO RETIDO', 'REPORT WITHHELD'],
    ['16H ANTES // COSTA LESTE', '16H BEFORE // EAST COAST'],
    ['Chamadas descrevem pessoas atacando familiares', 'Calls describe people attacking family members'],
    ['Operadores recebem relatos semelhantes em bairros diferentes: febre, confusão, agressividade e perda completa de reconhecimento.', 'Dispatchers receive similar reports from different neighborhoods: fever, confusion, aggression, and complete loss of recognition.'],
    ['LINHAS SATURADAS', 'LINES OVERLOADED'],
    ['03H ANTES // LOCAL NÃO CONFIRMADO', '03H BEFORE // LOCATION UNCONFIRMED'],
    ['Última transmissão termina durante evacuação', 'Final transmission ends during evacuation'],
    ['“Não são distúrbios. Eles não param.” A gravação é interrompida por ruídos, gritos e uma ordem para abandonar o edifício.', '“This is not civil unrest. They do not stop.” The recording cuts out amid noise, screams, and an order to evacuate the building.'],
    ['SINAL PERDIDO', 'SIGNAL LOST'],
    ['ARQUIVO FICCIONAL // LOCALIZAÇÕES GENERALIZADAS // FONTES E DATAS EXATAS NÃO RECUPERADAS', 'FICTIONAL ARCHIVE // LOCATIONS GENERALIZED // EXACT SOURCES AND DATES NOT RECOVERED'],
    ['17 DE OUTUBRO // 11 MESES ANTES', 'OCTOBER 17 // 11 MONTHS BEFORE'],
    ['GAZETA MUNICIPAL // EDIÇÃO RECOLHIDA', 'MUNICIPAL GAZETTE // EDITION WITHDRAWN'],
    ['Três pacientes desaparecem após transferência noturna', 'Three patients disappear after overnight transfer'],
    ['O hospital afirma que os nomes não constavam no sistema. Uma enfermeira descreveu febre extrema e ausência de resposta verbal antes de também desaparecer.', 'The hospital claims the names were never entered into its system. A nurse described extreme fever and no verbal response before she disappeared as well.'],
    ['DESAPARECIMENTO', 'DISAPPEARANCE'],
    ['FEBRE', 'FEVER'],
    ['HOSPITAL', 'HOSPITAL'],
    ['03 DE JANEIRO // 8 MESES ANTES', 'JANUARY 03 // 8 MONTHS BEFORE'],
    ['BOLETIM RURAL // ARQUIVO 014', 'RURAL BULLETIN // FILE 014'],
    ['Animais abandonam área de mata durante a madrugada', 'Animals abandon woodland area overnight'],
    ['Moradores encontraram aves mortas e cervos avançando contra cercas. Amostras recolhidas por uma equipe federal nunca chegaram ao laboratório local.', 'Residents found dead birds and deer charging into fences. Samples collected by a federal team never reached the local laboratory.'],
    ['AMOSTRA AUSENTE', 'SAMPLE MISSING'],
    ['AGRESSIVIDADE', 'AGGRESSION'],
    ['21 DE MAIO // 4 MESES ANTES', 'MAY 21 // 4 MONTHS BEFORE'],
    ['RELATÓRIO POLICIAL // CÓPIA NÃO AUTORIZADA', 'POLICE REPORT // UNAUTHORIZED COPY'],
    ['Funcionário de necrotério faz chamada antes de sumir', 'Morgue attendant makes call before disappearing'],
    ['Na gravação, ele afirma ter ouvido impactos dentro de uma câmara lacrada. A ocorrência foi encerrada como invasão, embora nenhuma porta tenha sido violada.', 'In the recording, he says he heard impacts from inside a sealed chamber. The case was closed as a break-in, although no door had been breached.'],
    ['NECROTÉRIO', 'MORGUE'],
    ['TRAUMA', 'TRAUMA'],
    ['ARQUIVO ENCERRADO', 'FILE CLOSED'],
    ['08 DE AGOSTO // 5 SEMANAS ANTES', 'AUGUST 08 // 5 WEEKS BEFORE'],
    ['JORNAL REGIONAL // PÁGINA 7', 'REGIONAL PAPER // PAGE 7'],
    ['Clínica isolada após quadro neurológico desconhecido', 'Clinic isolated after unknown neurological syndrome'],
    ['Familiares relataram perda de reconhecimento, mordidas e força incomum. A matéria desapareceu da edição digital poucas horas depois da publicação.', 'Relatives reported loss of recognition, biting, and unusual strength. The article vanished from the digital edition within hours of publication.'],
    ['CONTÁGIO', 'CONTAGION'],
    ['PERDA COGNITIVA', 'COGNITIVE LOSS'],
    ['CENSURA', 'CENSORSHIP'],
    ['Não procurar apenas pessoas. Verificar alterações em animais e resíduos biológicos.', 'Do not look only at people. Check for changes in animals and biological waste.'],
    ['Os sintomas aparecem em cidades sem ligação aparente. A sequência, porém, é quase idêntica.', 'The symptoms appear in cities with no apparent connection. The sequence, however, is nearly identical.'],
    ['Por que todas as amostras são removidas antes de chegarem aos laboratórios civis?', 'Why are all samples removed before they reach civilian laboratories?'],
    ['Confirmar a fonte em Washington. Não citar nomes pelo telefone.', 'Confirm the source in Washington. Do not mention names over the phone.'],
    ['UM ÚNICO PADRÃO?', 'ONE PATTERN?'],
    ['PROTOCOLO DE CORRELAÇÃO // INCOMPLETO', 'CORRELATION PROTOCOL // INCOMPLETE'],
    ['EVIDÊNCIAS CORRELACIONADAS', 'CORRELATED EVIDENCE'],
    ['Rede criminosa removendo testemunhas', 'Criminal network removing witnesses'],
    ['Droga experimental provocando violência', 'Experimental drug causing violence'],
    ['Agente biológico encoberto por autoridades', 'Biological agent concealed by authorities'],
    ['IDENTIDADE EXPURGADA', 'IDENTITY REDACTED'],
    ['FORMAÇÃO PROVÁVEL // IMPRENSA + CIÊNCIAS BIOLÓGICAS', 'PROBABLE BACKGROUND // JOURNALISM + BIOLOGICAL SCIENCES'],
    ['● 6 USUÁRIOS ON-LINE', '● 6 USERS ONLINE'],
    ['ESPELHO // 31% RECUPERADO', 'MIRROR // 31% RECOVERED'],
    ['ASSINATURA PARCIAL RECUPERADA // N.B.H.', 'PARTIAL SIGNATURE RECOVERED // N.B.H.'],
    ['AUTORA DO ESPELHO: IDENTIDADE AINDA INSUFICIENTE', 'MIRROR AUTHOR: IDENTITY DATA STILL INSUFFICIENT'],
    ['Fita não carregada', 'Tape not loaded'],
    ['Insira a mídia recuperada para iniciar a leitura.', 'Insert the recovered media to begin playback.'],
    ['Recuperação manual', 'Manual recovery'],
    ['TRECHO RECONSTRUÍDO // CASO ALA 9 CONFIRMADO', 'SEGMENT RECONSTRUCTED // WARD 9 CASE CONFIRMED'],
    ['NOVA RESPOSTA DISPONÍVEL NO DEADWIRE.', 'NEW REPLY AVAILABLE ON DEADWIRE.'],
    ['VARRENDO ESPECTRO // NENHUMA TRANSMISSÃO ESTÁVEL', 'SCANNING SPECTRUM // NO STABLE TRANSMISSION'],
    ['e', 'and'],
    ['MHz. Aproxime o seletor e capture cada transmissão.', 'MHz. Move the selector close to each one and capture the transmission.'],
    ['87.6 // AGUARDANDO', '87.6 // STANDBY'],
    ['93.1 // AGUARDANDO', '93.1 // STANDBY'],
    ['104.2 // AGUARDANDO', '104.2 // STANDBY'],
    ['PADRÃO INTERESPÉCIES CONFIRMADO // CASO AMBIENTAL CORRELACIONADO', 'CROSS-SPECIES PATTERN CONFIRMED // ENVIRONMENTAL CASE CORRELATED'],
    ['NOVA RESPOSTA RECUPERADA NO DEADWIRE.', 'NEW REPLY RECOVERED ON DEADWIRE.'],
    ['03:48:07 // FUNCIONÁRIO:', '03:48:07 // ATTENDANT:'],
    ['Ele está se movendo. Eu conferi a ficha duas vezes.', 'He is moving. I checked the record twice.'],
    ['03:48:19 // FUNCIONÁRIO:', '03:48:19 // ATTENDANT:'],
    ['A porta ainda está trancada por fora. Como ele está batendo?', 'The door is still locked from the outside. How is he pounding on it?'],
    ['03:49:02 // FUNCIONÁRIO:', '03:49:02 // ATTENDANT:'],
    ['Eles chegaram. Não são policiais. Como sabiam que eu liguei?', 'They are here. They are not police. How did they know I called?'],
    ['Disponível após recuperar as três falas.', 'Available after all three statements are recovered.'],
    ['03:49 // Equipe não identificada chega', '03:49 // Unidentified team arrives'],
    ['21:36 // Corpo recebido no necrotério', '21:36 // Body received at morgue'],
    ['03:48 // Chamada para a emergência', '03:48 // Emergency call'],
    ['03:41 // Impactos dentro da câmara', '03:41 // Impacts inside chamber'],
    ['SEQUÊNCIA // --', 'SEQUENCE // --'],
    ['RECUPERE O ÁUDIO ANTES DE VALIDAR A LINHA TEMPORAL.', 'RECOVER THE AUDIO BEFORE VALIDATING THE TIMELINE.'],
    ['CHAMADA RECONSTRUÍDA // ORIGEM AINDA ATIVA', 'CALL RECONSTRUCTED // SOURCE STILL ACTIVE'],
    ['NOTA DE RESTAURAÇÃO: “NÃO CHAME ISSO DE RESSURREIÇÃO.”', 'RESTORATION NOTE: “DO NOT CALL THIS RESURRECTION.”'],
    ['ARQUIVO // --', 'FILE // --'],
    ['ALTERAÇÃO INICIAL', 'INITIAL ALTERATION'],
    ['PERDA DE CONTROLE', 'LOSS OF CONTROL'],
    ['VARIAÇÃO AVANÇADA', 'ADVANCED VARIATION'],
    ['Estágio inicial', 'Initial stage'],
    ['Desorientação, respostas erráticas e sinais físicos que variam entre indivíduos.', 'Disorientation, erratic responses, and physical signs that vary between individuals.'],
    ['Comportamento hostil e redução progressiva da resposta à comunicação.', 'Hostile behavior and progressively reduced response to communication.'],
    ['Conversão', 'Conversion'],
    ['Perda de reconhecimento social e reação predominante a estímulos próximos.', 'Loss of social recognition and a predominant response to nearby stimuli.'],
    ['Fase avançada', 'Advanced stage'],
    ['Alterações podem se intensificar ou assumir padrões ainda não catalogados.', 'Alterations may intensify or assume patterns not yet cataloged.'],
    ['Confiabilidade', 'Reliability'],
    ['Relatos fragmentados, produzidos sob condições extremas.', 'Fragmented accounts produced under extreme conditions.'],
    ['Não existe uma linha do tempo segura para a progressão. Distância, silêncio e rotas de fuga continuam sendo as medidas mais confiáveis.', 'There is no reliable timeline for progression. Distance, silence, and escape routes remain the safest measures.'],
    ['REGISTRO VISUAL // EVENTO 04', 'VISUAL RECORD // EVENT 04'],
    ['Aglomeração', 'Clustering'],
    ['O campo de visão foi comprometido segundos após a captura.', 'The field of view was compromised seconds after capture.'],
    ['FONTE // DISPOSITIVO NÃO RECUPERADO', 'SOURCE // DEVICE NOT RECOVERED'],
    ['CONTAGEM // INDETERMINADA', 'COUNT // UNDETERMINED'],
    ['STATUS // CERCO', 'STATUS // ENCIRCLED'],
    ['Confirmado', 'Confirmed'],
    ['Atração por estímulos', 'Attraction to stimuli'],
    ['Movimento e ruídos próximos podem alterar rapidamente a direção do infectado.', 'Nearby movement and noise can rapidly redirect an infected subject.'],
    ['OBSERVAÇÃO RECORRENTE', 'RECURRING OBSERVATION'],
    ['Resposta imprevisível', 'Unpredictable response'],
    ['Indivíduos aparentemente inativos podem reagir sem aviso quando alguém entra em seu alcance.', 'Apparently inactive subjects may react without warning when someone enters their range.'],
    ['DISTÂNCIA RECOMENDADA', 'DISTANCE ADVISED'],
    ['Memória residual', 'Residual memory'],
    ['Alguns relatos sugerem gestos ou trajetos repetidos, mas não há prova de reconhecimento consciente.', 'Some reports describe repeated gestures or routes, but there is no evidence of conscious recognition.'],
    ['RELATOS NÃO CONCLUSIVOS', 'INCONCLUSIVE REPORTS'],
    ['Um único contato pode atrair outros e transformar uma rota segura em uma zona de cerco.', 'A single contact can attract others and turn a safe route into an encirclement zone.'],
    ['RISCO DE EFEITO EM CADEIA', 'CHAIN-REACTION RISK'],
    ['Adaptação', 'Adaptation'],
    ['Diferenças físicas e comportamentais podem indicar estágios avançados ou respostas individuais.', 'Physical and behavioral differences may indicate advanced stages or individual responses.'],
    ['CATÁLOGO EM FORMAÇÃO', 'CATALOG IN DEVELOPMENT'],
    ['Não identificado', 'Unidentified'],
    ['Próxima evolução', 'Next evolution'],
    ['Há registros contraditórios de infectados que não correspondem aos padrões conhecidos.', 'Conflicting records describe infected subjects that do not match known patterns.'],
    ['AMEAÇA AINDA NÃO CLASSIFICADA', 'THREAT NOT YET CLASSIFIED'],
    ['ESTÁGIO 01 // SINAIS INICIAIS', 'STAGE 01 // INITIAL SIGNS'],
    ['Instabilidade', 'Instability'],
    ['Desorientação e alterações físicas podem surgir antes do comportamento abertamente hostil.', 'Disorientation and physical changes may emerge before openly hostile behavior.'],
    ['ESTÁGIO 02 // RUPTURA', 'STAGE 02 // BREAKDOWN'],
    ['Perda de resposta', 'Loss of response'],
    ['A comunicação deixa de produzir reconhecimento seguro. A aproximação passa a ser um risco extremo.', 'Communication no longer produces reliable recognition. Any approach becomes an extreme risk.'],
    ['ESTÁGIO 03 // CONVERSÃO', 'STAGE 03 // CONVERSION'],
    ['Comportamento predatório', 'Predatory behavior'],
    ['O infectado reage ao ambiente e persegue estímulos próximos com agressividade.', 'The infected reacts to its environment and aggressively pursues nearby stimuli.'],
    ['ESTÁGIO 04 // VARIAÇÃO', 'STAGE 04 // VARIATION'],
    ['Evolução irregular', 'Irregular evolution'],
    ['Tempo, condições físicas e fatores desconhecidos podem produzir diferenças entre indivíduos.', 'Time, physical condition, and unknown factors may produce differences between individuals.'],
    ['ESTÁGIO 05 // SEM REGISTRO', 'STAGE 05 // NO RECORD'],
    ['Além do padrão', 'Beyond the pattern'],
    ['O que acontece depois ainda não foi compreendido — ou ninguém sobreviveu tempo suficiente para registrar.', 'What happens next is still unknown—or no one survived long enough to document it.'],
    ['ARQUIVO RECUPERADO // REGISTRO 00?', 'FILE RECOVERED // RECORD 00?'],
    ['Primeira evidência', 'First evidence']
  ];
  sourcePairs.push(...[
    ['CASO 017-A // EDIÇÃO RECOLHIDA', 'CASE 017-A // EDITION WITHDRAWN'],
    ['Hospital nega que os pacientes tenham dado entrada, mas funcionários descrevem uma operação não registrada durante a madrugada.', 'The hospital denies ever admitting the patients, but staff describe an unlogged overnight operation.'],
    ['CASO 024-C // BOLETIM RURAL', 'CASE 024-C // RURAL BULLETIN'],
    ['CASO 039-F // RELATÓRIO RETIDO', 'CASE 039-F // REPORT WITHHELD'],
    ['Uma ligação de emergência menciona impactos em uma câmara lacrada; o prédio foi esvaziado antes da chegada da polícia local.', 'An emergency call mentions impacts inside a sealed chamber; the building was cleared before local police arrived.'],
    ['CASO 051-B // PÁGINA REMOVIDA', 'CASE 051-B // PAGE REMOVED'],
    ['Uma reportagem retirada do ar descrevia pacientes incapazes de reconhecer familiares e resistentes aos sedativos disponíveis.', 'A withdrawn report described patients unable to recognize relatives and resistant to available sedatives.'],
    ['Remover da correlação', 'Remove from correlation'],
    ['TÓPICO REMOVIDO', 'TOPIC REMOVED'],
    ['Alguém sabe o que aconteceu na ala 9?', 'Does anyone know what happened in Ward 9?'],
    ['10 MESES ANTES', '10 MONTHS BEFORE'],
    ['Funcionários foram mandados para casa e os prontuários sumiram.', 'Staff were sent home and the medical records vanished.'],
    ['Trabalho no turno da madrugada. Isolaram quatro quartos e trouxeram homens que não eram da equipe médica. Os pacientes estavam febris e presos às camas.', 'I work the night shift. They isolated four rooms and brought in men who were not medical staff. The patients had fevers and were restrained to their beds.'],
    ['Você ouviu algum diagnóstico? Recebemos pacientes parecidos, mas proibiram que coletássemos sangue.', 'Did you hear a diagnosis? We received similar patients, but they prohibited us from drawing blood.'],
    ['Só consegui fotografar uma etiqueta antes de levarem as caixas: BIOHAZARD // TRANSFERÊNCIA FEDERAL.', 'I only managed to photograph one label before they took the boxes: BIOHAZARD // FEDERAL TRANSFER.'],
    ['Não existe ala 9 nessa unidade. Este tópico espalha desinformação e será encaminhado às autoridades.', 'There is no Ward 9 at this facility. This topic spreads misinformation and will be referred to the authorities.'],
    ['A conta CIVIC_ORDER respondeu seis minutos antes da remoção do tópico.', 'The CIVIC_ORDER account replied six minutes before the topic was removed.'],
    ['USUÁRIO DESAPARECIDO', 'USER MISSING'],
    ['Minha irmã não voltou do hospital', 'My sister never came back from the hospital'],
    ['7 MESES ANTES', '7 MONTHS BEFORE'],
    ['A transferência não aparece em nenhum sistema público.', 'The transfer does not appear in any public system.'],
    ['Ela entrou com febre e confusão. Disseram que seria transferida, mas ninguém informa o destino.', 'She was admitted with fever and confusion. They said she would be transferred, but no one will say where.'],
    ['Procure veículos sem placa no acesso de serviço. Vi dois saindo de outra clínica às três da manhã.', 'Look for unmarked vehicles at the service entrance. I saw two leave another clinic at three in the morning.'],
    ['Achei o nome de um motorista em uma cópia do formulário. Vou publicar assim que confirmar.', 'I found a driver\'s name on a copy of the form. I will post it as soon as I confirm.'],
    ['A família já foi contatada. Não interfiram em um procedimento médico legítimo.', 'The family has already been contacted. Do not interfere with a legitimate medical procedure.'],
    ['Último acesso de lena_w: dois minutos após a mensagem de CIVIC_ORDER.', 'Last login by lena_w: two minutes after the CIVIC_ORDER message.'],
    ['ARQUIVO CORROMPIDO', 'FILE CORRUPTED'],
    ['Por que todas as amostras desaparecem?', 'Why do all the samples disappear?'],
    ['3 MESES ANTES', '3 MONTHS BEFORE'],
    ['Laboratórios de cidades diferentes relatam a mesma quebra de custódia.', 'Laboratories in different cities report the same break in custody.'],
    ['Três laboratórios receberam protocolos, mas nenhuma amostra chegou. Os códigos de coleta começam com a mesma sequência.', 'Three laboratories received protocols, but no samples arrived. The collection codes begin with the same sequence.'],
    ['Também aconteceu com tecido animal. A justificativa foi contaminação, embora as caixas nunca tenham sido abertas aqui.', 'It also happened with animal tissue. The stated reason was contamination, although the boxes were never opened here.'],
    ['Enviei os manifestos para uma jornalista. Ela pediu para comparar sintomas neurológicos e agressividade entre espécies.', 'I sent the manifests to a journalist. She asked me to compare neurological symptoms and aggression across species.'],
    ['Materiais biológicos são descartados rotineiramente. Não há qualquer conexão entre esses eventos.', 'Biological materials are routinely discarded. There is no connection between these events.'],
    ['A negativa menciona uma “conexão” que nenhum usuário havia afirmado diretamente.', 'The denial mentions a “connection” that no user had directly claimed.'],
    ['CONTA ENCERRADA', 'ACCOUNT CLOSED'],
    ['Eles estão apagando os vídeos antes das notícias', 'They are deleting the videos before the news breaks'],
    ['6 SEMANAS ANTES', '6 WEEKS BEFORE'],
    ['Cópias diferentes exibem a mesma equipe chegando antes dos serviços locais.', 'Different recordings show the same team arriving before local services.'],
    ['Baixei quatro vídeos antes de desaparecerem. Em todos, o mesmo veículo chega antes da polícia ou da ambulância.', 'I downloaded four videos before they vanished. In every one, the same vehicle arrives before police or paramedics.'],
    ['Preserve os arquivos fora da nuvem. Procure a marca triangular no canto das caixas.', 'Keep the files off the cloud. Look for the triangular mark on the corner of the boxes.'],
    ['Tem alguém na porta. Se minha conta cair, a chave do arquivo é a data do primeiro caso.', 'Someone is at the door. If my account goes down, the archive key is the date of the first case.'],
    ['Conteúdo fabricado. A conta foi suspensa por violar os termos da comunidade.', 'Fabricated content. The account was suspended for violating community guidelines.'],
    ['CIVIC_ORDER publicou antes de a suspensão aparecer no sistema.', 'CIVIC_ORDER posted before the suspension appeared in the system.'],
    ['FRAME LOCALIZADO // REDUZA O TRACKING PARA LER O CÓDIGO.', 'FRAME LOCATED // REDUCE TRACKING TO READ THE CODE.'],
    ['MOVIMENTO DETECTADO // A GRAVAÇÃO NÃO DEVERIA CONTINUAR.', 'MOVEMENT DETECTED // THE RECORDING SHOULD NOT CONTINUE.'],
    ['FITA CARREGADA // USE PLAY, PAUSE OU AVANÇO DE FRAME.', 'TAPE LOADED // USE PLAY, PAUSE, OR FRAME ADVANCE.'],
    ['ARQUIVO RECUSADO // O MANIFESTO AINDA NÃO FOI LOCALIZADO.', 'FILE REJECTED // MANIFEST NOT YET LOCATED.'],
    ['CÓDIGO INVÁLIDO // O TRECHO CONTINUA CORROMPIDO.', 'INVALID CODE // SEGMENT REMAINS CORRUPTED.'],
    ['CÓDIGO 612 ACEITO // RECUPERANDO INTERVALO AUSENTE...', 'CODE 612 ACCEPTED // RECOVERING MISSING INTERVAL...'],
    ['ARQUIVO RESTAURADO', 'FILE RESTORED'],
    ['A fita confirma três pacientes e uma autorização federal. Preservem o código 612. A Ala 9 existiu.', 'The tape confirms three patients and federal authorization. Preserve code 612. Ward 9 existed.'],
    ['FITA 01 // CASO CONFIRMADO', 'TAPE 01 // CASE CONFIRMED'],
    ['REGISTRO AÉREO', 'AERIAL RECORD'],
    ['BANDO DE AVES ABANDONA A MATA ÀS 02:11 // 37 CARCAÇAS LOCALIZADAS JUNTO AO RIO', 'FLOCK LEAVES WOODLAND AT 02:11 // 37 CARCASSES FOUND BY RIVER'],
    ['Frequência 87.6 preservou o chamado de um observador: as aves fugiam antes de qualquer alerta ambiental.', 'Frequency 87.6 preserved an observer\'s report: the birds fled before any environmental alert.'],
    ['REGISTRO TERRESTRE', 'GROUND RECORD'],
    ['CERVOS AVANÇAM CONTRA CERCA DE CONTENÇÃO // RESPOSTA À DOR AUSENTE', 'DEER CHARGE CONTAINMENT FENCE // NO PAIN RESPONSE'],
    ['Frequência 93.1 confirma comportamento agressivo e persistência após trauma grave.', 'Frequency 93.1 confirms aggressive behavior and persistence after severe trauma.'],
    ['CADEIA DE CUSTÓDIA', 'CHAIN OF CUSTODY'],
    ['EQUIPE FEDERAL RECOLHE TECIDO, ÁGUA E SOLO // DESTINO DAS AMOSTRAS NÃO REGISTRADO', 'FEDERAL TEAM COLLECTS TISSUE, WATER, AND SOIL // SAMPLE DESTINATION UNLOGGED'],
    ['Frequência 104.2 registra a retirada das amostras antes que o laboratório municipal pudesse analisá-las.', 'Frequency 104.2 records the samples being removed before the municipal laboratory could analyze them.'],
    ['SINAL LOCALIZADO', 'SIGNAL LOCATED'],
    ['RUÍDO DE FUNDO', 'BACKGROUND NOISE'],
    ['CAPTURA FALHOU // AJUSTE A FREQUÊNCIA ATÉ O SINAL ESTABILIZAR.', 'CAPTURE FAILED // ADJUST FREQUENCY UNTIL THE SIGNAL STABILIZES.'],
    ['TRÊS REGISTROS CORRELACIONADOS // O MESMO PADRÃO ATRAVESSOU AVES E MAMÍFEROS.', 'THREE RECORDS CORRELATED // THE SAME PATTERN CROSSED BIRDS AND MAMMALS.'],
    ['SINAL RESTAURADO', 'SIGNAL RESTORED'],
    ['As transmissões confirmam alterações em aves e mamíferos antes dos casos humanos reconhecidos. As amostras foram retiradas pela mesma cadeia federal.', 'The transmissions confirm changes in birds and mammals before the recognized human cases. The samples were removed through the same federal chain.'],
    ['PADRÃO INTERESPÉCIES', 'CROSS-SPECIES PATTERN'],
    ['VOZ SECUNDÁRIA RECUPERADA', 'SECONDARY VOICE RECOVERED'],
    ['DUAS FALAS LEGÍVEIS', 'TWO STATEMENTS LEGIBLE'],
    ['FRAGMENTO DE VOZ', 'VOICE FRAGMENT'],
    ['TRÊS FALAS RECUPERADAS // RECONSTRUA A ORDEM DOS EVENTOS.', 'THREE STATEMENTS RECOVERED // RECONSTRUCT THE ORDER OF EVENTS.'],
    ['CORPO RECEBIDO', 'BODY RECEIVED'],
    ['IMPACTOS NA CÂMARA', 'IMPACTS IN CHAMBER'],
    ['CHAMADA DE EMERGÊNCIA', 'EMERGENCY CALL'],
    ['EQUIPE NÃO IDENTIFICADA', 'UNIDENTIFIED TEAM'],
    ['VALIDAÇÃO BLOQUEADA // AS TRÊS FALAS AINDA NÃO ESTÃO LEGÍVEIS.', 'VALIDATION LOCKED // ALL THREE STATEMENTS ARE NOT YET LEGIBLE.'],
    ['ORDEM INCONSISTENTE // COMPARE OS HORÁRIOS RECUPERADOS.', 'INCONSISTENT ORDER // COMPARE THE RECOVERED TIMESTAMPS.'],
    ['ORDEM CONFIRMADA // A EQUIPE CHEGOU 43 SEGUNDOS APÓS A CHAMADA. TEMPO DE RESPOSTA IMPOSSÍVEL.', 'ORDER CONFIRMED // THE TEAM ARRIVED 43 SECONDS AFTER THE CALL. IMPOSSIBLE RESPONSE TIME.'],
    ['CACHE RECÉM-RECUPERADO', 'CACHE JUST RECOVERED'],
    ['A chamada do telefone interno 03', 'The call from internal phone 03'],
    ['4 MESES ANTES', '4 MONTHS BEFORE'],
    ['A equipe chegou antes que a polícia pudesse receber o endereço.', 'The team arrived before police could have received the address.'],
    ['A ordem dos eventos prova que a equipe já monitorava a câmara antes da ligação. O funcionário nunca foi localizado.', 'The order of events proves the team was already monitoring the chamber before the call. The attendant was never found.'],
    ['Trabalhei naquele prédio. A porta só podia ser destrancada pelo corredor. Não havia ninguém do lado de dentro.', 'I worked in that building. The door could only be unlocked from the corridor. There was no one inside.'],
    ['A gravação foi adulterada. Qualquer cópia deve ser entregue imediatamente.', 'The recording was tampered with. Every copy must be surrendered immediately.'],
    ['CIVIC_ORDER exigiu a fita antes de sua existência ser publicada.', 'CIVIC_ORDER demanded the tape before its existence was made public.'],
    ['ORIGEM DA CHAMADA AINDA ATIVA', 'CALL SOURCE STILL ACTIVE'],
    ['PADRÃO ANTERIOR DETECTADO', 'EARLIER PATTERN DETECTED'],
    ['HIPÓTESE INCONCLUSIVA', 'INCONCLUSIVE HYPOTHESIS'],
    ['MOVIMENTO PRÓXIMO', 'MOVEMENT NEARBY'],
    ['MÚLTIPLOS SINAIS', 'MULTIPLE SIGNALS'],
    ['PADRÃO DESCONHECIDO', 'UNKNOWN PATTERN'],
    ['CONTATO VISUAL', 'VISUAL CONTACT'],
    ['CERCO IMINENTE', 'ENCIRCLEMENT IMMINENT'],
    ['PADRÃO EM EXPANSÃO', 'PATTERN EXPANDING'],
    ['SINAIS CORRELACIONADOS', 'SIGNALS CORRELATED'],
    ['ANALISANDO TRANSMISSÕES', 'ANALYZING TRANSMISSIONS'],
    ['REGISTRO ANTERIOR DETECTADO', 'EARLIER RECORD DETECTED'],
    ['AUTENTICIDADE INCERTA', 'AUTHENTICITY UNCERTAIN'],
    ['N.B.H. // NÃO CONFIRMADA', 'N.B.H. // UNCONFIRMED'],
    ['N._._. // VESTÍGIO INSUFICIENTE', 'N._._. // INSUFFICIENT TRACE'],
    ['SESSÃO RESTAURADA // CÓDIGO 612 JÁ VALIDADO.', 'SESSION RESTORED // CODE 612 ALREADY VALIDATED.'],
    ['SESSÃO RESTAURADA // PADRÃO INTERESPÉCIES CONFIRMADO.', 'SESSION RESTORED // CROSS-SPECIES PATTERN CONFIRMED.'],
    ['As transmissões confirmam alterações em aves e mamíferos antes dos casos humanos reconhecidos.', 'The transmissions confirm changes in birds and mammals before the recognized human cases.'],
    ['SESSÃO RESTAURADA // ORDEM TEMPORAL CONFIRMADA.', 'SESSION RESTORED // TIMELINE ORDER CONFIRMED.'],
    ['A ordem dos eventos prova que a equipe já monitorava a câmara antes da ligação.', 'The order of events proves the team was already monitoring the chamber before the call.']
  ]);
  sourcePairs.push(...[
    ['Três pessoas internadas com febre alta desapareceram durante uma transferência que não consta nos registros oficiais. Segundo funcionários, dois veículos sem identificação chegaram ao acesso de serviço às 02h13.', 'Three patients hospitalized with high fevers disappeared during a transfer absent from all official records. Staff say two unmarked vehicles arrived at the service entrance at 02:13.'],
    ['A direção afirma que houve apenas uma falha administrativa. Entretanto, os leitos foram desinfetados antes do amanhecer e as câmeras do corredor ficaram fora de operação por exatamente quarenta e sete minutos.', 'Management claims it was merely an administrative failure. Yet the beds were disinfected before dawn and the corridor cameras went offline for exactly forty-seven minutes.'],
    ['Familiares receberam a informação de que os pacientes haviam sido encaminhados a outra unidade. Nenhum hospital da região confirmou a chegada.', 'Relatives were told the patients had been sent to another facility. No hospital in the region confirmed their arrival.'],
    ['“Eles não respondiam quando chamávamos seus nomes. Um deles estava preso à maca, mas continuava tentando alcançar qualquer pessoa que passasse perto.”', '“They did not respond when we called their names. One was restrained to the gurney, but kept trying to reach anyone who came near.”'],
    ['O depoimento pertence a uma enfermeira temporária. Ela deixou de comparecer ao trabalho três dias depois e não foi localizada.', 'The testimony belongs to a temporary nurse. She stopped reporting for work three days later and could not be located.'],
    ['Temperatura', 'Temperature'],
    ['Acima de 41 °C.', 'Above 41 °C.'],
    ['Resposta verbal', 'Verbal response'],
    ['Ausente.', 'Absent.'],
    ['Comportamento', 'Behavior'],
    ['Agressividade dirigida a estímulos próximos.', 'Aggression directed toward nearby stimuli.'],
    ['Amostras', 'Samples'],
    ['Removidas por equipe não identificada.', 'Removed by an unidentified team.'],
    ['O hospital apagou os nomes, mas não conseguiu apagar o intervalo das câmeras. Descobrir quem autorizou os veículos.', 'The hospital erased the names, but could not erase the camera outage. Find out who authorized the vehicles.'],
    ['Mesma combinação: febre, perda de reconhecimento e remoção das amostras. Não publicar ainda.', 'Same combination: fever, loss of recognition, and sample removal. Do not publish yet.'],
    ['Moradores de três propriedades relataram uma fuga simultânea de animais silvestres. Cervos colidiram repetidamente contra cercas e aves foram encontradas mortas próximas ao rio.', 'Residents of three properties reported wildlife fleeing simultaneously. Deer repeatedly collided with fences and birds were found dead near the river.'],
    ['Uma equipe sem identificação recolheu carcaças, água e solo. O laboratório municipal recebeu os protocolos de envio, mas nenhuma das caixas chegou ao destino.', 'An unidentified team collected carcasses, water, and soil. The municipal laboratory received the shipping protocols, but none of the boxes arrived.'],
    ['A área foi reaberta após dois dias. O relatório ambiental classificou o episódio como consequência de contaminação agrícola, embora nenhum pesticida tenha sido detectado.', 'The area reopened after two days. The environmental report attributed the event to agricultural contamination, although no pesticide was detected.'],
    ['“Não estavam fugindo de um incêndio. Pareciam fugir uns dos outros. O cervo continuou avançando mesmo depois de quebrar a própria perna.”', '“They were not fleeing a fire. They seemed to be fleeing one another. The deer kept charging even after breaking its own leg.”'],
    ['O proprietário recusou entrevistas posteriores e vendeu a fazenda no mês seguinte.', 'The owner refused further interviews and sold the farm the following month.'],
    ['Fauna afetada', 'Affected wildlife'],
    ['Mamíferos e aves.', 'Mammals and birds.'],
    ['Lesões', 'Injuries'],
    ['Autoinfligidas durante comportamento agressivo.', 'Self-inflicted during aggressive behavior.'],
    ['Água', 'Water'],
    ['Resultado inicial inconclusivo.', 'Initial result inconclusive.'],
    ['Interrompida antes da análise.', 'Interrupted before analysis.'],
    ['Se o fenômeno atravessa espécies, a hipótese de droga recreativa não se sustenta.', 'If the phenomenon crosses species, the recreational-drug hypothesis does not hold.'],
    ['Comparar tecido das aves com o prontuário do hospital. Preciso de um laboratório fora da rede oficial.', 'Compare bird tissue with the hospital record. I need a laboratory outside the official network.'],
    ['Um funcionário acionou a emergência às 03h48 após ouvir golpes vindos de uma câmara refrigerada. A porta permanecia trancada por fora e o lacre não apresentava violação.', 'An attendant called emergency services at 03:48 after hearing blows from inside a refrigerated chamber. The door remained locked from the outside and the seal showed no breach.'],
    ['A primeira equipe policial foi impedida de entrar por agentes que assumiram a ocorrência. Quando o prédio foi devolvido ao município, dois corpos e o funcionário haviam desaparecido.', 'The first police team was denied entry by agents who took control of the scene. When the building was returned to the city, two bodies and the attendant were missing.'],
    ['O caso foi encerrado como invasão e furto de material médico. Nenhuma imagem das câmeras foi anexada ao processo.', 'The case was closed as a break-in and theft of medical material. No camera footage was attached to the file.'],
    ['“Há alguém batendo por dentro. Eu conferi a ficha duas vezes. Ele chegou sem sinais vitais ontem à noite.”', '“Someone is pounding from inside. I checked the record twice. He arrived with no vital signs last night.”'],
    ['A chamada termina com um impacto metálico e a voz do funcionário afastando-se do telefone.', 'The call ends with a metallic impact and the attendant\'s voice moving away from the phone.'],
    ['Óbito confirmado', 'Death confirmed'],
    ['Registro assinado por dois profissionais.', 'Record signed by two professionals.'],
    ['Tempo refrigerado', 'Time refrigerated'],
    ['6 horas e 12 minutos.', '6 hours and 12 minutes.'],
    ['Trauma prévio', 'Prior trauma'],
    ['Múltiplas lesões graves.', 'Multiple severe injuries.'],
    ['Autópsia', 'Autopsy'],
    ['Não realizada; corpo removido.', 'Not performed; body removed.'],
    ['Não chamar isso de ressurreição. Pode haver erro no diagnóstico, atividade neurológica residual ou algo que ainda não entendemos.', 'Do not call this resurrection. It may be a diagnostic error, residual neurological activity, or something we do not yet understand.'],
    ['A mesma autoridade aparece novamente antes da polícia local. Quem está limpando a trilha?', 'The same authority appears again before local police. Who is erasing the trail?'],
    ['Uma clínica particular suspendeu visitas depois que seis pacientes apresentaram febre, confusão e episódios súbitos de violência. A administração chamou o isolamento de medida preventiva.', 'A private clinic suspended visits after six patients developed fever, confusion, and sudden episodes of violence. Administrators called the isolation a preventive measure.'],
    ['Familiares afirmam que os pacientes tentavam morder profissionais e não reagiam aos próprios nomes. Dois seguranças foram hospitalizados, mas seus destinos não foram informados.', 'Relatives say the patients tried to bite staff and did not respond to their own names. Two security guards were hospitalized, but their destinations were never disclosed.'],
    ['A reportagem original permaneceu disponível por vinte e três minutos. O servidor foi substituído e a jornalista responsável recebeu uma ordem formal para abandonar a investigação.', 'The original report remained online for twenty-three minutes. The server was replaced and the journalist was formally ordered to abandon the investigation.'],
    ['“Minha mãe olhou diretamente para mim. Não havia reconhecimento algum. Quando ouviu alguém correr no corredor, virou a cabeça como se só aquele som existisse.”', '“My mother looked straight at me. There was no recognition at all. When she heard someone running in the corridor, she turned as if that sound were the only thing that existed.”'],
    ['O familiar pediu anonimato e entregou uma cópia do prontuário antes de deixar a cidade.', 'The relative requested anonymity and provided a copy of the medical record before leaving the city.'],
    ['Incubação estimada', 'Estimated incubation'],
    ['Desconhecida.', 'Unknown.'],
    ['Sintomas comuns', 'Common symptoms'],
    ['Febre, perda cognitiva e agressividade.', 'Fever, cognitive loss, and aggression.'],
    ['Sedação', 'Sedation'],
    ['Resposta abaixo do esperado.', 'Response below expectations.'],
    ['Transmissão', 'Transmission'],
    ['Contato ainda não confirmado.', 'Contact not yet confirmed.'],
    ['Agora o intervalo está diminuindo. Onze meses, oito, quatro, cinco semanas. Os casos não são isolados; estão acelerando.', 'The interval is shrinking. Eleven months, eight, four, five weeks. The cases are not isolated; they are accelerating.'],
    ['Minha fonte em Washington confirmou que existe uma classificação interna. Ainda não disse o nome.', 'My source in Washington confirmed an internal classification exists. They have not given me the name yet.'],
    ['MEMORIAL HOSPITAL // TREINAMENTO INTERNO', 'MEMORIAL HOSPITAL // INTERNAL TRAINING'],
    ['Controle de infecções', 'Infection control'],
    ['Material destinado exclusivamente aos funcionários da unidade.', 'Material intended exclusively for facility staff.'],
    ['Protocolo básico', 'Basic protocol'],
    ['01 // Higienize as mãos antes e depois de qualquer contato.', '01 // Sanitize your hands before and after every contact.'],
    ['02 // Utilize luvas e proteção respiratória nas áreas isoladas.', '02 // Wear gloves and respiratory protection in isolation areas.'],
    ['03 // Identifique e descarte corretamente todo material biológico.', '03 // Identify and properly dispose of all biological material.'],
    ['Adendo // Ala 9', 'Addendum // Ward 9'],
    ['Não responda quando o paciente chamar pelo seu nome.', 'Do not respond when the patient calls your name.'],
    ['Não permita a entrada de familiares após o início da febre.', 'Do not admit family members after the onset of fever.'],
    ['Se o paciente parar de respirar, não abra a porta.', 'If the patient stops breathing, do not open the door.'],
    ['MANIFESTO DE TRANSFERÊNCIA', 'TRANSFER MANIFEST'],
    ['NÃO REGISTRADO', 'UNLOGGED'],
    ['UNIDADE', 'UNIT'],
    ['PACIENTES', 'PATIENTS'],
    ['DESTINO', 'DESTINATION'],
    ['AUTORIZAÇÃO', 'AUTHORIZATION'],
    ['FEDERAL // NÍVEL 6', 'FEDERAL // LEVEL 6'],
    ['CÓDIGO', 'CODE'],
    ['FRAME REMOVIDO', 'FRAME REMOVED'],
    ['CÂMERA 09 // 03:48:12', 'CAMERA 09 // 03:48:12'],
    ['PACIENTE DECLARADO MORTO HÁ 06:12:43', 'PATIENT DECLARED DEAD 06:12:43 AGO']
  ]);
  sourcePairs.push(...[
    ['Equipe responsável:', 'Responsible team:'],
    ['. Coordenadas e método de extração aguardam definição narrativa.', '. Coordinates and extraction method await narrative confirmation.'],
    ['SETOR 02 // SOMENTE LEITURA', 'SECTOR 02 // READ ONLY'],
    ['Câmara de observação', 'Observation chamber'],
    ['Registros visuais da amostra ainda não foram anexados. O setor permanece preparado para receber imagens, anotações e gravações confirmadas durante a reescrita.', 'Visual records of the sample have not yet been attached. The sector remains prepared to receive images, notes, and recordings confirmed during the rewrite.'],
    ['VIDROS', 'PANELS'],
    ['SELADOS', 'SEALED'],
    ['REGISTROS', 'RECORDS'],
    ['AUSENTES', 'MISSING'],
    ['CAPTURA', 'CAPTURE'],
    ['Nenhuma observação científica confirmada foi encontrada.', 'No confirmed scientific observation was found.'],
    ['SETOR 03 // REGISTRO PARCIAL', 'SECTOR 03 // PARTIAL RECORD'],
    ['Unidade criogênica', 'Cryogenic unit'],
    ['A origem congelada da amostra DOOM está confirmada. Equipamentos, temperatura de custódia e condições de preservação ainda permanecem classificados.', 'The frozen origin of the DOOM sample is confirmed. Equipment, custody temperature, and preservation conditions remain classified.'],
    ['INDETERMINADO', 'UNDETERMINED'],
    ['Assinatura biológica localizada no arquivo de recuperação.', 'Biological signature located in the recovery archive.'],
    ['SETOR 04 // ARQUIVO CORROMPIDO', 'SECTOR 04 // FILE CORRUPTED'],
    ['Laboratório de testes', 'Testing laboratory'],
    ['Resultados, procedimentos e responsáveis não constam nos registros recuperados. O setor será aberto quando esses acontecimentos forem definidos na história.', 'Results, procedures, and responsible personnel are absent from the recovered records. The sector will open once these events are established in the story.'],
    ['ENSAIOS', 'TRIALS'],
    ['EQUIPE', 'TEAM'],
    ['RESULTADO', 'RESULT'],
    ['CORROMPIDO', 'CORRUPTED'],
    ['Acesso recusado. Integridade insuficiente para reconstrução.', 'Access denied. Insufficient integrity for reconstruction.'],
    ['SETOR 05 // BLOQUEIO ATIVO', 'SECTOR 05 // ACTIVE LOCKDOWN'],
    ['Área de contenção', 'Containment area'],
    ['A relação entre esta instalação e a ruptura que antecede o Dia Zero permanece desconhecida. Nenhum evento foi apresentado como fato confirmado.', 'The relationship between this facility and the breach preceding Day Zero remains unknown. No event has been presented as confirmed fact.'],
    ['PORTAS', 'DOORS'],
    ['INCIDENTE', 'INCIDENT'],
    ['NÃO CONFIRMADO', 'UNCONFIRMED'],
    ['Protocolo de emergência ativo. Autorização adicional exigida.', 'Emergency protocol active. Additional authorization required.'],
    ['SETOR 06 // 31% RECUPERADO', 'SECTOR 06 // 31% RECOVERED'],
    ['Reúne a cadeia de custódia, a ficha provisória da amostra e as lacunas reservadas para a construção futura da narrativa.', 'Contains the chain of custody, the provisional sample record, and gaps reserved for future narrative development.'],
    ['CÓPIA', 'COPY'],
    ['Documentos recuperados disponíveis abaixo do mapa.', 'Recovered documents are available below the map.'],
    ['Credencial aceita. Rotas internas parcialmente restauradas.', 'Credentials accepted. Internal routes partially restored.']
  ]);
  const sourcePt = {};
  const sourceEn = {};
  sourcePairs.forEach(function (pair, index) {
    const key = 'classified.threat.source.' + String(index + 1).padStart(3, '0');
    sourcePt[key] = pair[0];
    sourceEn[key] = pair[1];
  });
  Object.assign(source, sourcePt);
  Object.assign(classified, sourceEn);
  Object.assign(catalog, classified);

  if (typeof document !== 'undefined' && !window.DoomsdayClassified) {
    const attributes = ['aria-label', 'alt', 'placeholder', 'title', 'content'];
    let exact = null;
    let patterns = null;

    function escapePattern(value) {
      return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    function buildIndex() {
      const pt = window.DD_I18N_DICTIONARIES['pt-BR'] || {};
      exact = new Map();
      patterns = [];
      Object.keys(pt).forEach(function (key) {
        if (key.indexOf('classified.') !== 0 || typeof pt[key] !== 'string') return;
        const sourceText = pt[key];
        if (!/\{[\w.-]+\}/.test(sourceText)) {
          exact.set(sourceText, key);
          return;
        }
        const names = [];
        let cursor = 0;
        let expression = '^';
        sourceText.replace(/\{([\w.-]+)\}/g, function (match, name, offset) {
          expression += escapePattern(sourceText.slice(cursor, offset)) + '(.+?)';
          names.push(name);
          cursor = offset + match.length;
          return match;
        });
        expression += escapePattern(sourceText.slice(cursor)) + '$';
        patterns.push({ key: key, names: names, expression: new RegExp(expression) });
      });
    }

    function translateSource(value) {
      if (typeof value !== 'string' || !value) return value;
      if (!exact) buildIndex();
      const key = exact.get(value);
      if (key && window.DoomsdayI18n) return window.DoomsdayI18n.t(key);
      for (let index = 0; index < patterns.length; index += 1) {
        const pattern = patterns[index];
        const match = value.match(pattern.expression);
        if (!match) continue;
        const variables = {};
        pattern.names.forEach(function (name, variableIndex) { variables[name] = match[variableIndex + 1]; });
        return window.DoomsdayI18n ? window.DoomsdayI18n.t(pattern.key, variables) : value;
      }
      return value;
    }

    function translateDataInPlace(value, seen) {
      if (typeof value === 'string') return translateSource(value);
      if (!value || typeof value !== 'object') return value;
      const visited = seen || new WeakSet();
      if (visited.has(value)) return value;
      visited.add(value);
      Object.keys(value).forEach(function (key) {
        const current = value[key];
        value[key] = typeof current === 'string' ? translateSource(current) : translateDataInPlace(current, visited);
      });
      return value;
    }

    function translateTextNode(node) {
      if (!node || !node.parentElement || node.parentElement.closest('script,style,noscript,template')) return;
      const original = node.nodeValue;
      const trimmed = original.trim();
      if (!trimmed) return;
      const translated = translateSource(trimmed);
      if (translated !== trimmed) node.nodeValue = original.replace(trimmed, translated);
    }

    function translateElement(element) {
      if (!element || element.nodeType !== 1 || element.matches('script,style,noscript,template')) return;
      attributes.forEach(function (attribute) {
        if (!element.hasAttribute(attribute)) return;
        const original = element.getAttribute(attribute);
        const translated = translateSource(original);
        if (translated !== original) element.setAttribute(attribute, translated);
      });
      Array.from(element.childNodes).forEach(function (node) {
        if (node.nodeType === Node.TEXT_NODE) translateTextNode(node);
      });
      element.querySelectorAll('*').forEach(function (child) {
        if (child.matches('script,style,noscript,template')) return;
        attributes.forEach(function (attribute) {
          if (!child.hasAttribute(attribute)) return;
          const original = child.getAttribute(attribute);
          const translated = translateSource(original);
          if (translated !== original) child.setAttribute(attribute, translated);
        });
        Array.from(child.childNodes).forEach(function (node) {
          if (node.nodeType === Node.TEXT_NODE) translateTextNode(node);
        });
      });
    }

    function translated(key) {
      return window.DoomsdayI18n ? window.DoomsdayI18n.t(key) : key;
    }

    function setPseudoLabels() {
      [
        ['.lab-map', 'data-blueprint-label', 'classified.doom.facility.blueprint'],
        ['.containment-chamber', 'data-label', 'classified.doom.facility.chamber'],
        ['.sample-rack', 'data-label', 'classified.doom.facility.samples'],
        ['.threat-mode-original nav .logo, nav .logo', 'data-threat-original-label', 'classified.threat.css.civil'],
        ['.threat-hero', 'data-threat-dossier-label', 'classified.threat.css.independent'],
        ['nav .logo', 'data-threat-analog-label', 'classified.threat.css.transmission'],
        ['.threat-atmosphere', 'data-field-warning', 'classified.threat.css.fieldSignal'],
        ['.morgue-map', 'data-chamber-label', 'classified.threat.css.chamber']
      ].forEach(function (entry) {
        document.querySelectorAll(entry[0]).forEach(function (element) {
          element.setAttribute(entry[1], translated(entry[2]));
        });
      });
      document.documentElement.style.setProperty('--classified-archived-label', '"' + translated('classified.threat.css.archived').replace(/"/g, '\\"') + '"');
      document.documentElement.style.setProperty('--classified-confirmed-label', '"' + translated('classified.threat.css.confirmed').replace(/"/g, '\\"') + '"');
    }

    function install() {
      if (!window.DoomsdayI18n || !document.body) return;
      translateElement(document.documentElement);
      setPseudoLabels();
      const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          if (mutation.type === 'characterData') translateTextNode(mutation.target);
          mutation.addedNodes.forEach(function (node) {
            if (node.nodeType === Node.TEXT_NODE) translateTextNode(node);
            else if (node.nodeType === Node.ELEMENT_NODE) translateElement(node);
          });
          if (mutation.type === 'attributes') translateElement(mutation.target);
        });
      });
      observer.observe(document.body, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: attributes });
    }

    window.DoomsdayClassified = Object.freeze({
      translateSource: translateSource,
      translateDataInPlace: translateDataInPlace,
      install: install
    });
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', install, { once: true });
    else install();
  }
})();
