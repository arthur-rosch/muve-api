const ytdl = require('@distube/ytdl-core')

export async function getUrlYoutube(url: string) {
  try {
    // Obter as informações do vídeo usando yt-dl-core
    const info = await await ytdl.getInfo(url)
    console.log(info)

    // Filtrando o formato MP4
    const videoFormat = info.formats.find(
      (format) => format.container === 'mp4' && format.hasVideo,
    )

    if (!videoFormat) {
      throw new Error('No suitable MP4 format found')
    }

    return videoFormat.url
  } catch (error) {
    console.error('Error fetching video URL:', error)
    throw new Error(`Failed to obtain video URL for ${url}`)
  }
}
