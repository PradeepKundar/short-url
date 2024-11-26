const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "URL Required" });
  const shortID = shortid();
  await URL.create({
    shortId: shortID,
    redirectURL: req.body.url,
    visitHistory: [],
    createdBy: req.user._id,
  });

  return res.render("home", { id: shortID });
  // return res.json({ id: shortID });
}

async function handleGetURL(req, res) {
  const shortId = req.params.shortId;
  console.log(shortId);
  const entry = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  console.log(entry);
  res.redirect(entry.redirectURL);
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });

  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = {
  handleGenerateNewShortURL,
  handleGetURL,
  handleGetAnalytics,
};
