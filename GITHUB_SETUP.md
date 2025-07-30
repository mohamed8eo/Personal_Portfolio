# GitHub API Rate Limit Fix

## Problem
Your portfolio is hitting GitHub API rate limits because it's making unauthenticated requests. GitHub limits unauthenticated requests to 60 per hour.

## Solution
We've implemented a new API route with caching and authentication support.

## Setup Instructions

### Option 1: With GitHub Token (Recommended)

1. **Create a GitHub Personal Access Token:**
   - Go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
   - Click "Generate new token (classic)"
   - Give it a name like "Portfolio API"
   - Select scopes: `public_repo` (for public repositories)
   - Click "Generate token"
   - **Copy the token immediately** (you won't see it again)

2. **Add the token to your environment:**
   - Create or edit `.env.local` file in your project root
   - Add: `GITHUB_TOKEN=your_github_token_here`
   - Replace `your_github_token_here` with the token you copied

3. **Restart your development server:**
   ```bash
   pnpm dev
   ```

### Option 2: Without Token (Limited)

If you don't want to use a token, the system will still work but with limitations:
- 60 requests per hour instead of 5000
- May hit rate limits during development
- Caching helps reduce API calls

## How It Works

### New API Route (`/api/github`)
- **Caching**: Responses are cached for 5 minutes
- **Authentication**: Uses GitHub token when available
- **Rate limit handling**: Better error messages
- **Centralized**: All GitHub API calls go through this route

### Benefits
- ✅ **Higher rate limits**: 5000 requests/hour with token vs 60 without
- ✅ **Caching**: Reduces API calls significantly
- ✅ **Better error handling**: Clear error messages
- ✅ **Centralized**: Easier to manage and debug

## Testing

1. **With token**: You should see projects load without rate limit errors
2. **Without token**: May still hit limits but with better error handling

## Troubleshooting

### Still getting rate limit errors?
1. Make sure your `.env.local` file has the correct token
2. Restart your development server
3. Check that the token has the correct permissions

### Token not working?
1. Verify the token is valid in GitHub settings
2. Make sure the token has `public_repo` scope
3. Check that the token hasn't expired

### Cache issues?
- The cache automatically expires after 5 minutes
- You can restart the server to clear cache manually

## Security Notes
- Never commit your `.env.local` file to version control
- The token is only used server-side and never exposed to the client
- Use the minimum required permissions (`public_repo` only) 