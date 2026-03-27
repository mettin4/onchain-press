import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const BG = '#f0ede6'
const BG2 = '#e8e4dc'
const BORDER = '1px solid rgba(0,0,0,0.09)'
const TEXT = '#0f0f0f'
const MUTED = '#888'
const HINT = '#bbb'
const GREEN = '#22c55e'

const WRITERS = [
  { id: '1', name: 'ahmet.k', address: '0x1a2b...3c4d', initials: 'Ak', articles: 23, followers: 1840, tags: ['Journalism', 'Censorship'], bio: 'Investigative journalist based in Istanbul. Covering press freedom in the MENA region.', joined: 'Jan 2024' },
  { id: '2', name: 'm.rodriguez', address: '0x9f8e...7d6c', initials: 'Mr', articles: 17, followers: 1230, tags: ['Human Rights'], bio: 'Human rights advocate and writer. Documenting stories from conflict zones.', joined: 'Feb 2024' },
  { id: '3', name: 'l.petrov', address: '0x5b4a...2e1f', initials: 'Lp', articles: 31, followers: 2910, tags: ['Web3', 'Press Freedom'], bio: 'Former state media journalist. Now publishing independently on-chain.', joined: 'Dec 2023' },
  { id: '4', name: 's.kim', address: '0x3d2c...1b0a', initials: 'Sk', articles: 12, followers: 780, tags: ['Journalism'], bio: 'Tech journalist exploring the intersection of democracy and decentralized systems.', joined: 'Mar 2024' },
  { id: '5', name: 'n.hassan', address: '0x7e6d...5c4b', initials: 'Nh', articles: 8, followers: 540, tags: ['Web3', 'Journalism'], bio: 'Blockchain researcher and writer. Focused on digital sovereignty.', joined: 'Apr 2024' },
  { id: '6', name: 'a.chen', address: '0x2f1e...0d9c', initials: 'Ac', articles: 19, followers: 1560, tags: ['Web3', 'Human Rights'], bio: 'Privacy researcher and activist. Writing about surveillance and resistance.', joined: 'Jan 2024' },
]

const Avatar = ({ initials, size = 44 }: { initials: string; size?: number }) => (
  <div style={{ width: size, height: size, borderRadius: '50%', background: BG2, border: BORDER, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: size * 0.28, fontWeight: 600, color: MUTED, flexShrink: 0 }}>{initials}</div>
)

const Tag = ({ label }: { label: string }) => (
  <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 100, border: BORDER, color: MUTED }}>{label}</span>
)

export default function Writers() {
  const [sort, setSort] = useState<'articles' | 'followers'>('followers')
  const navigate = useNavigate()

  const sorted = [...WRITERS].sort((a, b) => b[sort] - a[sort])

  return (
    <div style={{ background: BG, minHeight: '100vh' }}>
      <div style={{ padding: '48px 56px 24px', borderBottom: BORDER }}>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 48, fontWeight: 400, letterSpacing: '-0.02em', color: TEXT, marginBottom: 8 }}>Writers</h1>
        <p style={{ fontSize: 15, color: MUTED }}>Every author is wallet-verified. Their work lives on-chain forever.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px' }}>
        <div style={{ borderRight: BORDER }}>
          {/* Sort bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '20px 56px', borderBottom: BORDER }}>
            <span style={{ fontSize: 12, color: HINT, marginRight: 8 }}>Sort by</span>
            {(['followers', 'articles'] as const).map(s => (
              <span
                key={s}
                onClick={() => setSort(s)}
                style={{
                  fontSize: 13, padding: '6px 16px', borderRadius: 100, cursor: 'pointer',
                  color: sort === s ? TEXT : MUTED,
                  border: sort === s ? BORDER : '1px solid transparent',
                  background: sort === s ? BG2 : 'transparent',
                  fontWeight: sort === s ? 600 : 400,
                  textTransform: 'capitalize' as const,
                }}
              >
                {s}
              </span>
            ))}
          </div>

          {/* Writer list */}
          {sorted.map((w, i) => (
            <div
              key={w.id}
              style={{ padding: '28px 56px', borderBottom: BORDER, display: 'flex', gap: 20, alignItems: 'start', cursor: 'pointer' }}
              onClick={() => navigate(`/latest?author=${w.name}`)}
            >
              <span style={{ fontSize: 13, color: HINT, fontFamily: 'monospace', minWidth: 24, paddingTop: 12 }}>0{i + 1}</span>
              <Avatar initials={w.initials} size={48} />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                  <span style={{ fontSize: 16, fontWeight: 600, color: TEXT }}>{w.name}</span>
                  <span style={{ fontSize: 11, color: GREEN, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: GREEN, display: 'inline-block' }} />verified
                  </span>
                </div>
                <div style={{ fontSize: 11, color: HINT, fontFamily: 'monospace', marginBottom: 10 }}>{w.address}</div>
                <p style={{ fontSize: 13, color: MUTED, lineHeight: 1.6, marginBottom: 12 }}>{w.bio}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' as const }}>
                  {w.tags.map(t => <Tag key={t} label={t} />)}
                  <span style={{ fontSize: 12, color: HINT }}>{w.articles} articles</span>
                  <span style={{ fontSize: 12, color: HINT }}>·</span>
                  <span style={{ fontSize: 12, color: HINT }}>{w.followers.toLocaleString()} followers</span>
                  <span style={{ fontSize: 12, color: HINT }}>·</span>
                  <span style={{ fontSize: 12, color: HINT }}>Joined {w.joined}</span>
                </div>
              </div>
              <button
                onClick={e => e.stopPropagation()}
                style={{ fontSize: 12, padding: '7px 18px', borderRadius: 100, border: BORDER, color: MUTED, background: 'transparent', cursor: 'pointer', whiteSpace: 'nowrap' as const, flexShrink: 0 }}
              >
                Follow
              </button>
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <div style={{ padding: '28px 32px' }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: HINT, marginBottom: 14 }}>Community</div>
          <div style={{ background: BG2, borderRadius: 12, border: BORDER, marginBottom: 32 }}>
            {[
              { label: 'Total writers', val: '347' },
              { label: 'New this month', val: '41' },
              { label: 'Countries', val: '28' },
            ].map(({ label, val }, i) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', borderBottom: i < 2 ? BORDER : 'none' }}>
                <span style={{ fontSize: 12, color: HINT }}>{label}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: TEXT }}>{val}</span>
              </div>
            ))}
          </div>

          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: HINT, marginBottom: 14 }}>Become a writer</div>
          <div style={{ background: BG2, borderRadius: 12, border: BORDER, padding: '18px' }}>
            <p style={{ fontSize: 13, color: MUTED, lineHeight: 1.6, marginBottom: 14 }}>Connect your Petra wallet and start publishing permanently on-chain.</p>
            <button
              style={{ width: '100%', fontSize: 13, fontWeight: 600, padding: '10px', borderRadius: 10, background: TEXT, color: BG, border: 'none', cursor: 'pointer' }}
            >
              Start writing →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}