import { getBaseUrl } from 'lib/requests/api.request';
import {ResolvingMetadata} from 'next'
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { ERoutes } from "schemas/routes";

import FeatureHome from "@/features/home";
import { getMessages } from "@/lib/messages";

export async function generateMetadata({ params },parent: ResolvingMetadata) {
  const { locale } = params;
  const messages = (await getMessages(locale)) as {
    seo: {
      default: {
        title: string;
        description: string;
      };
    };
  };
  const previousImages = (await parent).openGraph?.images ?? []
  return {
    title: messages.seo.default.title,
    description: messages.seo.default.description,
    openGraph: {
      images: ['/og-image.png', ...previousImages],
      url: getBaseUrl(),
    },
  };
}

export default async function Page() {
  const session = await getServerSession();
  if (session) {
    redirect(`/${ERoutes.HOME}`);
  }

  return <FeatureHome />;
}
