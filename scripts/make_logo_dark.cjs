const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

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
  let offset = 8, idatChunks = [];
  let width, height;
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
  const raw = zlib.inflateSync(Buffer.concat(idatChunks));
  const bpp = 4, stride = width * bpp;
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

const logoFile = path.resolve(__dirname, '../public/assets/logo.png');
const { width, height, pixels } = decodePng(fs.readFileSync(logoFile));

const darkPixels = Buffer.from(pixels);
for (let y = 0; y < height; y++) {
  for (let x = 76; x < width; x++) {
    const idx = (y * width + x) * 4;
    const a = darkPixels[idx + 3];
    if (a > 0) {
      darkPixels[idx] = 255;
      darkPixels[idx + 1] = 255;
      darkPixels[idx + 2] = 255;
      // keep original anti-aliased alpha
    }
  }
}

const darkPng = encodePng(width, height, darkPixels);
fs.writeFileSync(path.resolve(__dirname, '../public/assets/logo-dark.png'), darkPng);
console.log('Created public/assets/logo-dark.png successfully!');
