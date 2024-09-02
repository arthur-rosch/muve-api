const youtubedl = require('youtube-dl-exec')
const logger = require('progress-estimator')()

export async function getUrlYoutube(url: string) {
  try {
    const promise = youtubedl(url, {
      dumpSingleJson: true,
      noCheckCertificates: true,
      noWarnings: true,
      preferFreeFormats: true,
      addHeader: ['referer:youtube.com', 'user-agent:googlebot'],
    })

    const result = await logger(promise, `Obtaining ${url}`)
    console.log(result)

    const videoFormat = result.requested_downloads.find(
      (format) => format.ext === 'mp4',
    )

    return videoFormat.url
  } catch (error) {
    console.error('Error fetching video URL:', error)
    throw new Error(`Failed to obtain video URL for ${url}`)
  }
}
