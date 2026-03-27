import { useState } from 'react'
import { useWallet } from '@aptos-labs/wallet-adapter-react'
import { useNavigate } from 'react-router-dom'
import { readTime } from '../lib/shelby'
import {
  ShelbyClient,
  generateCommitments,
  createDefaultErasureCodingProvider,
  ShelbyBlobClient,
  expectedTotalChunksets,
} from '@shelby-protocol/sdk/browser'
import { Aptos, AptosConfig, Network } from '@aptos-labs/ts-sdk'

const aptosClient = new Aptos(new AptosConfig({ network: Network.TESTNET }))
const shelbyClient = new ShelbyClient({
  network: Network.TESTNET,
  apiKey: import.meta.env.VITE_SHELBY_API_KEY,
})

const BG = '#f0ede6'
const BG2 = '#e8e4dc'
const BORDER = '1px solid rgba(0,0,0,0.09)'
const TEXT = '#0f0f0f'
const MUTED = '#888'
const HINT = '#bbb'
const GREEN = '#22c55e'

const DRAFT_KEY = 'onchain_press_draft'

function loadDraft() {
  try {
    const raw = localStorage.getItem(DRAFT_KEY)
    return raw ? JSON.parse(raw) : null
  } catch { return null }
}

export default function Write() {
  const { connected, account, signAndSubmitTransaction, connect, disconnect, wallets } = useWallet()
  const navigate = useNavigate()

  const draft = loadDraft()
  const [title, setTitle] = useState(draft?.title || '')
  const [subtitle, setSubtitle] = useState(draft?.subtitle || '')
  const [content, setContent] = useState(draft?.content || '')
  const [tags, setTags] = useState<string[]>(draft?.tags || ['Journalism', 'Web3'])
  const [tagInput, setTagInput] = useState('')
  const [publishing, setPublishing] = useState(false)
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')
  const [coverImage, setCoverImage] = useState<string | null>(draft?.coverImage || null)
  const [coverHover, setCoverHover] = useState(false)
  const [draftSaved, setDraftSaved] = useState(false)

  const shortAddr = connected && account?.address
    ? `${account.address.toString().slice(0, 6)}...${account.address.toString().slice(-4)}`
    : null

  const handleWallet = () => {
    if (connected) {
      disconnect()
    } else {
      const petra = wallets?.find(w => w.name === 'Petra')
      if (petra) connect(petra.name)
    }
  }

  const saveDraft = () => {
    localStorage.setItem(DRAFT_KEY, JSON.stringify({ title, subtitle, content, tags, coverImage }))
    setDraftSaved(true)
    setTimeout(() => setDraftSaved(false), 2000)
  }

  const handleCoverImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setCoverImage(reader.result as string)
    reader.readAsDataURL(file)
  }

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0
  const rt = readTime(content)

  const addTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim() && tags.length < 5) {
      setTags([...tags, tagInput.trim()])
      setTagInput('')
    }
  }

  const removeTag = (i: number) => setTags(tags.filter((_, idx) => idx !== i))

  const handlePublish = async () => {
    setError('')
    if (!connected || !account) { setError('Please connect your Petra wallet first.'); return }
    if (!title.trim() || !content.trim()) { setError('Title and content are required.'); return }
    setPublishing(true)
    try {
      setStatus('Preparing article...')
      const article = { title, subtitle, content, author: account.address.toString(), tags, createdAt: Date.now() }
      const json = JSON.stringify(article)
      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 50)
      const blobName = `${slug}-${Date.now()}.json`
      const fileData = new TextEncoder().encode(json)

      setStatus('Encoding article for Shelby...')
      const provider = await createDefaultErasureCodingProvider()
      const commitments = await generateCommitments(provider, fileData)

      setStatus('Registering on Aptos blockchain...')
      const expirationMicros = (Date.now() + 1000 * 60 * 60 * 24 * 365) * 1000
      const payload = ShelbyBlobClient.createRegisterBlobPayload({
        account: account.address,
        blobName,
        blobMerkleRoot: commitments.blob_merkle_root,
        numChunksets: expectedTotalChunksets(commitments.raw_data_size),
        expirationMicros,
        blobSize: commitments.raw_data_size,
        encoding: 0,
      })

      const tx = await signAndSubmitTransaction({ data: payload })
      await aptosClient.waitForTransaction({ transactionHash: tx.hash })

      setStatus('Uploading to Shelby network...')
      await shelbyClient.rpc.putBlob({ account: account.address, blobName, blobData: fileData })

      localStorage.removeItem(DRAFT_KEY)
      setStatus(`Published! Blob: ${blobName}`)
      setPublishing(false)
    } catch (err: unknown) {
      console.error(err)
      setError(err instanceof Error ? err.message : 'Something went wrong.')
      setStatus('')
      setPublishing(false)
    }
  }

  return (
    <div style={{ background: BG, minHeight: '100vh' }}>
      {/* Top bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 40px', borderBottom: BORDER, background: BG }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span onClick={() => navigate('/')} style={{ fontSize: 13, color: MUTED, cursor: 'pointer' }}>← Onchain Press</span>
          <span style={{ color: 'rgba(0,0,0,0.15)' }}>|</span>
          <span style={{ fontSize: 13, color: MUTED, display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: GREEN, display: 'inline-block' }} />
            {draft ? 'Draft loaded' : 'Draft saved'}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button
            onClick={handleWallet}
            style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: MUTED, background: BG2, padding: '6px 14px', borderRadius: 100, border: BORDER, cursor: 'pointer' }}
          >
            {connected && shortAddr ? (
              <>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: GREEN, display: 'inline-block' }} />
                {shortAddr}
              </>
            ) : 'Connect Wallet'}
          </button>
          <button
            onClick={saveDraft}
            style={{ fontSize: 13, color: draftSaved ? GREEN : MUTED, padding: '7px 18px', border: BORDER, borderRadius: 100, background: 'transparent', cursor: 'pointer' }}
          >
            {draftSaved ? '✓ Saved' : 'Save draft'}
          </button>
          <button
            onClick={handlePublish}
            disabled={publishing}
            style={{ fontSize: 13, fontWeight: 600, padding: '7px 20px', borderRadius: 100, background: publishing ? HINT : TEXT, color: BG, border: 'none', cursor: publishing ? 'default' : 'pointer' }}
          >
            {publishing ? 'Publishing...' : 'Publish to chain →'}
          </button>
        </div>
      </div>

      {status && (
        <div style={{ padding: '10px 40px', background: status.includes('Published') ? 'rgba(34,197,94,0.1)' : 'rgba(0,0,0,0.03)', borderBottom: BORDER, fontSize: 13, color: status.includes('Published') ? '#16a34a' : MUTED }}>
          {status}
        </div>
      )}
      {error && (
        <div style={{ padding: '10px 40px', background: 'rgba(239,68,68,0.08)', borderBottom: BORDER, fontSize: 13, color: '#dc2626' }}>
          {error}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', minHeight: 'calc(100vh - 57px)' }}>
        {/* Editor */}
        <div style={{ padding: '52px 72px', borderRight: BORDER }}>
          <div
            onClick={() => document.getElementById('cover-upload')?.click()}
            onMouseEnter={() => setCoverHover(true)}
            onMouseLeave={() => setCoverHover(false)}
            style={{ width: '100%', height: 220, borderRadius: 14, border: coverImage ? 'none' : '1px dashed rgba(0,0,0,0.2)', display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 44, cursor: 'pointer', background: BG2, overflow: 'hidden', position: 'relative' as const }}
          >
            {coverImage ? (
              <>
                <img src={coverImage} alt="cover" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                {coverHover && (
                  <div style={{ position: 'absolute' as const, inset: 0, background: 'rgba(0,0,0,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: 13, color: '#fff', background: 'rgba(0,0,0,0.5)', padding: '8px 20px', borderRadius: 100 }}>Change image</span>
                  </div>
                )}
              </>
            ) : (
              <>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={HINT} strokeWidth="1.2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>
                <span style={{ fontSize: 14, color: HINT }}>Add cover image</span>
                <span style={{ fontSize: 12, color: HINT, opacity: 0.6 }}>JPG, PNG or WebP · Recommended 1600×840px</span>
              </>
            )}
            <input id="cover-upload" type="file" accept="image/*" onChange={handleCoverImage} style={{ display: 'none' }} />
          </div>

          <textarea value={title} onChange={e => setTitle(e.target.value)} placeholder="Your title here..." rows={2}
            style={{ width: '100%', border: 'none', outline: 'none', fontFamily: 'Georgia, serif', fontSize: 44, fontWeight: 400, lineHeight: 1.1, letterSpacing: '-0.025em', color: TEXT, background: 'transparent', resize: 'none', marginBottom: 14, boxSizing: 'border-box' as const }} />

          <textarea value={subtitle} onChange={e => setSubtitle(e.target.value)} placeholder="Add a subtitle that draws readers in..." rows={2}
            style={{ width: '100%', border: 'none', outline: 'none', fontFamily: 'Georgia, serif', fontSize: 22, fontWeight: 400, color: HINT, background: 'transparent', resize: 'none', marginBottom: 36, boxSizing: 'border-box' as const }} />

          <div style={{ height: 1, background: 'rgba(0,0,0,0.08)', marginBottom: 24 }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: 2, marginBottom: 28, paddingBottom: 20, borderBottom: BORDER }}>
            {[{ l: 'B', s: { fontWeight: 700 } }, { l: 'I', s: { fontStyle: 'italic' } }, { l: 'U', s: { textDecoration: 'underline' } }].map(({ l, s }) => (
              <button key={l} style={{ width: 34, height: 34, borderRadius: 8, color: MUTED, fontSize: 13, background: 'transparent', border: 'none', cursor: 'pointer', ...s }}>{l}</button>
            ))}
            <div style={{ width: 1, height: 18, background: 'rgba(0,0,0,0.1)', margin: '0 6px' }} />
            {['H1', 'H2', 'H3'].map(t => (
              <button key={t} style={{ width: 34, height: 34, borderRadius: 8, color: MUTED, fontSize: 11, background: 'transparent', border: 'none', cursor: 'pointer' }}>{t}</button>
            ))}
            <div style={{ width: 1, height: 18, background: 'rgba(0,0,0,0.1)', margin: '0 6px' }} />
            <button style={{ width: 34, height: 34, borderRadius: 8, color: MUTED, background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
            </button>
            <button style={{ width: 34, height: 34, borderRadius: 8, color: MUTED, background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>
            </button>
          </div>

          <textarea value={content} onChange={e => setContent(e.target.value)}
            placeholder={`Tell your story...\n\nYour words will be stored permanently on Shelby. No platform, no government, no company can delete them.`}
            style={{ width: '100%', minHeight: 360, border: 'none', outline: 'none', fontFamily: 'Georgia, serif', fontSize: 20, lineHeight: 1.8, color: TEXT, background: 'transparent', resize: 'none', boxSizing: 'border-box' as const }} />
        </div>

        {/* Sidebar */}
        <div style={{ padding: '36px 32px', background: BG }}>
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: HINT, marginBottom: 12 }}>Tags</div>
            <input value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={addTag} placeholder="Add a topic..."
              style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: BORDER, background: BG2, fontSize: 13, color: TEXT, outline: 'none', boxSizing: 'border-box' as const }} />
            <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 8, marginTop: 10 }}>
              {tags.map((t, i) => (
                <span key={i} style={{ fontSize: 12, padding: '5px 12px', borderRadius: 100, background: BG2, border: BORDER, color: MUTED, display: 'flex', alignItems: 'center', gap: 6 }}>
                  {t} <span onClick={() => removeTag(i)} style={{ cursor: 'pointer', color: HINT, fontSize: 14 }}>×</span>
                </span>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 32 }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: HINT, marginBottom: 12 }}>Preview</div>
            <div style={{ background: BG2, borderRadius: 12, padding: 16, border: BORDER }}>
              <div style={{ width: '100%', height: 80, borderRadius: 8, background: '#dedad2', marginBottom: 12, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {coverImage
                  ? <img src={coverImage} alt="cover" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={HINT} strokeWidth="1"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>
                }
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4, fontFamily: 'Georgia, serif', color: TEXT }}>{title || 'Your title will appear here'}</div>
              <div style={{ fontSize: 12, color: HINT, lineHeight: 1.5 }}>{subtitle || 'Subtitle and excerpt will be shown in the article feed.'}</div>
              <div style={{ fontSize: 12, color: HINT, marginTop: 10, display: 'flex', justifyContent: 'space-between' }}>
                <span>{wordCount} words</span><span>~{rt} min read</span>
              </div>
            </div>
          </div>

          <div style={{ marginBottom: 32 }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: HINT, marginBottom: 12 }}>On-chain details</div>
            <div style={{ background: BG2, borderRadius: 12, border: BORDER }}>
              {[
                { key: 'Network', val: 'Shelbynet', green: true },
                { key: 'Storage', val: 'Shelby Blob' },
                { key: 'Expires', val: '1 year' },
                { key: 'Author', val: shortAddr || 'Not connected' },
              ].map(({ key, val, green }, i) => (
                <div key={key} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 16px', borderBottom: i < 3 ? BORDER : 'none' }}>
                  <span style={{ fontSize: 12, color: HINT }}>{key}</span>
                  <span style={{ fontSize: 12, fontFamily: 'monospace', color: green ? GREEN : MUTED }}>{val}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: HINT, marginBottom: 14 }}>When you publish</div>
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 12 }}>
              {[
                { label: 'Permanent', desc: '— stored on Shelby forever' },
                { label: 'Signed', desc: '— authorship is wallet-verified' },
                { label: 'Uncensorable', desc: '— no one can remove it' },
              ].map(({ label, desc }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'start', gap: 10 }}>
                  <div style={{ width: 18, height: 18, borderRadius: '50%', background: BG2, border: BORDER, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke={TEXT} strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <span style={{ fontSize: 13, color: MUTED, lineHeight: 1.5 }}>
                    <strong style={{ color: TEXT, fontWeight: 600 }}>{label}</strong> {desc}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}