import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import {
  revalidate,
  FlushedChunks,
  flushChunks,
} from "@module-federation/nextjs-mf/utils";

const MyDocument = (props) => {
  return (
    <Html>
      <Head>
        <meta name="robots" content="noindex" />
        {/* @ts-ignore */}
        <FlushedChunks chunks={props.chunks} />
      </Head>

      <body className="bg-background-grey">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

MyDocument.getInitialProps = async (ctx) => {
  if (
    process.env.NODE_ENV === "development" &&
    !ctx.req.url.includes("_next")
  ) {
    await revalidate().then((shouldReload) => {
      if (shouldReload) {
        ctx.res.writeHead(302, { Location: ctx.req.url });
        ctx.res.end();
      }
    });
  } else if (ctx && ctx?.res && ctx?.res?.on) {
    ctx?.res?.on("finish", () => {
      revalidate();
    });
  }

  const chunks = await flushChunks();
  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    chunks,
  };
};

export default MyDocument;
