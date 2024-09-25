import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
//
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
// redux
import { store } from './redux/store'
import './translation/i18n'
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            retry: false
        }
    }
})

root.render(
    <Provider store={store}>
        <HelmetProvider>
            <BrowserRouter>
                <QueryClientProvider client={queryClient}>
                    <Suspense>
                        <App />
                    </Suspense>
                </QueryClientProvider>
            </BrowserRouter>
        </HelmetProvider>
    </Provider>
)
reportWebVitals()
