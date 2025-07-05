# Install backend dependencies
npm init -y
npm install express mongoose cors dotenv
npm install --save-dev typescript ts-node @types/express @types/cors @types/node @types/mongoose

# Initialize TypeScript
npx tsc --init

# Create required directories
mkdir -p src/controllers src/models src/routes src/utils

# Create .env file if it doesn't exist
if (-not (Test-Path .env)) {
    Copy-Item .env.example .env
    Write-Host "Created .env file from .env.example"
}

Write-Host "Backend setup complete. Please edit the .env file with your configuration."
