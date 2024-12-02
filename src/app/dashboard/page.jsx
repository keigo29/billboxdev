import Link from "next/link";
export default function Dashboard() {
    return (
      <div>
        <h1>Dashboard</h1>
        <Link href="dashboard/addBill">新規登録</Link>

        <div>ガントチャート</div>
        <div>直近todo</div>
      </div>
    );
  }
  