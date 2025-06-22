import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App.tsx'
import 'normalize.css'
import './styles/main.scss'
import theme from './styles/theme.tsx'
import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline/>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>
)
