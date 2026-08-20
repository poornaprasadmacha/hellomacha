const fs = require('fs');
const path = require('path');

const DOMAIN = 'hellomacha.com';
const INDEXNOW_KEY = 'cd77890a-b158-4647-90e0-86a6fffbcaae';
const KEY_LOCATION = `https://${DOMAIN}/${INDEXNOW_KEY}.txt`;
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';

async function pingIndexNow() {
  const contentDirs = [
    path.join(__dirname, '../content/articles'),
    path.join(__dirname, '../content/pages')
  ];

  const urlsSet = new Set();

  for (const dir of contentDirs) {
    if (fs.existsSync(dir)) {
      const files = fs.readdirSync(dir);
      for (const file of files) {
        if (file.endsWith('.mdx') || file.endsWith('.md')) {
          const slug = file.replace(/\.mdx?$/, '');
          urlsSet.add(`https://${DOMAIN}/${slug}`);
        }
      }
    }
  }

  const urlList = Array.from(urlsSet);

  if (urlList.length === 0) {
    console.log('No articles or pages found to ping.');
    return;
  }

  console.log(`Found ${urlList.length} URLs to submit to IndexNow:`);
  urlList.forEach((url) => console.log(` - ${url}`));

  const payload = {
    host: DOMAIN,
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList: urlList
  };

  console.log('\nSending IndexNow payload:');
  console.log(JSON.stringify(payload, null, 2));

  try {
    const response = await fetch(INDEXNOW_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(payload)
    });

    console.log(`\nResponse Status: ${response.status} ${response.statusText}`);

    if (response.ok || response.status === 200 || response.status === 202) {
      console.log('Successfully submitted URLs to IndexNow!');
    } else {
      const text = await response.text();
      console.log(`IndexNow response detail: ${text}`);
    }
  } catch (error) {
    console.error('Error pinging IndexNow:', error.message);
    process.exit(1);
  }
}

pingIndexNow();
