import Head from "next/head";

function DocumentHead() {
  return (
    <Head>
      <title>Telegram - by Reedemer</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta
        property="og:title"
        content="Telegram - by Reedemer : a new era of messaging"
      />
      <meta property="og:image" content="https://telegram.org/img/t_logo.png" />
      <meta property="og:site_name" content="Telegram" />
      <meta property="og:description" content="Fast. Secure. Powerful." />
      <link rel="icon" href="favicon.png" type="image/png"></link>
    </Head>
  );
}

export default DocumentHead;
