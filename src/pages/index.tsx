import { getOptionsForVote } from "@/utils/getRandomPokemon";
import { trpc } from "@/utils/trpc";
import type { NextPage } from "next";
import Image from "next/image";
import { useState } from "react";
import type React from "react";
import { inferQueryResponse } from "../utils/trpc";

const Home: NextPage = () => {
  const [ids, updateIds] = useState(() => getOptionsForVote());
  const [first, second] = ids;

  const hello = trpc.useQuery(["hello"]);

  const firstPokemon = trpc.useQuery(["get-pokemon-by-id", { id: first }]);
  const secondPokemon = trpc.useQuery(["get-pokemon-by-id", { id: second }]);

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
        {!firstPokemon.isLoading &&
          firstPokemon.data &&
          !secondPokemon.isLoading &&
          secondPokemon.data && (
            <PokemonListing
              pokemon={firstPokemon.data}
              vote={() => {
                voteForRoundest(first);
              }}
            />
          )}

        <div className="flex justify-center items-center text-slate-200 p-8 text-lg">
          {!hello.isLoading && hello.data && hello.data.greeting}
        </div>

        <div className=" flex flex-col items-center">
          {!firstPokemon.isLoading &&
            firstPokemon.data &&
            !secondPokemon.isLoading &&
            secondPokemon.data && (
              <PokemonListing
                pokemon={secondPokemon.data}
                vote={() => {
                  voteForRoundest(second);
                }}
              />
            )}
        </div>
      </div>
    </div>
  );
};

type PokemoneFromServer = inferQueryResponse<"get-pokemon-by-id">;

const PokemonListing: React.FC<{
  pokemon: PokemoneFromServer;
  vote: () => void;
}> = (props) => {
  return (
    <div className="flex flex-col items-center">
      <Image
        src={props.pokemon.sprites.front_default}
        alt=""
        width={140}
        height={140}
      />
      <div className="text-slate-200 capitalize text-xl">
        {props.pokemon.name}
      </div>
      <button
        className="bg-slate-200 text-slate-800 p-2 rounded-lg mt-4 text-sm"
        onClick={props.vote}>
        Rounder
      </button>
    </div>
  );
};

export default Home;
