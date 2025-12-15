import React from 'react'

function button({children, className = ''}: {children: React.ReactNode, className?: string}) {
  return (
	<div className={`bg-foreground py-3 px-5 rounded-sm text-background text-[14px] uppercase font-bold leading-none ${className}`}>
		{children}
	</div>
  )
}

export default button
