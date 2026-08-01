(function () {
  'use strict';

  const STORAGE_KEY = 'dd_locale_v1';
  const DEFAULT_LOCALE = 'pt-BR';
  const SUPPORTED_LOCALES = ['pt-BR', 'en'];

  function normalizeLocale(value) {
    if (!value) return null;
    const candidate = String(value).trim().toLowerCase();
    if (candidate === 'pt-br' || candidate === 'pt') return 'pt-BR';
    if (candidate === 'en' || candidate === 'en-us' || candidate === 'en-gb') return 'en';
    return null;
  }

  function storedLocale() {
    try {
      return normalizeLocale(localStorage.getItem(STORAGE_KEY));
    } catch (error) {
      return null;
    }
  }

  function queryLocale() {
    try {
      return normalizeLocale(new URLSearchParams(location.search).get('lang'));
    } catch (error) {
      return null;
    }
  }

  const requestedLocale = queryLocale();
  let locale = requestedLocale || storedLocale() || DEFAULT_LOCALE;
  if (requestedLocale) {
    try {
      localStorage.setItem(STORAGE_KEY, requestedLocale);
    } catch (error) {}
  }
  document.documentElement.lang = locale;

  function dictionaries() {
    return window.DD_I18N_DICTIONARIES || {};
  }

  function interpolate(value, variables) {
    if (!variables || typeof value !== 'string') return value;
    return value.replace(/\{([\w.-]+)\}/g, function (match, key) {
      return Object.prototype.hasOwnProperty.call(variables, key) ? String(variables[key]) : match;
    });
  }

  function t(key, variables) {
    const active = dictionaries()[locale] || {};
    const fallback = dictionaries()[DEFAULT_LOCALE] || {};
    const value = Object.prototype.hasOwnProperty.call(active, key)
      ? active[key]
      : Object.prototype.hasOwnProperty.call(fallback, key)
        ? fallback[key]
        : key;
    return interpolate(value, variables);
  }

  function applyAttributeBindings(element) {
    const bindings = element.getAttribute('data-i18n-attr');
    if (!bindings) return;
    bindings.split(';').forEach(function (binding) {
      const separator = binding.indexOf(':');
      if (separator < 1) return;
      const attribute = binding.slice(0, separator).trim();
      const key = binding.slice(separator + 1).trim();
      if (attribute && key) element.setAttribute(attribute, t(key));
    });
  }

  function apply(root) {
    const scope = root && root.querySelectorAll ? root : document;
    const textElements = [];
    const attributeElements = [];

    if (scope.nodeType === 1 && scope.matches('[data-i18n]')) textElements.push(scope);
    if (scope.nodeType === 1 && scope.matches('[data-i18n-attr]')) attributeElements.push(scope);
    textElements.push.apply(textElements, scope.querySelectorAll('[data-i18n]'));
    attributeElements.push.apply(attributeElements, scope.querySelectorAll('[data-i18n-attr]'));

    textElements.forEach(function (element) {
      element.textContent = t(element.getAttribute('data-i18n'));
    });
    attributeElements.forEach(applyAttributeBindings);
    document.documentElement.lang = locale;
    return scope;
  }

  function localeUrl(nextLocale) {
    try {
      const url = new URL(location.href);
      url.searchParams.set('lang', nextLocale);
      return url.href;
    } catch (error) {
      return location.href;
    }
  }

  function setLocale(nextLocale, options) {
    const next = normalizeLocale(nextLocale);
    if (!next || !SUPPORTED_LOCALES.includes(next)) return false;
    const settings = Object.assign({ reload: true }, options);
    const previous = locale;
    locale = next;
    document.documentElement.lang = next;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch (error) {}

    const detail = { locale: next, previousLocale: previous };
    document.dispatchEvent(new CustomEvent('dd:locale-change', { detail: detail }));

    if (settings.reload) {
      location.assign(localeUrl(next));
    } else {
      try {
        history.replaceState(history.state, '', localeUrl(next));
      } catch (error) {}
      apply(document);
    }
    return true;
  }

  const api = {
    STORAGE_KEY: STORAGE_KEY,
    DEFAULT_LOCALE: DEFAULT_LOCALE,
    supportedLocales: SUPPORTED_LOCALES.slice(),
    get locale() { return locale; },
    t: t,
    apply: apply,
    setLocale: setLocale,
    normalizeLocale: normalizeLocale
  };

  window.DoomsdayI18n = api;
  window.ddT = t;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { apply(document); }, { once: true });
  } else {
    apply(document);
  }
})();
