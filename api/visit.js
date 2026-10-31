export default function handler(req, res) {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const country = req.headers['x-vercel-ip-country'] || 'Unknown';
    const city = req.headers['x-vercel-ip-city'] || 'Unknown';
    const device = req.headers['user-agent'];

    console.log(`NEW VISITOR -> IP: ${ip} | Location: ${city}, ${country} | Device: ${device}`);

    res.status(200).json({ logged: true });
}