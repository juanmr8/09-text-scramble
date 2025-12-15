'use client';

import Button from '@/components/button';

export default function Page() {
	return (
		<div className='min-h-screen'>
			<Title />
			<div className='grid h-full grid-cols-12'>
				<LeftColumn />
				<RightColumn />
			</div>
		</div>
	);
}

const Title = () => {
	return (
		<>
			<div className='mx-[32px] mt-[24px]'>
				<h1 className='text-display pb-2 text-center text-[7vw] leading-[0.85] font-bold tracking-[-.45vw] uppercase lg:text-[7.7vw] 2xl:text-[7.7vw]'>
					The Atlas of Brutalism
				</h1>
			</div>
			<div className='bg-foreground h-[33px]' />
		</>
	);
};

const LeftColumn = () => {
	return (
		<div className='col-span-5'>
			<p className='pt-4 pr-[16px] pb-[32px] text-right font-mono leading-none'>
				[Scroll to Explore]
			</p>
			<div className=''>
				<img
					src='/e09/brutalist-graphic.png'
					alt='Left Column Background'
					className='aspect-[688/671] h-[671px] w-full object-fill'
				/>
			</div>
		</div>
	);
};

const RightColumn = () => {
	return (
		<div className='col-span-7 flex flex-col gap-[200px] justify-between border-l p-4 pr-8'>
			<div className='flex items-center justify-between'>
				<img src='/e09/small-square.png' />
				<div className='flex items-center gap-2'>
					<div className='bg-foreground size-4 rounded-full' />
					<img src='/e09/triangle.svg' />
				</div>
			</div>
			<div className='grid grid-cols-7'>
				<div className='col-span-5 pb-8'>
					<p className='font-display font-700 text-[32px] leading-[0.92] tracking-[-2%]'>
						Browse brutalist buildings by city, architect, or decade. Find
						what's near you or explore iconic structures worldwide
					</p>
					<div className='flex items-center gap-4 pt-4'>
						<input
							placeholder='Search by city, architect, or decade'
							className='col-span-2 w-full border-b pb-1 font-mono text-[18px] tracking-[-.6px]'
						/>
						<Button>Search</Button>
					</div>
				</div>
				<div className='col-span-7 flex w-full gap-4'>
					<div className='aspect-370/314'>
						<img
							src='/e09/building-1.jpg'
							className='h-full w-full object-cover'
						/>
					</div>

					<div className='aspect-413/314'>
						<img
							src='/e09/building-2.jpg'
							className='h-full w-full object-cover'
						/>
					</div>
					<div className='aspect-132/314'>
						<img
							src='/e09/building-3.jpg'
							className='h-full w-full object-cover'
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
