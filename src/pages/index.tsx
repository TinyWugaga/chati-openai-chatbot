import dynamic from "next/dynamic";

import { ChatBoxProvider } from "@/apps/ChatBox";

import { LoadingView } from "@/components/Layouts";
import { BasicLayout as Layout } from "@/components/Layouts";

const ChatBox = dynamic(() => import("@/components/ChatBox"), {
  loading: () => <LoadingView />,
  ssr: false,
});

export default function Home() {
  return (
    <ChatBoxProvider>
      <ChatBox />
    </ChatBoxProvider>
  );
}

Home.Layout = Layout;
