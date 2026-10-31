// export default function handler(req, res) {
//     const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
//     const country = req.headers['x-vercel-ip-country'] || 'Unknown';
//     const city = req.headers['x-vercel-ip-city'] || 'Unknown';
//     const device = req.headers['user-agent'];

//     console.log(`NEW VISITOR -> IP: ${ip} | Location: ${city}, ${country} | Device: ${device}`);

//     res.status(200).json({ logged: true });
// }

export default function handler(req, res) {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const city = decodeURIComponent(req.headers['x-vercel-ip-city'] || 'Unknown');
    const region = req.headers['x-vercel-ip-country-region'] || '';
    const country = req.headers['x-vercel-ip-country'] || 'Unknown';
    const postal = req.headers['x-vercel-ip-postal-code'] || 'N/A';
    const coords = `${req.headers['x-vercel-ip-latitude'] || '?'}, ${req.headers['x-vercel-ip-longitude'] || '?'}`;
    const ua = req.headers['user-agent'];

    const client = req.body || {};

    console.log(
        `VISITOR -> IP: ${ip} | Loc: ${city}, ${region}, ${country} (PIN: ${postal} / GPS: ${coords}) | ` +
        `Model: ${client.model || 'N/A'} | Screen: ${client.screen || 'N/A'} | ` +
        `HW: ${client.cores || '?'} Cores, ${client.ram || '?'} RAM, GPU: ${client.gpu || 'N/A'} | ` +
        `Battery: ${client.battery || 'N/A'} | Net: ${client.network || '?'} | From: ${client.referrer || 'Direct'} | UA: ${ua}`
    );

    res.status(200).json({ logged: true });
}