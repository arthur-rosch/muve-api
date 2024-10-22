export const getVideoThumbnail = (url: string): string | null => {
  const youtubeMatch = url.match(
    /(?:youtube\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
  )

  if (youtubeMatch && youtubeMatch[1]) {
    const videoId = youtubeMatch[1]
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
  }

  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/)

  if (vimeoMatch && vimeoMatch[1]) {
    const videoId = vimeoMatch[1]
    return `https://vumbnail.com/${videoId}.jpg`
  }
  return null
}
