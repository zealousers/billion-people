import Image from "next/image";
import Link from "next/link";
type BigMan = {
  id: string;
  squareImage: string;
  name: string;
  netWorth: number;
  industries: string;
};

const API_URL = "https://billions-api.nomadcoders.workers.dev";

async function GetBigManList() {
  const response = await fetch(API_URL);
  const listData = await response.json();
  return listData;
}
export default async function Home() {
  const bigManList = await GetBigManList();
  return (
    <main className='flex min-h-screen flex-col items-center justify-between px-40 py-10 bg-neutral-900'>
      <div className='grid grid-cols-4 gap-5'>
        {bigManList.map((bigMan: BigMan) => (
          <Link
            key={bigMan.id}
            href={`/person/${bigMan.id}`}
            className='bg-neutral-700 p-2 transition hover:scale-105 hover:shadow-xl hover:shadow-blue-400/50 rounded-md'
          >
            <img
              src={bigMan.squareImage}
              alt={bigMan.name}
              width={416}
              height={416}
              className='rounded-md'
            />
            {/* <Image src={bigMan.squareImage} alt={bigMan.name} width={416} height={416} /> */}
            <h1 className='pt-5 font-extrabold text-xl'>{bigMan.name}</h1>
            <span className='flex flex-row items-center'>
              <h4 className='pb-5 font-normal'>
                {Math.round(Number(bigMan.netWorth) / 1000)} Billion
              </h4>
              <h4 className='pb-5 font-bold px-2'> / </h4>
              <h4 className='pb-5 font-thin'>{bigMan.industries}</h4>
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}
