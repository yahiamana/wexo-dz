
type RateLimitMap = Map<string, { count: number; lastReset: number }>

const rateLimits: RateLimitMap = new Map()

export function rateLimit(ip: string, limit: number = 5, windowMs: number = 60000): boolean {
  const now = Date.now()
  const record = rateLimits.get(ip) || { count: 0, lastReset: now }

  if (now - record.lastReset > windowMs) {
    record.count = 0
    record.lastReset = now
  }

  record.count++
  rateLimits.set(ip, record)

  return record.count <= limit
}

// Cleanup interval (every 5 mins)
setInterval(() => {
  const now = Date.now()
  for (const [key, value] of rateLimits.entries()) {
    if (now - value.lastReset > 60000 * 5) { // Clear if older than 5 mins
      rateLimits.delete(key)
    }
  }
}, 300000)
