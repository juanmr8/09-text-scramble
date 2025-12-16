import React, { useCallback, useRef } from 'react';
import TextScramble from './text-scramble';

interface IntroProps {
	onComplete: () => void;
}

function Intro({ onComplete }: IntroProps) {
	const completedCount = useRef(0);
	const totalAnimations = 8;

	const handleAnimationComplete = useCallback(() => {
		completedCount.current += 1;

		if (completedCount.current === totalAnimations) {
			onComplete();
		}
	}, [onComplete]);
	return (
		<div className='bg-foreground text-background grid h-screen w-screen grid-cols-3 gap-4 py-10 pointer-events-none'>
			<div className='col-span-1 flex flex-col items-center justify-center'>
				<TextScramble
					finalText='Belgrado Sao Paulo London'
					fontSize='24px'
					onComplete={handleAnimationComplete}
				/>
				<TextScramble
					finalText='Belgrado Sao Paulo London'
					fontSize='24px'
					delay={200}
					onComplete={handleAnimationComplete}
				/>
				<TextScramble
					finalText='Belgrado Sao Paulo London'
					fontSize='24px'
					delay={400}
					onComplete={handleAnimationComplete}
				/>
				<TextScramble
					finalText='Belgrado Sao Paulo London'
					fontSize='24px'
					delay={600}
					onComplete={handleAnimationComplete}
				/>
				<TextScramble
					finalText='Belgrado Sao Paulo London'
					fontSize='24px'
					delay={800}
					readableDuration={1.5}
					onComplete={handleAnimationComplete}
				/>
			</div>
			<div className='col-span-3 flex flex-col items-center justify-center'>
				<TextScramble
					finalText='Brutalist Architecture'
					randomChars='01'
					delay={900}
					outSpeed={1.5}
					fontSize='24px'
					onComplete={handleAnimationComplete}
				/>{' '}
				<TextScramble
					finalText='Brutalist Architecture'
					randomChars='01'
					delay={1500}
					fontSize='24px'
					outSpeed={1.5}
					shuffleSpeed={2.5}
					onComplete={handleAnimationComplete}
				/>{' '}
				<TextScramble
					finalText='Brutalist Architecture'
					randomChars='01'
					delay={2000}
					fontSize='24px'
					inSpeed={1.25}
					outSpeed={1.5}
					shuffleSpeed={0.75}
					readableDuration={1.55}
					onComplete={handleAnimationComplete}
				/>
			</div>
			<div className='col-span-3 flex items-center justify-center'>
				<TextScramble
					finalText='In the world'
					delay={4900}
					fontSize='24px'
					onComplete={handleAnimationComplete}
				/>
			</div>
		</div>
	);
}

export default Intro;
