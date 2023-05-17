import React from "react";
import { Layout, Page } from "ui";
import { PageType, SeoType, fetcher, getUrl } from "utils";

interface PageProps extends PageType {
  seo: SeoType;
}

export default function index(props: PageProps) {
  const { seo, ...rest } = props;

  return (
    <Layout title={seo?.title} description={seo?.description}>
      <Page data={rest} />
    </Layout>
  );
}

export async function getStaticProps() {
  const { success, error } = await fetcher(getUrl("/api/page-contact"));
  const header = await fetcher(getUrl("/api/layout-header"));
  const footer = await fetcher(getUrl("/api/layout-footer"));

  if (error || !success || footer.error || header.error) {
    return { props: {} };
  }

  return {
    props: {
      seo: success.seo,
      sections: success.sections,
      header: success.header ? header.success : null,
      footer: success.footer ? footer.success : null,
    },
  };
}