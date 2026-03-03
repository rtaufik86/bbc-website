import { createHash } from 'crypto'

export function hashString(val: string): string {
    if (!val) return ''
    // Normalize: lower case, remove spaces/symbols for phone
    // Phone: remove all non-digits, if starts with 0 replace with 62? Meta expects country code.
    // We assume normalized input passed in, or we normalize here.
    // Meta expects: lowercase, trim.
    return createHash('sha256').update(val.trim().toLowerCase()).digest('hex')
}
