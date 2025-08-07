export default function handler(req, res) {
  const ua = req.headers['user-agent'] || '';
  const cookies = req.headers['cookie'] || '';
  const referer = req.headers['referer'] || '';
  const accept = req.headers['accept'] || '';
  const lang = req.headers['accept-language'] || '';

  console.log("DEBUG HEADERS:");
  console.log("User-Agent:", ua);
  console.log("Cookie:", cookies);
  console.log("Referer:", referer);
  console.log("Accept:", accept);
  console.log("Accept-Language:", lang);

  const suspiciousUA = ["bot", "crawl", "spider", "headless", "scrapy", "python", "curl"];

  if (suspiciousUA.some(term => ua.toLowerCase().includes(term.toLowerCase()))) {
    console.log("Block reason: ua_bot");
    return res.redirect(302, "https://example.com/blocked.html?reason=ua_bot");
  }
  if (!cookies || cookies.trim() === "") {
    console.log("Block reason: no_cookie");
    return res.redirect(302, "https://example.com/blocked.html?reason=no_cookie");
  }
  if (!referer || referer.length < 5) {
    console.log("Block reason: no_referer");
    return res.redirect(302, "https://example.com/blocked.html?reason=no_referer");
  }
  if (!accept.includes("text/html")) {
    console.log("Block reason: bad_accept");
    return res.redirect(302, "https://example.com/blocked.html?reason=bad_accept");
  }
  if (!(lang.includes("en") || lang.includes("bn"))) {
    console.log("Block reason: lang_mismatch");
    return res.redirect(302, "https://example.com/blocked.html?reason=lang_mismatch");
  }

  console.log("Passed all checks. Redirecting to offer.");
  return res.redirect(302, "https://your-cpa-offer.com");
}
