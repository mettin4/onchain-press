import { useNavigate } from 'react-router-dom'

const BG = '#f0ede6'
const BG2 = '#e8e4dc'
const BORDER = '1px solid rgba(0,0,0,0.09)'
const TEXT = '#0f0f0f'
const MUTED = '#888'
const HINT = '#bbb'
const GREEN = '#22c55e'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div style={{ background: BG, minHeight: '100vh' }}>

      {/* HERO */}
      <div style={{ padding: '88px 56px 0', borderBottom: BORDER }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center', paddingBottom: 88, minHeight: 460 }}>
          <h1 style={{
            fontFamily: 'Georgia, serif',
            fontSize: 108,
            fontWeight: 400,
            lineHeight: 0.92,
            letterSpacing: '-0.04em',
            color: TEXT,
            margin: 0,
          }}>
            Write once.<br />Stay forever.
          </h1>
          <div style={{ paddingLeft: 80 }}>
            <p style={{ fontSize: 17, color: MUTED, lineHeight: 1.8, marginBottom: 40, maxWidth: 380 }}>
              A publishing platform built on Shelby and Aptos. Your articles live on a decentralized network — no editor, no takedown, no expiry date.
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              <button
                onClick={() => navigate('/write')}
                style={{ fontSize: 14, fontWeight: 600, padding: '13px 30px', borderRadius: 100, background: TEXT, color: BG, border: 'none', cursor: 'pointer' }}
              >
                Start writing →
              </button>
              <button
                onClick={() => navigate('/latest')}
                style={{ fontSize: 14, padding: '13px 30px', borderRadius: 100, border: BORDER, color: MUTED, background: 'transparent', cursor: 'pointer' }}
              >
                Read latest
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', borderTop: BORDER }}>
          {[
            { num: '1,284', label: 'Articles published' },
            { num: '347', label: 'Active authors' },
            { num: '28', label: 'Countries' },
            { num: '∞', label: 'Permanent storage' },
          ].map((stat, i) => (
            <div key={i} style={{ padding: '32px 0', paddingLeft: i > 0 ? 48 : 0, borderRight: i < 3 ? BORDER : 'none' }}>
              <div style={{ fontSize: 44, fontWeight: 400, letterSpacing: '-0.03em', color: TEXT, marginBottom: 6, lineHeight: 1, fontFamily: 'Georgia, serif' }}>{stat.num}</div>
              <div style={{ fontSize: 11, color: HINT, letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* WHY */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: BORDER }}>
        <div style={{ padding: '72px 56px', borderRight: BORDER }}>
          <div style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: HINT, marginBottom: 28 }}>Why on-chain</div>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 34, fontWeight: 400, lineHeight: 1.25, color: TEXT, marginBottom: 24, letterSpacing: '-0.02em' }}>
            Publishing has always had a landlord. We removed them.
          </h2>
          <p style={{ fontSize: 15, color: MUTED, lineHeight: 1.85 }}>
            Every platform you've ever published on can delete your work. They can suspend your account, change their terms, or simply shut down. Onchain Press stores your articles directly on Shelby's decentralized blob storage — once it's there, it's there.
          </p>
        </div>
        <div style={{ padding: '72px 56px' }}>
          <div style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: HINT, marginBottom: 28 }}>Who it's for</div>
          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 0 }}>
            {[
              { title: 'Journalists', desc: 'Publish investigations that can\'t be suppressed. Your byline is your wallet address — unforgeable.' },
              { title: 'Researchers', desc: 'Archive findings permanently. No journal can retract what lives on-chain.' },
              { title: 'Anyone with something to say', desc: 'You don\'t need a platform\'s permission. Connect a wallet, write, publish.' },
            ].map(({ title, desc }, i) => (
              <div key={title} style={{ display: 'flex', gap: 16, padding: '24px 0', borderBottom: i < 2 ? BORDER : 'none' }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: TEXT, marginTop: 7, flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: TEXT, marginBottom: 6 }}>{title}</div>
                  <div style={{ fontSize: 14, color: MUTED, lineHeight: 1.7 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div style={{ padding: '72px 56px', borderBottom: BORDER }}>
        <div style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: HINT, marginBottom: 56 }}>How it works</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }}>
          {[
            { n: '01', title: 'Connect wallet', desc: 'Link your Petra wallet. Your address becomes your permanent author identity on-chain.' },
            { n: '02', title: 'Write', desc: 'Use the editor to compose your article. Title, content, tags — nothing else required.' },
            { n: '03', title: 'Publish to chain', desc: 'Your article is encoded and registered on Aptos via Shelby blob storage.' },
            { n: '04', title: 'It\'s permanent', desc: 'The article lives on the network. No one — including us — can remove it.' },
          ].map(({ n, title, desc }, i) => (
            <div key={n} style={{ paddingRight: 40, paddingLeft: i > 0 ? 40 : 0, borderRight: i < 3 ? BORDER : 'none' }}>
              <div style={{ fontSize: 12, fontFamily: 'monospace', color: HINT, marginBottom: 24 }}>{n}</div>
              <div style={{ fontSize: 17, fontWeight: 600, color: TEXT, marginBottom: 12 }}>{title}</div>
              <div style={{ fontSize: 14, color: MUTED, lineHeight: 1.75 }}>{desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* BUILT ON */}
      <div style={{ padding: '48px 56px', borderBottom: BORDER }}>
        <div style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: HINT, marginBottom: 28 }}>Built on</div>
        <div style={{ display: 'flex', gap: 12 }}>
          {[
            { name: 'Shelby Protocol', desc: 'Decentralized blob storage on Aptos', dot: GREEN },
            { name: 'Aptos', desc: 'Layer 1 blockchain · Testnet', dot: '#3b82f6' },
            { name: 'Petra Wallet', desc: 'Aptos native wallet authentication', dot: '#8b5cf6' },
          ].map(({ name, desc, dot }) => (
            <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 20px', borderRadius: 12, border: BORDER, background: BG2 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: dot, flexShrink: 0, display: 'inline-block' }} />
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: TEXT }}>{name}</div>
                <div style={{ fontSize: 12, color: HINT }}>{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding: '88px 56px', display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center', borderBottom: BORDER }}>
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 56, fontWeight: 400, lineHeight: 1.1, letterSpacing: '-0.03em', color: TEXT, margin: 0 }}>
          Your words.<br />Your chain.
        </h2>
        <div style={{ paddingLeft: 80 }}>
          <p style={{ fontSize: 16, color: MUTED, lineHeight: 1.8, marginBottom: 32 }}>
            Connect your wallet and publish your first article in under two minutes. No account, no approval, no middleman.
          </p>
          <button
            onClick={() => navigate('/write')}
            style={{ fontSize: 14, fontWeight: 600, padding: '13px 32px', borderRadius: 100, background: TEXT, color: BG, border: 'none', cursor: 'pointer' }}
          >
            Start writing →
          </button>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ padding: '32px 56px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <svg width="20" height="20" viewBox="0 0 28 28" fill="none">
            <rect x="4" y="4" width="20" height="20" rx="3" stroke={HINT} strokeWidth="2" fill="none" transform="rotate(45 14 14)" />
          </svg>
          <span style={{ fontSize: 12, color: HINT, letterSpacing: '0.08em' }}>ONCHAIN PRESS</span>
        </div>
        <div style={{ display: 'flex', gap: 32 }}>
          {[['Latest', '/latest'], ['Topics', '/topics'], ['Writers', '/writers'], ['Write', '/write']].map(([label, path]) => (
            <span
              key={label}
              onClick={() => navigate(path)}
              style={{ fontSize: 13, color: HINT, cursor: 'pointer' }}
            >
              {label}
            </span>
          ))}
        </div>
        <div style={{ fontSize: 12, color: HINT }}>
          Built on Shelby · Aptos Testnet
        </div>
      </div>

    </div>
  )
}