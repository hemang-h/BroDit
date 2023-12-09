import { NFTStorage, File } from 'nft.storage'

export interface Brodit {
  title: string
  description: string
  files: File[]
}

export const emptyBrodit: Brodit = {
    title: '',
    description: '',
    files: []
  }
  

export interface RawBrodit {
  title: string
  description: string
  files: { content: string; name: string }
}

const fileToBase64 = async (file: File): Promise<{ name: string; content: string }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve({ content: reader.result as string, name: file.name })
    reader.onerror = (error) => reject(error)
  })
}

export const packBrodit = async (brodit: Brodit, password: string): Promise<File> => {
  const promises = brodit.files.map((file) => fileToBase64(file))
  const base64Files = await Promise.all(promises)

  const pack = JSON.stringify({ ...brodit, files: base64Files })
  return new File([pack], 'brodit')
}

export const uploadBrodit = async (brodit: Brodit, password: string) => {
  const storage = new NFTStorage({ token: process.env.NEXT_PUBLIC_STORAGE_KEY! })

  const file = await packBrodit(brodit, password)
  const cid = await storage.storeBlob(file)

  console.log('cid', cid)
  return cid
}

// bafkreibahfwerubfdd7szxs6v2lws3femyimims5yojdfvgqxoccyomigq
export const ipfsURL = (cid: string) => `https://${cid}.ipfs.nftstorage.link/`

export const pullBrodit = async (cid: string) => {
  const pack = await fetch(ipfsURL(cid)).then<RawBrodit>((t) => t.json())
  return pack
}