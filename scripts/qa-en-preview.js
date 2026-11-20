#!/usr/bin/env node
'use strict';

const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const ROOT = path.resolve(__dirname, '..');
const PREVIEW = path.join(ROOT, 'en-preview');
const PAGES = ['index.html', 'home.html', 'transicao-extincao.html', 'historia.html', 'personagens.html', 'personagem.html', 'ameaca.html', 'projeto-doom.html', 'galeria.html', 'protocolos.html', 'simulacao.html', 'frequencia-morta.html', 'evidencias.html', 'acesso-restrito.html'];
const MODULES = ['personnel', 'gallery', 'classified', 'simulation', 'protocols', 'frequency'];
const INTRO_REQUIRED_IDS = ['start-gate', 'bg-audio', 'testimony-line', 'title-wrap', 'movie-title', 'age-prefix', 'movie-tagline', 'blood-wipe', 'enter-prompt'];

function fail(message) {
  throw new Error(message);
}

function read(file) {
  return fs.readFileSync(file, 'utf8');
}

function localPathFromReference(reference) {
  const pathname = reference.split(/[?#]/)[0];
  try {
    return decodeURIComponent(pathname);
  } catch {
    return pathname;
  }
}

function assertIntroContract(html, label) {
  INTRO_REQUIRED_IDS.forEach(function (id) {
    const matches = html.match(new RegExp(`\\bid=["']${id}["']`, 'g')) || [];
    if (matches.length !== 1) fail(`${label}: expected exactly one #${id}, found ${matches.length}.`);
  });
}

function dictionary(locale) {
  const sandbox = { window: {} };
  sandbox.window.window = sandbox.window;
  vm.runInNewContext(read(path.join(ROOT, 'i18n', `${locale}.js`)), sandbox);
  return sandbox.window.DD_I18N_DICTIONARIES[locale];
}

function extendDictionary(target, moduleName, locale) {
  const file = path.join(ROOT, 'i18n', `${moduleName}-${locale}.js`);
  if (!fs.existsSync(file)) fail(`Missing dictionary module: ${path.basename(file)}`);
  const sandbox = { window: { DD_I18N_DICTIONARIES: {} } };
  sandbox.window.window = sandbox.window;
  sandbox.window.DD_I18N_DICTIONARIES[locale] = Object.assign({}, target);
  vm.runInNewContext(read(file), sandbox);
  return sandbox.window.DD_I18N_DICTIONARIES[locale];
}

let pt = dictionary('pt-BR');
let en = dictionary('en');
MODULES.forEach(function (moduleName) {
  pt = extendDictionary(pt, moduleName, 'pt-BR');
  en = extendDictionary(en, moduleName, 'en');
});
const ptKeys = Object.keys(pt).sort();
const enKeys = Object.keys(en).sort();
if (JSON.stringify(ptKeys) !== JSON.stringify(enKeys)) fail('PT/EN dictionaries do not have key parity.');

const untranslatedPages = [];
let bindingCount = 0;
let resourceCount = 0;

if (fs.existsSync(path.join(PREVIEW, 'pending.html'))) {
  fail('Stale provisional route found: en-preview/pending.html');
}

assertIntroContract(read(path.join(ROOT, 'index.html')), 'index.html');
assertIntroContract(read(path.join(PREVIEW, 'index.html')), 'en-preview/index.html');

PAGES.forEach(function (page) {
  const file = path.join(PREVIEW, page);
  if (!fs.existsSync(file)) fail(`Missing preview page: ${page}`);
  const html = read(file);
  if (!/<html\b[^>]*lang="en"/i.test(html)) fail(`${page}: lang=en missing.`);
  if (!/<html\b[^>]*data-locale-lock="en"/i.test(html)) fail(`${page}: locale lock missing.`);
  if (!/<html\b[^>]*data-i18n-ready="full"/i.test(html)) fail(`${page}: full i18n marker missing.`);
  if (!/<meta\s+name="robots"\s+content="noindex,nofollow"/i.test(html)) fail(`${page}: preview robots guard missing.`);
  if (!/<base\s+href="\.\.\/">/i.test(html)) fail(`${page}: shared asset base missing.`);
  if (/pending\.html/i.test(html)) fail(`${page}: provisional route reference found.`);

  const keys = [];
  for (const match of html.matchAll(/data-i18n="([^"]+)"/g)) keys.push(match[1]);
  for (const match of html.matchAll(/data-i18n-attr="([^"]+)"/g)) {
    match[1].split(';').forEach(function (binding) {
      const separator = binding.indexOf(':');
      if (separator > 0) keys.push(binding.slice(separator + 1).trim());
    });
  }
  keys.forEach(function (key) {
    if (!Object.prototype.hasOwnProperty.call(en, key)) fail(`${page}: missing English key ${key}`);
  });
  bindingCount += keys.length;

  untranslatedPages.forEach(function (target) {
    const direct = new RegExp(`(["'])${target.replace('.', '\\.')}([?#]|\\1)`, 'i');
    if (direct.test(html)) fail(`${page}: direct link to untranslated ${target}`);
  });

  for (const match of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
    const reference = match[1];
    if (reference.includes('${')) continue;
    if (/^(?:https?:|data:|mailto:|tel:|#)/i.test(reference)) continue;
    if (reference.startsWith('en-preview/')) {
      const clean = localPathFromReference(reference);
      if (!fs.existsSync(path.join(ROOT, clean))) fail(`${page}: missing preview target ${clean}`);
      resourceCount++;
      continue;
    }
    const clean = localPathFromReference(reference);
    if (!clean || clean === '..' || clean === '../') continue;
    if (!fs.existsSync(path.join(ROOT, clean))) fail(`${page}: missing shared resource ${clean}`);
    resourceCount++;
  }
});

console.log(`English preview QA: ${PAGES.length} pages, ${bindingCount} i18n bindings, ${resourceCount} local references, ${enKeys.length} dictionary keys.`);
