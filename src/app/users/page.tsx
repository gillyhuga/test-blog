import { Tag } from 'antd';
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Tag color="magenta">Users</Tag>
    </div>
  );
}
