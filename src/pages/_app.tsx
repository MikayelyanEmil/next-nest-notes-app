import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import Layout from '../components/Layout/Layout'
import { useState } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [signup, showSignup] = useState(true);
  pageProps.isAuthorized = isAuthorized;
  pageProps.setIsAuthorized = setIsAuthorized;
  pageProps.loading = loading;
  pageProps.setLoading = setLoading;
  pageProps.signup = signup;
  pageProps.showSignup = showSignup;
  return <Layout isAuthorized={isAuthorized} setIsAuthorized={setIsAuthorized} loading={loading} setLoading={setLoading} signup={signup} showSignup={showSignup} >
    <Component {...pageProps} />
  </Layout>

}
