import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const BG = '#f0ede6'
const BG2 = '#e8e4dc'
const BORDER = '1px solid rgba(0,0,0,0.09)'
const TEXT = '#0f0f0f'
const MUTED = '#888'
const HINT = '#bbb'
const GREEN = '#22c55e'

const ARTICLES = [
  { id: '1', title: "Turkey's Internet Censorship Crisis: What Big Tech Won't Tell You", subtitle: 'Over 400,000 websites remain blocked. Journalists face prosecution for simply reporting facts.', author: 'ahmet.k', address: '0x1a2b...3c4d', initials: 'Ak', tags: ['Journalism', 'Censorship'], time: '5h ago', readTime: 8 },
  { id: '2', title: 'The Activists They Tried to Silence: Stories from 12 Countries', subtitle: 'When governments shut down the press, where do you publish?', author: 'm.rodriguez', address: '0x9f8e...7d6c', initials: 'Mr', tags: ['Human Rights'], time: '5h ago', readTime: 12 },
  { id: '3', title: 'How Blockchain Became the Last Free Press', subtitle: 'From Minsk to Tehran, decentralized publishing is becoming the only option.', author: 'l.petrov', address: '0x5b4a...2e1f', initials: 'Lp', tags: ['Web3', 'Press Freedom'], time: 'Yesterday', readTime: 6 },
  { id: '4', title: "Inside the Newsrooms That Can't Be Shut Down", subtitle: 'A new generation of journalists is building infrastructure that authoritarian governments cannot touch.', author: 's.kim', address: '0x3d2c...1b0a', initials: 'Sk', tags: ['Journalism'], time: '2 days ago', readTime: 9 },
  { id: '5', title: 'The Disappearing Archives: When Platforms Delete History', subtitle: 'Thousands of articles vanish every year. On-chain storage is the only permanent record.', author: 'n.hassan', address: '0x7e6d...5c4b', initials: 'Nh', tags: ['Web3', 'Journalism'], time: '3 days ago', readTime: 5 },
  { id: '6', title: 'Decentralized Identity and the Future of Anonymous Reporting', subtitle: 'How wallet-based authorship protects whistleblowers while ensuring accountability.', author: 'a.chen', address: '0x2f1e...0d9c', initials: 'Ac', tags: ['Web3', 'Human Rights'], time: '4 days ago', readTime: 7 },
]

const ALL_TAGS = ['All', 'Journalism', 'Human Rights', 'Web3', 'Censorship', 'Press Freedom']

const Tag = ({ label }: { label: string }) => (
  <span style={{ fontSize: 12, padding: '4px 12px', borderRadius: 100, border: BORDER, color: MUTED, whiteSpace: 'nowrap' as const }}>{label}</span>
)

const Avatar = ({ initials }: { initials: string }) => (
  <div style={{ width: 30, height: 30, borderRadius: '50%', background: BG2, border: BORDER, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 600, color: MUTED, flexShrink: 0 }}>{initials}</div>
)

const OnChain = () => (
  <span style={{ fontSize: 11, padding: '3px 9px', borderRadius: 100, color: GREEN, background: 'rgba(34,197,94,0.1)', display: 'inline-flex', alignItems: 'center', gap: 4, whiteSpace: 'nowrap' as const }}>
    <span style={{ width: 5, height: 5, borderRadius: '50%', background: GREEN, display: 'inline-block' }} />on-chain
  </span>
)

export default function Latest() {
  const [activeTag, setActiveTag] = useState('All')
  const navigate = useNavigate()

  const filtered = activeTag === 'All' ? ARTICLES : ARTICLES.filter(a => a.tags.includes(activeTag))

  return (
    <div style={{ background: BG, minHeight: '100vh' }}>
      <div style={{ padding: '48px 56px 24px', borderBottom: BORDER }}>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 48, fontWeight: 400, letterSpacing: '-0.02em', color: TEXT, marginBottom: 8 }}>Latest</h1>
        <p style={{ fontSize: 15, color: MUTED }}>The most recent articles published on-chain.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px' }}>
        <div style={{ borderRight: BORDER }}>
          {/* Filter bar */}
          <div style={{ display: 'flex', gap: 4, padding: '20px 56px', borderBottom: BORDER, flexWrap: 'wrap' as const }}>
            {ALL_TAGS.map(tag => (
              <span
                key={tag}
                onClick={() => setActiveTag(tag)}
                style={{
                  fontSize: 13, padding: '6px 16px', borderRadius: 100, cursor: 'pointer',
                  color: activeTag === tag ? TEXT : MUTED,
                  border: activeTag === tag ? BORDER : '1px solid transparent',
                  background: activeTag === tag ? BG2 : 'transparent',
                  fontWeight: activeTag === tag ? 600 : 400,
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Articles */}
          {filtered.map(a => (
            <div
              key={a.id}
              onClick={() => navigate(`/article/${a.author}/${a.id}`)}
              style={{ padding: '32px 56px', borderBottom: BORDER, display: 'grid', gridTemplateColumns: '1fr 80px', gap: 24, cursor: 'pointer' }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14, flexWrap: 'wrap' as const }}>
                  {a.tags.map(t => <Tag key={t} label={t} />)}
                  <span style={{ fontSize: 12, color: HINT }}>{a.time}</span>
                </div>
                <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 22, fontWeight: 400, lineHeight: 1.3, color: TEXT, marginBottom: 10, letterSpacing: '-0.01em' }}>{a.title}</h3>
                <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.65, marginBottom: 20 }}>{a.subtitle}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Avatar initials={a.initials} />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: TEXT }}>{a.author}</div>
                    <div style={{ fontSize: 11, color: HINT, fontFamily: 'monospace' }}>{a.address}</div>
                  </div>
                  <OnChain />
                  <span style={{ fontSize: 12, color: HINT }}>{a.readTime} min read</span>
                </div>
              </div>
              <div style={{ width: 80, height: 80, borderRadius: 12, background: BG2, border: BORDER, alignSelf: 'start', marginTop: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <div style={{ padding: '28px 32px' }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: HINT, marginBottom: 14 }}>Network Status</div>
          <div style={{ background: BG2, borderRadius: 12, padding: '16px 18px', border: BORDER, marginBottom: 32 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: TEXT }}>Shelbynet</span>
              <span style={{ fontSize: 11, color: GREEN, display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: GREEN, display: 'inline-block' }} />Live
              </span>
            </div>
            <div style={{ fontSize: 12, color: HINT }}>Aptos Testnet · Block #4,821,033</div>
          </div>

          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: HINT, marginBottom: 14 }}>Stats</div>
          <div style={{ background: BG2, borderRadius: 12, border: BORDER }}>
            {[
              { label: 'Total articles', val: '1,284' },
              { label: 'Published today', val: '23' },
              { label: 'Active writers', val: '347' },
            ].map(({ label, val }, i) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', borderBottom: i < 2 ? BORDER : 'none' }}>
                <span style={{ fontSize: 12, color: HINT }}>{label}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: TEXT }}>{val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}