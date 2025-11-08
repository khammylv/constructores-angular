export async function decryptPdf(
  encryptedBase64: string,
  keyStr: string,
  ivStr: string
): Promise<Uint8Array> {
  const encryptedBytes = Uint8Array.from(atob(encryptedBase64), (c) =>
    c.charCodeAt(0)
  );

  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(keyStr),
    { name: 'AES-CBC' },
    false,
    ['decrypt']
  );

  const iv = new TextEncoder().encode(ivStr);

  const decrypted = await crypto.subtle.decrypt(
    { name: 'AES-CBC', iv },
    key,
    encryptedBytes
  );

  return new Uint8Array(decrypted as ArrayBuffer);
}
