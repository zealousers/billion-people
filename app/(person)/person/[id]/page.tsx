import Image from "next/image";
import Link from "next/link";

export async function generateMetadata({ params: { id } }: { params: { id: string } }) {
  return {
    title: `${id} Profile`,
  };
}
async function GetBigManDetail(id: string) {
  const response = await fetch(`https://billions-api.nomadcoders.workers.dev/person/${id}`);
  const detailData = await response.json();
  return detailData;
}

export default async function BigManDetail({ params: { id } }: { params: { id: string } }) {
  const bigManDetail = await GetBigManDetail(id);
  return (
    <main className='min-h-screen full flex flex-col items-center justify-between px-40 py-10 bg-neutral-900'>
      <div className='w-full flex flex-col items-start justify-center bg-neutral-800 p-5 rounded-xl '>
        <div className='flex flex-row items-end gap-5'>
          <Image
            className='rounded-lg'
            src={bigManDetail.squareImage}
            alt={bigManDetail.name}
            width={280}
            height={425}
          />
          <div className='space-y-10 mp'>
            <h2 className='text-6xl font-bold'>{bigManDetail.name}</h2>
            <ul className='space-y-1 flex flex-col items-end *:font-light'>
              <li>Networth : {Math.round(Number(bigManDetail.netWorth) / 1000)} Billion</li>
              <li>Country : {bigManDetail.country}</li>
              <li>Industries : {bigManDetail.industries}</li>
            </ul>
          </div>
        </div>
        <div className='grid grid-cols-3 items-end justify-items-end gap-5 mt-10 *:mb-5'>
          <h3 className='font-medium text-2xl '>Biography</h3>
          <p className='col-span-2 text-justify text-slate-300 font-light'>{bigManDetail.bio}</p>
          {/* </div>
        <div className='grid grid-cols-3 items-end justify-items-end gap-5 mt-10'> */}
          <h3 className='font-medium text-2xl '>About</h3>
          <p className='col-span-2 text-justify text-slate-300 font-light'>{bigManDetail.about}</p>
        </div>
      </div>

      <div className='w-full flex flex-col items-stretch gap-5 bg-neutral-800 p-5 mt-12 rounded-xl'>
        <div>
          <h3 className='font-medium text-2xl'>Financial Assets</h3>
        </div>
        <div className='grid grid-cols-4 gap-4'>
          {bigManDetail.financialAssets.map((asset: any) => (
            <ul
              key={asset.id}
              className='rounded-xl border-neutral-400 border p-4 *:font-normal *:text-sm *:py-2 *:text-neutral-300'
            >
              <li>Ticker : {asset.ticker}</li>
              <li>Shares : {asset.numberOfShares.toLocaleString()}</li>
              {asset.exerciseOptionPrice ? (
                <li>Exercise Price : ${asset.exerciseOptionPrice}</li>
              ) : null}
            </ul>
          ))}
        </div>
      </div>
      <Link
        href='/'
        className='transition text-2xl text-neutral-100 font-normal m-10 px-20 py-1 border rounded-full border-neutral-200 marker:bg-neutral-900 hover:text-neutral-900 hover:bg-neutral-50 hover:border-neutral-50 hover:scale-105'
      >
        Back
      </Link>
    </main>
  );
}
