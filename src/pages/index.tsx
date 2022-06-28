import { getOptionsForVote } from "@/utils/getRandomPokemon";
import { trpc } from "@/utils/trpc";
import type { NextPage } from "next";
import Image from "next/image";
import { useState } from "react";

const Home: NextPage = () => {
  const [ids, updateIds] = useState(() => getOptionsForVote());

  const [first, second] = ids;

  const firstPokemon = trpc.useQuery(["get-pokemon-by-id", { id: first }]);
  const secondPokemon = trpc.useQuery(["get-pokemon-by-id", { id: second }]);

  if (firstPokemon.isLoading || secondPokemon.isLoading) return null;

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <h3 className="text-slate-200">Which pokemon is roundest?</h3>
      <div className="h-6"></div>
      <div className="flex border rounded-xl p-8">
        <div className="h-32 w-32 flex flex-col items-center">
          <Image
            src={firstPokemon.data?.sprites.front_default}
            alt=""
            width={400}
            height={400}
          />
          <div className="text-slate-200 capitalize">{firstPokemon.data?.name}</div>
        </div>
        <div className="h-32 w-32 flex justify-center items-center text-slate-200 text-lg">
          vs
        </div>
        <div className="h-32 w-32 flex flex-col items-center">
          <Image
            src={secondPokemon.data?.sprites.front_default}
            alt=""
            width={400}
            height={400}
          />
          <div className="text-slate-200 capitalize">{secondPokemon.data?.name}</div></div>
      </div>
    </div>
  );
};

export default Home;
