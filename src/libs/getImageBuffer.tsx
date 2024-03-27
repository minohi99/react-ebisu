import path from 'node:path';
import fs from 'node:fs/promises';

/**
 * 指定されたソースから画像データのバッファを取得します。
 *
 * ソースがHTTP(S) URLの場合、外部サーバーから画像をフェッチし、そのバッファを返します。
 * ソースがローカルファイルパスの場合、指定されたパスのファイルを読み込み、そのバッファを返します。
 *
 * @param {string} src - 画像データのソースURLまたはローカルファイルパス。
 * @returns {Promise<Buffer>} 画像データのバッファ。
 */

export async function getImageBuffer(src: string) {
  if (src.startsWith('http')) {
    const res = await fetch(src);
    return await Buffer.from(await res.arrayBuffer());
  } else {
    return await fs.readFile(path.join('./public', src));
  }
}
