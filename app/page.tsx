import { AddTask } from "../app/src/components/AddTask";

export default function Home() {
  return (
    <div className="max-w-xl mx-auto py-10 space-y-6">
      <h1 className="text-3xl font-bold text-center">
        Task Master Pro
      </h1>
      <AddTask />
    </div>
  );
}