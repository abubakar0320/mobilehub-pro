export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')   // remove special chars
    .replace(/\s+/g, '-')            // spaces → hyphens
    .replace(/-+/g, '-')             // multiple hyphens → one
    .replace(/^-|-$/g, '')           // trim hyphens
}

export function generateAliases(
  name: string,
  shortName: string,
  modelNumber: string,
  brand: string
): string[] {
  const aliases = new Set<string>()

  // Add all variations
  aliases.add(name.toLowerCase())
  aliases.add(shortName.toLowerCase())
  if (modelNumber) aliases.add(modelNumber.toLowerCase())

  // Add without brand prefix
  const withoutBrand = name.toLowerCase().replace(brand.toLowerCase(), '').trim()
  if (withoutBrand) aliases.add(withoutBrand)

  // Add common typos/shortcuts
  // "Galaxy A55" → "a55", "a 55"
  const numbers = shortName.match(/[a-z]+\s*\d+/gi) || []
  numbers.forEach(n => {
    aliases.add(n.toLowerCase().replace(/\s/g, ''))
    aliases.add(n.toLowerCase())
  })

  return Array.from(aliases).filter(a => a.length > 1)
}
