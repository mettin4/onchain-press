import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AptosWalletAdapterProvider } from '@aptos-labs/wallet-adapter-react'
import { Network } from '@aptos-labs/ts-sdk'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AptosWalletAdapterProvider
        autoConnect={false}
        dappConfig={{ network: Network.TESTNET }}
        optInWallets={['Petra']}
        onError={(error) => console.log('Wallet error:', error)}
      >
        <App />
      </AptosWalletAdapterProvider>
    </BrowserRouter>
  </StrictMode>,
)