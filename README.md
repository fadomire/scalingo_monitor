# Scalingo Metrics Monitor

### Installation

Clone the repository and install the dependencies

```sh
git clone https://github.com/fadomire/scalingo_monitor.git
cd scalingo_monitor
npm install
```

#### Add your environment variables


```bash
cd ..
cp .env.example .env
vim .env
```

you should see:

```javascript
SCALINGO_TOKEN = '' // Add your scalingo token here
APP_NAME = '' // add the app name you want to monitor
CPU_THRESHOLD = 50
MEMORY_THRESHOLD = 350
SWAP_THRESHOLD = 1
CHECK_TIMER = 3600
SLACK_WEBHOOK = ''
```

#### Running in debug mode

```bash
npm run debug
```
