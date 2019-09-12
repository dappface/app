import axios from 'axios'

export async function fetchImageSource(url: string): Promise<string> {
  const res = await axios.get(url, {responseType: 'arraybuffer'})
  const base64Image = Buffer.from(res.data, 'binary').toString('base64')
  return `data:image/png;base64,${base64Image}`
}
