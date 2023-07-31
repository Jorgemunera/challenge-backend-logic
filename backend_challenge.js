const https = require('https');
const fs = require('fs');
const crypto = require('crypto');

const url = 'https://coderbyte.com/api/challenges/json/age-counting';

https.get(url, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    const jsonData = JSON.parse(data);
    const elements = jsonData.data.split(', ');

    const keysWithAge32 = elements.reduce((acc, element) => {
      const [, age] = element.split('=');
      if (parseInt(age) === 32) {
        const [key] = element.split(', ');
        acc.push(key.split('=')[1]);
      }
      return acc;
    }, []);

    const outputFileName = 'output.txt';
    const outputData = keysWithAge32.join('\n') + '\n';

    fs.writeFileSync(outputFileName, outputData);

    const hash = crypto.createHash('sha1');
    const stream = fs.createReadStream(outputFileName);

    stream.on('data', (data) => {
      hash.update(data);
    });

    stream.on('end', () => {
      const sha1Hash = hash.digest('hex');
      console.log('SHA1 Hash:', sha1Hash);
    });
  });
}).on('error', (err) => {
  console.error('Error:', err.message);
});
