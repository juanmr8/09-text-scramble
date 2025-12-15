import React from 'react';

function Nav() {
	return (
		<div className='flex items-center gap-2 border-b py-3 px-8'>
			<div className='bg-foreground size-8 rounded-full' />
			<span className='text-foreground font-display text-sm text-[24px] font-bold'>
				AOB
			</span>
		</div>
	);
}

export default Nav;
