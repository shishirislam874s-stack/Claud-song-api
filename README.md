# YouTube Audio API (Vercel)

## Deploy করার নিয়ম

### Option A — Vercel CLI দিয়ে (সবচেয়ে সহজ)

1. এই `yt-audio-api` ফোল্ডারটা আপনার কম্পিউটারে রাখুন
2. Terminal-এ ফোল্ডারের ভেতরে গিয়ে:
   ```
   npm install -g vercel
   vercel login
   vercel --prod
   ```
3. প্রশ্ন করলে সব default রেখে Enter চাপুন
4. শেষে একটা URL পাবেন, যেমন:
   ```
   https://yt-audio-api-xxxx.vercel.app
   ```

### Option B — GitHub দিয়ে (Vercel Dashboard)

1. এই ফোল্ডারটা একটা নতুন GitHub repo-তে push করুন
2. [vercel.com](https://vercel.com) → New Project → ওই repo import করুন → Deploy
3. Deploy শেষে project-এর URL কপি করুন

## টেস্ট করা

Browser-এ গিয়ে চেক করুন:
```
https://আপনার-url.vercel.app/api/search?q=Tumi Robe Nirobe
```
JSON রেসপন্স আসলে ঠিক আছে।

## পরের ধাপ

Deploy হওয়া URL-টা আমাকে দিন — আমি `play.js`-এ বসিয়ে দেব।
