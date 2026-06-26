This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to publish WealthLens as a shareable website is to deploy it on Vercel.

1. Push this repository to GitHub.
2. Go to [Vercel New Project](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).
3. Import the GitHub repository and deploy.
4. Add the environment variables below in the Vercel dashboard, if you want real AI analysis.

### Environment variables

- `OPENAI_API_KEY` — required for OpenAI-based assistant responses.
- `OPENAI_MODEL` — optional, defaults to `gpt-4o-mini`.
- `AZURE_OPENAI_ENDPOINT` — optional, if using Azure OpenAI.
- `AZURE_OPENAI_KEY` — optional, if using Azure OpenAI.
- `AZURE_OPENAI_MODEL` — optional, defaults to `gpt-4o-mini`.

If no API key is configured, the site will still run in demo mode and show placeholder assistant results so you can share the app as a working website.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
