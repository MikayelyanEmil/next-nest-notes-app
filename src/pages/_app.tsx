import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import Layout from '../components/Layout/Layout'
import { useState } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  const [lever, runFetch] = useState(false);
  const [body, setBody] = useState([]);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [signup, showSignup] = useState(true);
  const [user, setUser] = useState('');
  pageProps.lever = lever;
  pageProps.runFetch = runFetch;
  pageProps.isAuthorized = isAuthorized;
  pageProps.setIsAuthorized = setIsAuthorized;
  pageProps.loading = loading;
  pageProps.setLoading = setLoading;
  pageProps.signup = signup;
  pageProps.showSignup = showSignup;
  pageProps.user = user;
  pageProps.setUser = setUser;
  pageProps.body = body;
  pageProps.setBody = setBody;
  return <Layout isAuthorized={isAuthorized} setIsAuthorized={setIsAuthorized} loading={loading} setLoading={setLoading} signup={signup} showSignup={showSignup} user={user} setUser={setUser} setBody={setBody} lever={lever} runFetch={runFetch}>
    <Component {...pageProps} />
  </Layout>

}
