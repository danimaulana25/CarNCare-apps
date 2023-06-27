import '@/styles/globals.css'
import Layout from '../../components/Layout'
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>DealerApps</title>
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}
