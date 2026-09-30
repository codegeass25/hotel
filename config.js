/* Harborlight deployment configuration
   GitHub Pages frontend -> Cloudflare Tunnel backend.
   Change only apiBase if your public backend hostname changes later. */
(function () {
  'use strict';
  var DEFAULT_API_BASE = 'https://hotel.mdmsportal.uk';
  var configured = (window.HOTEL_CONFIG && window.HOTEL_CONFIG.apiBase) || DEFAULT_API_BASE;
  var base = String(configured || DEFAULT_API_BASE).trim().replace(/\/+$/, '');
  window.HOTEL_API_BASE = base;
  window.hotelApiUrl = function (path) {
    var value = String(path == null ? '' : path).trim();
    if (/^https?:\/\//i.test(value)) return value;
    if (value.charAt(0) !== '/') value = '/' + value;
    return base + value;
  };
  window.hotelMediaUrl = function (value) {
    value = String(value == null ? '' : value).trim();
    if (!value || /^(?:https?:|data:|blob:)/i.test(value)) return value;
    if (value.charAt(0) !== '/') value = '/' + value;
    return base + value;
  };
})();
