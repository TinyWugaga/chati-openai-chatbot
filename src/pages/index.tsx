import { ChatBoxProvider } from "@/apps/ChatBox";

import { BasicLayout as Layout } from "@/components/Layouts";
import ChatBox from "@/components/ChatBox";

export default function Home() {
  return (
    <ChatBoxProvider>
      <Layout>
        <ChatBox />
      </Layout>
    </ChatBoxProvider>
  );
}
