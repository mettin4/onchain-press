import { useNavigate } from 'react-router-dom'

const BG = '#f0ede6'
const BG2 = '#e8e4dc'
const BORDER = '1px solid rgba(0,0,0,0.09)'
const TEXT = '#0f0f0f'
const MUTED = '#888'
const HINT = '#bbb'
const GREEN = '#22c55e'

const TOPICS = [
  { slug: 'journalism', label: 'Journalism', count: 412, desc: 'Investigative reporting, press freedom, and the future of independent media.', color: '#f59e0b' },
  { slug: 'human-rights', label: 'Human Rights', count: 287, desc: 'Stories of resistance, activism, and the fight for civil liberties worldwide.', color: '#ef4444' },
  { slug: 'web3', label: 'Web3', count: 341, desc: 'Decentralized technology, blockchain, and the open internet.', color: '#8b5cf6' },
  { slug: 'censorship', label: 'Censorship', count: 198, desc: 'Documenting internet censorship, content removal, and surveillance.', color: '#0f0f0f' },
  { slug: 'press-freedom', label: 'Press Freedom', count: 156, desc: 'The state of press freedom across the globe and those fighting to protect it.', color: '#22c55e' },
  { slug: 'whistleblowing', label: 'Whistleblowing', count: 94, desc: 'First-hand accounts and analysis of whistleblowers and their impact.', color: '#3b82f6' },
  { slug: 'surveillance', label: 'Surveillance', count: 112, desc: 'State and corporate surveillance programs and privacy rights.', color: '#64748b' },
  { slug: 'open-source', label: 'Open Source', count: 203, desc: 'The open source movement, software freedom, and collaborative development.', color: '#10b981' },
]

export default function Topics() {
  const navigate = useNavigate()

  return (
    <div style={{ background: BG, minHeight: '100vh' }}>
      <div style={{ padding: '48px 56px 24px', borderBottom: BORDER }}>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 48, fontWeight: 400, letterSpacing: '-0.02em', color: TEXT, marginBottom: 8 }}>Topics</h1>
        <p style={{ fontSize: 15, color: MUTED }}>Browse articles by subject. Every topic, permanently archived on-chain.</p>
      </div>

      <div style={{ padding: '48px 56px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {TOPICS.map(topic => (
            <div
              key={topic.slug}
              onClick={() => navigate(`/latest?tag=${topic.slug}`)}
              style={{
                background: BG2,
                borderRadius: 16,
                border: BORDER,
                padding: '28px 28px 24px',
                cursor: 'pointer',
                transition: 'border-color 0.15s',
                position: 'relative' as const,
                overflow: 'hidden' as const,
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(0,0,0,0.2)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(0,0,0,0.09)')}
            >
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: topic.color, marginBottom: 18 }} />
              <div style={{ fontFamily: 'Georgia, serif', fontSize: 22, fontWeight: 400, color: TEXT, marginBottom: 8 }}>{topic.label}</div>
              <div style={{ fontSize: 13, color: MUTED, lineHeight: 1.6, marginBottom: 20 }}>{topic.desc}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 12, color: HINT }}>{topic.count} articles</span>
                <span style={{ fontSize: 12, color: MUTED }}>Browse →</span>
              </div>
            </div>
          ))}
        </div>

        {/* Featured topic */}
        <div style={{ marginTop: 48, borderTop: BORDER, paddingTop: 48 }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: HINT, marginBottom: 24 }}>Most active this week</div>
          <div style={{ display: 'flex', gap: 12 }}>
            {TOPICS.sort((a, b) => b.count - a.count).slice(0, 4).map(t => (
              <div
                key={t.slug}
                onClick={() => navigate(`/latest?tag=${t.slug}`)}
                style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 18px', borderRadius: 100, border: BORDER, background: BG2, cursor: 'pointer' }}
              >
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: t.color, display: 'inline-block' }} />
                <span style={{ fontSize: 13, color: TEXT, fontWeight: 500 }}>{t.label}</span>
                <span style={{ fontSize: 12, color: HINT }}>{t.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}