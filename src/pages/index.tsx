import { trpc } from "@/utils/trpc";
import type { NextPage } from "next";

const Home: NextPage = () => {
  const { data, isLoading } = trpc.useQuery(["hello", { text: "Landry" }]);

  if (isLoading) return <h1>Loading...</h1>;

  if (data)
    return (
      <h1 className=" text-xl text-slate-200 font-bold">{data.greeting}</h1>
    );

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <h3 className="text-slate-200">Which pokemon is roundest?</h3>
      <div className="h-6"></div>
      <div className="flex border rounded-xl p-8">
        <div className="h-16 w-16 bg-red-200"></div>
        <div className="h-16 w-16 flex justify-center items-center text-slate-200">
          vs
        </div>
        <div className="h-16 w-16 bg-red-200"></div>
      </div>
    </div>
  );
};

export default Home;
