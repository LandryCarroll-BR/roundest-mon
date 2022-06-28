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
  let pokemonOne: any = firstPokemon.data?.sprites.front_default;
  let pokemonTwo: any = secondPokemon.data?.sprites.front_default;

  if (firstPokemon.isLoading || secondPokemon.isLoading) return null;

  const voteForRoundest = (selected: number) => {
    //todo: fire mutation to persist changes

    updateIds(getOptionsForVote);
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center p-8">
      <h3 className="text-slate-200">Which pokemon is roundest?</h3>
      <div className="h-6"></div>
      <div className="bg-slate-800 shadow-xl border border-slate-700 flex rounded-xl px-8 pt-2 pb-10 max-w-lg items-center justify-center">
        <div className="flex flex-col items-center">
          <Image src={pokemonOne} alt="" width={140} height={140} />
          <div className="text-slate-200 capitalize text-xl">
            {firstPokemon.data?.name}
          </div>
          <button
            className="bg-slate-200 text-slate-800 p-2 rounded-lg mt-4 text-sm"
            onClick={() => {
              voteForRoundest(first);
            }}>
            Rounder
          </button>
        </div>
        <div className="flex justify-center items-center text-slate-200 p-8 text-lg">
          vs
        </div>
        <div className=" flex flex-col items-center">
          <Image src={pokemonTwo} alt="" width={140} height={140} />
          <div className="text-slate-200 capitalize text-xl">
            {secondPokemon.data?.name}
          </div>
          <button
            className="bg-slate-200 text-slate-800 p-2 rounded-lg mt-4  text-sm"
            onClick={() => {
              voteForRoundest(first);
            }}>
            Rounder
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
