import { useNavigate } from 'react-router-dom'

const MOCK = {
  title: "Turkey's Internet Censorship Crisis: What Big Tech Won't Tell You",
  subtitle: 'Over 400,000 websites remain blocked. Journalists face prosecution for simply reporting facts.',
  author: 'ahmet.k',
  address: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b',
  tags: ['Journalism', 'Censorship'],
  readTime: 8,
  date: 'March 27, 2026',
  txHash: '0x214c59c6925bd2d81b4eb5ade4f0dd38359a320f435c42c13efbf02b1a07c33d',
  content: `In the early hours of March 15th, journalist Deniz Yıldız received a text message she had been dreading for months. Her publication had been blocked — again. This time, permanently. The order came without warning, without appeal, without explanation.

Turkey now blocks more websites than any other country in Europe. Over 400,000 URLs are inaccessible without a VPN. Social media platforms have been throttled, news sites shuttered, and journalists arrested for doing their jobs.

## The infrastructure of silence

What makes Turkey's censorship particularly effective is its invisibility. Most users don't even realize a site is blocked — they simply see an error page. The government rarely explains its decisions.

> "We had to find a way to publish where they couldn't follow us. The blockchain was the only answer."

This is why platforms like Onchain Press exist. When a government can delete a website with a single phone call, the only resilient alternative is infrastructure no authority controls.

## Who pays the price

The journalists who pay the highest price are often those covering the stories the government most wants suppressed. Corruption, human rights abuses, minority rights — these are the topics that lead to blocked sites and criminal charges.

## The blockchain alternative

Decentralized publishing doesn't just solve the technical problem. It changes the power dynamic entirely. When content is stored on a blockchain, the question of who gave you permission to publish becomes meaningless.`
}

const renderContent = (content: string) =>
  content.split('\n').map((line, i) => {
    if (line.startsWith('## '))
      return <h2 key={i} style={{ fontFamily: 'Georgia, serif', fontSize: 30, fontWeight: 400, lineHeight: 1.25, margin: '48px 0 20px', letterSpacing: '-0.015em', color: '#0f0f0f' }}>{line.slice(3)}</h2>
    if (line.startsWith('> '))
      return (
        <blockquote key={i} style={{ borderLeft: '2px solid #0f0f0f', paddingLeft: 24, margin: '36px 0' }}>
          <p style={{ fontFamily: 'Georgia, serif', fontSize: 24, fontStyle: 'italic', color: '#666', marginBottom: 0, lineHeight: 1.5 }}>{line.slice(2)}</p>
        </blockquote>
      )
    if (line.trim() === '') return <div key={i} style={{ height: 8 }} />
    return <p key={i} style={{ fontFamily: 'Georgia, serif', fontSize: 20, lineHeight: 1.85, color: '#0f0f0f', marginBottom: 28 }}>{line}</p>
  })

const ActionBtn = ({ icon, label }: { icon: React.ReactNode, label: string }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
    <div style={{ width: 44, height: 44, borderRadius: '50%', border: '1px solid rgba(0,0,0,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666', background: '#f5f4ef' }}>
      {icon}
    </div>
    <span style={{ fontSize: 11, color: '#999' }}>{label}</span>
  </div>
)

export default function Article() {
  const navigate = useNavigate()
  const shortAddr = `${MOCK.address.slice(0, 6)}...${MOCK.address.slice(-4)}`

  return (
    <div style={{ background: '#f5f4ef', minHeight: '100vh' }}>
      {/* Progress bar */}
      <div style={{ height: 2, background: 'rgba(0,0,0,0.06)' }}>
        <div style={{ height: '100%', width: '38%', background: '#0f0f0f', borderRadius: 1 }} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '64px 1fr 300px', maxWidth: 1100, margin: '0 auto' }}>

        {/* Left action bar */}
        <div style={{ padding: '56px 0 0 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, position: 'sticky', top: 80, alignSelf: 'start' }}>
          <ActionBtn label="248" icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>} />
          <ActionBtn label="34" icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>} />
          <ActionBtn label="Share" icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>} />
          <ActionBtn label="Save" icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>} />
        </div>

        {/* Article */}
        <div style={{ padding: '56px 56px 56px 32px', borderRight: '1px solid rgba(0,0,0,0.08)' }}>
          {/* Tags */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
            {MOCK.tags.map(t => (
              <span key={t} style={{ fontSize: 12, padding: '4px 12px', borderRadius: 100, border: '1px solid rgba(0,0,0,0.12)', color: '#666' }}>{t}</span>
            ))}
            <span style={{ fontSize: 12, padding: '4px 12px', borderRadius: 100, color: '#22c55e', border: '1px solid rgba(34,197,94,0.3)', background: 'rgba(34,197,94,0.08)', display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />On-chain
            </span>
          </div>

          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 48, fontWeight: 400, lineHeight: 1.08, letterSpacing: '-0.025em', marginBottom: 20, color: '#0f0f0f' }}>{MOCK.title}</h1>
          <p style={{ fontFamily: 'Georgia, serif', fontSize: 22, fontWeight: 400, color: '#666', lineHeight: 1.55, marginBottom: 36 }}>{MOCK.subtitle}</p>

          {/* Byline */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 0', borderTop: '1px solid rgba(0,0,0,0.08)', borderBottom: '1px solid rgba(0,0,0,0.08)', marginBottom: 44 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 42, height: 42, borderRadius: '50%', background: '#eeeee9', border: '1px solid rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 600, color: '#666' }}>AK</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#0f0f0f' }}>{MOCK.author}</div>
                <div style={{ fontSize: 11, color: '#999', fontFamily: 'monospace' }}>{shortAddr}</div>
              </div>
              <div style={{ fontSize: 13, color: '#999', marginLeft: 4 }}>· {MOCK.readTime} min read · {MOCK.date}</div>
            </div>
            <button style={{ fontSize: 13, padding: '7px 18px', borderRadius: 100, border: '1px solid rgba(0,0,0,0.15)', color: '#555', background: 'transparent', cursor: 'pointer' }}>Follow</button>
          </div>

          {/* Cover image */}
          <div style={{ width: '100%', height: 360, borderRadius: 16, background: '#eeeee9', border: '1px solid rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 48 }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>
          </div>

          {/* Content */}
          <div>{renderContent(MOCK.content)}</div>

          {/* On-chain verification */}
          <div style={{ marginTop: 56, paddingTop: 40, borderTop: '1px solid rgba(0,0,0,0.08)' }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#999', marginBottom: 18 }}>On-chain verification</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[
                { key: 'Transaction', val: `${MOCK.txHash.slice(0, 10)}...${MOCK.txHash.slice(-4)}` },
                { key: 'Network', val: 'Shelbynet · Live', green: true },
                { key: 'Published', val: MOCK.date },
                { key: 'Storage', val: 'Shelby Blob · Permanent' },
              ].map(({ key, val, green }) => (
                <div key={key} style={{ background: '#eeeee9', borderRadius: 12, padding: '14px 18px', border: '1px solid rgba(0,0,0,0.06)' }}>
                  <div style={{ fontSize: 11, color: '#999', marginBottom: 6 }}>{key}</div>
                  <div style={{ fontSize: 13, fontFamily: 'monospace', color: green ? '#22c55e' : '#555', wordBreak: 'break-all' }}>{val}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ padding: '56px 36px' }}>
          {/* Table of contents */}
          <div style={{ marginBottom: 36 }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#999', marginBottom: 16 }}>In this article</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {['The infrastructure of silence', 'Who pays the price', 'The blockchain alternative', 'What comes next'].map((item, i) => (
                <div key={i} style={{ fontSize: 14, color: i === 0 ? '#0f0f0f' : '#888', cursor: 'pointer', lineHeight: 1.4, padding: '8px 12px', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 10, background: i === 0 ? '#eeeee9' : 'transparent' }}>
                  <span style={{ width: 2, height: 16, borderRadius: 1, background: i === 0 ? '#0f0f0f' : 'rgba(0,0,0,0.15)', flexShrink: 0 }} />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* More articles */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#999', marginBottom: 16 }}>More from {MOCK.author}</div>
            <div>
              {[
                { tag: 'Press Freedom', title: 'The Journalists Who Keep Publishing From Exile', meta: '6 min read · 3 days ago' },
                { tag: 'Web3', title: 'Why Decentralized Media Is the Future of Journalism', meta: '10 min read · 1 week ago' },
                { tag: 'Investigation', title: "Inside Turkey's Internet Blackout Infrastructure", meta: '14 min read · 2 weeks ago' },
              ].map(({ tag, title, meta }, i) => (
                <div key={i} style={{ padding: '18px 0', borderBottom: i < 2 ? '1px solid rgba(0,0,0,0.08)' : 'none', cursor: 'pointer' }}>
                  <div style={{ fontSize: 10, color: '#999', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 7 }}>{tag}</div>
                  <div style={{ fontSize: 14, lineHeight: 1.4, marginBottom: 6, color: '#0f0f0f', fontFamily: 'Georgia, serif' }}>{title}</div>
                  <div style={{ fontSize: 12, color: '#999' }}>{meta}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}