const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

const srcDir = 'C:\\Users\\susha\\.gemini\\antigravity-ide\\brain\\d0ef65b4-4006-436e-b495-d19f67ea2cc8\\.user_uploaded';
const outDir = path.resolve(__dirname, '../public/assets/icons');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

// 1. Copy the 4 direct 25x25 user-provided transparent icons
fs.copyFileSync(path.join(srcDir, 'media_1790578107040.png'), path.join(outDir, 'dashboard.png'));
fs.copyFileSync(path.join(srcDir, 'media_1790578107035.png'), path.join(outDir, 'transactions.png'));
fs.copyFileSync(path.join(srcDir, 'media_1790578107015.png'), path.join(outDir, 'accounts.png'));
fs.copyFileSync(path.join(srcDir, 'media_1790578107010.png'), path.join(outDir, 'investments.png'));

// 2. Decode media_1790578095885.png to extract remaining 5 icons
const crcTable = [];
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
  }
  crcTable[n] = c;
}
function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

function makeChunk(type, data) {
  const len = data.length;
  const chunk = Buffer.alloc(12 + len);
  chunk.writeUInt32BE(len, 0);
  chunk.write(type, 4, 4, 'ascii');
  data.copy(chunk, 8);
  const typeAndData = chunk.slice(4, 8 + len);
  chunk.writeUInt32BE(crc32(typeAndData), 8 + len);
  return chunk;
}

function encodePng(width, height, rgbaBuffer) {
  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;
  const ihdrChunk = makeChunk('IHDR', ihdr);

  const stride = width * 4;
  const raw = Buffer.alloc(height * (stride + 1));
  let dstPos = 0;
  for (let y = 0; y < height; y++) {
    raw[dstPos++] = 0;
    rgbaBuffer.copy(raw, dstPos, y * stride, (y + 1) * stride);
    dstPos += stride;
  }

  const compressed = zlib.deflateSync(raw);
  const idatChunk = makeChunk('IDAT', compressed);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

function decodePng(buf) {
  let offset = 8;
  let width, height, idatChunks = [];
  while (offset < buf.length) {
    const len = buf.readUInt32BE(offset);
    const type = buf.toString('ascii', offset + 4, offset + 8);
    if (type === 'IHDR') {
      width = buf.readUInt32BE(offset + 8);
      height = buf.readUInt32BE(offset + 12);
    } else if (type === 'IDAT') {
      idatChunks.push(buf.slice(offset + 8, offset + 8 + len));
    }
    offset += 12 + len;
  }
  const compressed = Buffer.concat(idatChunks);
  const raw = zlib.inflateSync(compressed);
  const bpp = 4;
  const stride = width * bpp;
  const pixels = Buffer.alloc(width * height * 4);
  let srcPos = 0;
  for (let y = 0; y < height; y++) {
    const filter = raw[srcPos++];
    const prevRow = y > 0 ? pixels.subarray((y - 1) * stride, y * stride) : null;
    const currRow = pixels.subarray(y * stride, (y + 1) * stride);
    for (let x = 0; x < stride; x++) {
      const rawByte = raw[srcPos++];
      const left = x >= bpp ? currRow[x - bpp] : 0;
      const up = prevRow ? prevRow[x] : 0;
      const upLeft = prevRow && x >= bpp ? prevRow[x - bpp] : 0;
      let val = 0;
      if (filter === 0) val = rawByte;
      else if (filter === 1) val = (rawByte + left) & 0xff;
      else if (filter === 2) val = (rawByte + up) & 0xff;
      else if (filter === 3) val = (rawByte + Math.floor((left + up) / 2)) & 0xff;
      else if (filter === 4) {
        const p = left + up - upLeft;
        const pa = Math.abs(p - left), pb = Math.abs(p - up), pc = Math.abs(p - upLeft);
        const pr = pa <= pb && pa <= pc ? left : pb <= pc ? up : upLeft;
        val = (rawByte + pr) & 0xff;
      }
      currRow[x] = val;
    }
  }
  return { width, height, pixels };
}

const { width, height, pixels } = decodePng(fs.readFileSync(path.join(srcDir, 'media_1790578095885.png')));

const remainingIcons = [
  { id: 'credit-cards', minX: 21, minY: 312, maxX: 50, maxY: 334 },
  { id: 'loans', minX: 22, minY: 382, maxX: 49, maxY: 410 },
  { id: 'services', minX: 21, minY: 453, maxX: 49, maxY: 481 },
  { id: 'privileges', minX: 22, minY: 526, maxX: 49, maxY: 554 },
  { id: 'setting', minX: 19, minY: 599, maxX: 47, maxY: 627 }
];

remainingIcons.forEach(ic => {
  const w = ic.maxX - ic.minX + 1;
  const h = ic.maxY - ic.minY + 1;
  
  const targetSize = 25;
  const targetBuf = Buffer.alloc(targetSize * targetSize * 4);
  const scale = Math.min((targetSize - 2) / w, (targetSize - 2) / h);
  const dw = Math.round(w * scale);
  const dh = Math.round(h * scale);
  const offsetX = Math.floor((targetSize - dw) / 2);
  const offsetY = Math.floor((targetSize - dh) / 2);

  for (let y = 0; y < dh; y++) {
    const srcY = ic.minY + Math.min(Math.floor(y / scale), h - 1);
    for (let x = 0; x < dw; x++) {
      const srcX = ic.minX + Math.min(Math.floor(x / scale), w - 1);
      const srcIdx = (srcY * width + srcX) * 4;
      const dstIdx = ((offsetY + y) * targetSize + (offsetX + x)) * 4;

      const r = pixels[srcIdx];
      const g = pixels[srcIdx + 1];
      const b = pixels[srcIdx + 2];
      const lum = 0.299 * r + 0.587 * g + 0.114 * b;

      if (lum > 240) {
        targetBuf[dstIdx + 3] = 0;
      } else {
        let alpha = 255;
        if (lum > 185) {
          alpha = Math.round(((240 - lum) / 55) * 255);
        }
        targetBuf[dstIdx] = 177;
        targetBuf[dstIdx + 1] = 177;
        targetBuf[dstIdx + 2] = 177;
        targetBuf[dstIdx + 3] = alpha;
      }
    }
  }

  const pngData = encodePng(targetSize, targetSize, targetBuf);
  fs.writeFileSync(path.join(outDir, `${ic.id}.png`), pngData);
  console.log(`Generated public/assets/icons/${ic.id}.png`);
});

console.log('All 9 icons ready in public/assets/icons/!');
