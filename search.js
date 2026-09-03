const yts = require('yt-search');

module.exports = async (req, res) => {

  res.setHeader('Access-Control-Allow-Origin', '*');

  const q = req.query.q;

  if (!q) {
    return res.status(400).json({
      error: 'q (query) parameter দরকার। Example: /api/search?q=Tumi Robe Nirobe',
    });
  }

  try {

    const result = await yts(q);

    const video = result?.videos?.[0];

    if (!video) {
      return res.status(404).json({
        error: 'কোনো ফলাফল পাওয়া যায়নি',
      });
    }

    return res.status(200).json({
      title: video.title,
      url: video.url,
      videoId: video.videoId,
      seconds: video.seconds,
      timestamp: video.timestamp,
      thumbnail: video.thumbnail,
      views: video.views,
      author: video.author?.name || null,
    });

  } catch (err) {

    console.error('[SEARCH ERROR]', err);

    return res.status(500).json({
      error: err.message || 'সার্চ করতে গিয়ে error হয়েছে',
    });
  }
};
