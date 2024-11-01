export function formatTimestamp(timestamp: number) {
  return timestamp ? new Date(timestamp * 1000).toISOString() : null
}
