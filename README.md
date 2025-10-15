![](https://www.upload.ee/image/18702545/Zyla_Site_Banner.png)

# Zyla

Zyla is a free, AI-powered instant translation tool that works directly on web pages. With just one click, translate any text on the internet instantly, supporting over 100 languages. No limits, no fees, no subscriptions—just seamless, privacy-focused translation.

## Installation

### Requirements
- Node.js (for running the SvelteKit app)
- Environment variables: `VITE_APP_API_BASE_URL`, `VITE_APP_API_MODEL`, `VITE_APP_API_TOKEN`

### Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/getzyla/www.git
   cd www
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Set up environment variables in `.env`:
   ```
   VITE_APP_API_BASE_URL=your_api_base_url
   VITE_APP_API_MODEL=your_model
   VITE_APP_API_TOKEN=your_token
   ```

4. Run the development server:
   ```bash
   bun run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature`.
3. Commit your changes: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/your-feature`.
5. Open a Pull Request.

## License

This project is open source under the MIT License. See [LICENSE](LICENSE) for details.

Made with ❤️ by [Pimatis](https://github.com/Pimatis)
