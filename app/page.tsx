'use client';
import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrambleTextPlugin from 'gsap/ScrambleTextPlugin';
import SplitText from 'gsap/SplitText';
gsap.registerPlugin(ScrambleTextPlugin, SplitText);

export default function Page() {
	return (
		<div className='grid h-screen w-screen grid-cols-3 gap-4 py-10'>
			<div className='col-span-3 flex items-center justify-center'>
				<TextScramble finalText='Hello World' fontSize='24px' />
			</div>
			<div className='col-span-3 flex items-center justify-center'>
				<TextScramble
					finalText='Hello World'
					randomChars='01'
					delay={200}
					fontSize='24px'
				/>
			</div>
			<div className='col-span-3 flex items-center justify-center'>
				<TextScramble finalText='Hello World' delay={400} fontSize='24px' />
			</div>
		</div>
	);
}

const TextScramble = ({
	finalText = 'Hello World',
	randomChars = '#@$%^&*()w+-=[]{}|;:,.<>?`~',
	autoDelete = true,
	delay = 0,
	fontSize = '20px',
}: {
	finalText?: string;
	randomChars?: string;
	autoDelete?: boolean;
	delay?: number;
	fontSize?: string;
}) => {
	const ref = useRef<HTMLParagraphElement>(null);

	useEffect(() => {
		setTimeout(() => {
			if (!ref.current) return;
			const tl = gsap.timeline();
			const split = SplitText.create(ref.current, {
				type: 'chars',
			});
			tl.set(split.chars, { opacity: 0 });
			tl.set(ref.current, { opacity: 1 });
			const staggerDelay = 0.035; // Stagger between each character start
			const charTl = gsap.timeline();

			split.chars.forEach((char, index) => {
				const randomChar =
					randomChars[Math.floor(Math.random() * randomChars.length)];

				gsap.set(char, { opacity: 1, duration: 0 });
				// Step 1: Scramble IN from random chars to final text
				tl.set(
					char,
					{
						textContent: randomChar, // Start with random char
						opacity: 1,
					},
					index * staggerDelay
				);
				// Step 2: Scramble IN from final text to random chars
				tl.to(
					char,
					{
						scrambleText: {
							text: char.textContent || '',
							chars: randomChars,
							speed: 0.5,
						},
						duration: 2,
						ease: 'linear',
					},
					(staggerDelay * index) / 3
				);
			});
			// Step 3: Scramble OUT
			if (autoDelete) {
				tl.add(() => {
					const outDelay = 0.035;

					split.chars.forEach((char, index) => {
						console.log('outDelay', outDelay * index);
						const randomEndChar =
							randomChars[Math.floor(Math.random() * randomChars.length)];

						charTl.to(
							char,
							{
								scrambleText: {
									text: randomEndChar,
									chars: randomChars,
									speed: 1,
									newClass: 'opacity-0',
								},
								duration: 1,
								ease: 'linear',
							},
							outDelay * index
						);
					});
				});
			}
		}, delay);

		return () => {
			if (ref.current) {
				gsap.killTweensOf(ref.current);
			}
		};
	}, []);

	return (
		<p className='font-mono opacity-0' style={{ fontSize }} ref={ref}>
			{/* Start with empty spaces to avoid hydration mismatch */}
			{finalText}
		</p>
	);
};
