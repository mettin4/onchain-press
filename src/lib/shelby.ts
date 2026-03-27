import { ShelbyClient } from '@shelby-protocol/sdk/browser'
import { Network } from '@aptos-labs/ts-sdk'

export const shelbyClient = new ShelbyClient({
  network: Network.TESTNET,
  apiKey: import.meta.env.VITE_SHELBY_API_KEY,
})

export interface Article {
  id: string
  title: string
  subtitle: string
  content: string
  author: string
  tags: string[]
  createdAt: number
  txHash?: string
}

export const articleToFile = (article: Omit<Article, 'id'>): File => {
  const json = JSON.stringify(article)
  const slug = article.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 50)
  const fileName = `${slug}-${Date.now()}.json`
  return new File([json], fileName, { type: 'application/json' })
}

export const getArticleBlobName = (title: string): string => {
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 50)
  return `${slug}-${Date.now()}.json`
}

export const readTime = (content: string): number => {
  const words = content.trim().split(/\s+/).length
  return Math.ceil(words / 200)
}