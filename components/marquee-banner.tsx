"use client"

export function MarqueeBanner() {
  const words = ["COOKIES", "CAKES", "PUDDING", "CORPORATE CATERING", "PARTIES", "EVENTS", "ORDER NOW"]
  const repeatedWords = [...words, ...words, ...words, ...words]

  return (
    <div className="bg-primary text-primary-foreground py-4 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {repeatedWords.map((word, index) => (
          <span key={index} className="mx-8 text-sm font-bold uppercase tracking-[0.3em]">
            {word} <span className="mx-4">•</span>
          </span>
        ))}
      </div>
    </div>
  )
}
