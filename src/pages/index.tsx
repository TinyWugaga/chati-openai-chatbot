import dynamic from "next/dynamic";

import { ChatBoxProvider } from "@/apps/ChatBox";

import LoadingBar from "@/components/Layouts/LoadingBar";
import { BasicLayout as Layout } from "@/components/Layouts";

const ChatBox = dynamic(() => import("@/components/ChatBox"), {
  loading: () => <LoadingBar />,
});

export default function Home() {
  return (
    <ChatBoxProvider>
      <Layout>
        <ChatBox />
      </Layout>
    </ChatBoxProvider>
  );
}
