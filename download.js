const ytdl = require('@distube/ytdl-core');

module.exports = async (req, res) => {

  res.setHeader('Access-Control-Allow-Origin', '*');

  const url = req.query.url;

  if (!url || !ytdl.validateURL(url)) {
    return res.status(400).json({
      error: 'সঠিক YouTube video url দাও। Example: /api/download?url=https://youtube.com/watch?v=XXXX',
    });
  }

  try {

    const info = await ytdl.getInfo(url);

    const audioFormats =
      info.formats.filter(
        f => f.hasAudio && !f.hasVideo
      );

    if (!audioFormats.length) {
      return res.status(404).json({
        error: 'এই ভিডিওতে audio-only format পাওয়া যায়নি',
      });
    }

    // mp4/m4a container preferred — WhatsApp audio message হিসেবে বেশি compatible
    const chosen =
      audioFormats.find(f => f.container === 'mp4') ||
      audioFormats[0];

    return res.status(200).json({
      title: info.videoDetails.title,
      seconds:
        parseInt(info.videoDetails.lengthSeconds, 10) || null,
      container: chosen.container,
      mimeType: chosen.mimeType,
      audioUrl: chosen.url,
    });

  } catch (err) {

    console.error('[DOWNLOAD ERROR]', err);

    return res.status(500).json({
      error: err.message || 'video info আনতে গিয়ে error হয়েছে',
    });
  }
};
