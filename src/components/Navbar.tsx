import { useWallet } from '@aptos-labs/wallet-adapter-react'
import { useNavigate, useLocation } from 'react-router-dom'

const Logo = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="4"
      y="4"
      width="20"
      height="20"
      rx="3"
      stroke="#0f0f0f"
      strokeWidth="2.5"
      fill="none"
      transform="rotate(45 14 14)"
    />
  </svg>
)

export default function Navbar() {
  const { connect, disconnect, connected, account, wallets } = useWallet()
  const navigate = useNavigate()
  const location = useLocation()

  const handleWallet = () => {
    if (connected) {
      disconnect()
    } else {
      const petra = wallets?.find(w => w.name === 'Petra')
      if (petra) connect(petra.name)
    }
  }

  const shortAddress = account?.address
    ? `${account.address.toString().slice(0, 6)}...${account.address.toString().slice(-4)}`
    : ''

  const navItems = [
    { label: 'Latest', path: '/latest' },
    { label: 'Topics', path: '/topics' },
    { label: 'Writers', path: '/writers' },
  ]

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px 48px',
      borderBottom: '1px solid rgba(0,0,0,0.08)',
      background: '#f5f4ef',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <div
        onClick={() => navigate('/')}
        style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}
      >
        <Logo />
        <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#0f0f0f' }}>
          Onchain Press
        </span>
      </div>

      <div style={{ display: 'flex', gap: 32 }}>
        {navItems.map(item => (
          <span
            key={item.label}
            onClick={() => navigate(item.path)}
            style={{
              fontSize: 14,
              color: location.pathname === item.path ? '#0f0f0f' : '#666',
              cursor: 'pointer',
              fontWeight: location.pathname === item.path ? 600 : 400,
              transition: 'color 0.15s',
            }}
          >
            {item.label}
          </span>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        {location.pathname !== '/write' && (
          <button
            onClick={() => navigate('/write')}
            style={{
              fontSize: 13,
              color: '#0f0f0f',
              padding: '7px 18px',
              border: '1px solid rgba(0,0,0,0.2)',
              borderRadius: 100,
              background: 'transparent',
              cursor: 'pointer',
            }}
          >
            Write
          </button>
        )}
        <button
          onClick={handleWallet}
          style={{
            fontSize: 13,
            fontWeight: 600,
            padding: '7px 18px',
            borderRadius: 100,
            background: '#0f0f0f',
            color: '#f5f4ef',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          {connected ? (
            <>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
              {shortAddress}
            </>
          ) : 'Connect Wallet'}
        </button>
      </div>
    </nav>
  )
}