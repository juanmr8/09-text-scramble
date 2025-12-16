import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrambleTextPlugin from 'gsap/ScrambleTextPlugin';
import SplitText from 'gsap/SplitText';

gsap.registerPlugin(ScrambleTextPlugin, SplitText);

interface TextScrambleProps {
	finalText?: string;
	randomChars?: string;
	autoDelete?: boolean;
	delay?: number;
	fontSize?: string;
	readableDuration?: number;
	inSpeed?: number;
	outSpeed?: number;
	shuffleSpeed?: number;
	onComplete?: () => void;
}

export default function TextScramble({
	finalText = 'Hello World',
	randomChars = '#@$%^&*()w+-=[]{}|;:,.<>?`~',
	autoDelete = true,
	delay = 0,
	fontSize = '20px',
	readableDuration = 1,
	inSpeed = 1,
	outSpeed = 1,
	shuffleSpeed = 1,
	onComplete,
}: TextScrambleProps) {
	const ref = useRef<HTMLParagraphElement>(null);

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			if (!ref.current) return;

			const tl = gsap.timeline();
			const split = SplitText.create(ref.current, {
				type: 'chars',
			});
			tl.set(split.chars, { opacity: 0 });
			tl.set(ref.current, { opacity: 1 });

			const staggerDelay = 0.035;

			split.chars.forEach((char, index) => {
				const randomChar =
					randomChars[Math.floor(Math.random() * randomChars.length)];

				const startTime = index * staggerDelay;

				tl.set(char, { textContent: randomChar, opacity: 1 }, startTime);

				tl.to(
					char,
					{
						scrambleText: {
							text: char.textContent || '',
							chars: randomChars,
							speed: shuffleSpeed,
						},
						duration: 1 / inSpeed,
						ease: 'linear',
					},
					startTime
				);
			});

			if (autoDelete) {
				tl.add('startOut', `+=${readableDuration}`);
				const outDelay = 0.035 / outSpeed;

				split.chars.forEach((char, index) => {
					const randomEndChar =
						randomChars[Math.floor(Math.random() * randomChars.length)];

					tl.to(
						char,
						{
							scrambleText: {
								text: randomEndChar,
								chars: randomChars,
								speed: outSpeed,
								newClass: 'opacity-0',
							},
							duration: 0.5 / outSpeed,
							ease: 'linear',
						},
						`startOut+=${outDelay * index}`
					);
				});
			}
			if (onComplete) {
				setTimeout(
					() => {
						onComplete();
					},
					tl.duration() * 1000 + delay
				);
			}
		}, delay);

		return () => {
			clearTimeout(timeoutId);
			if (ref.current) {
				gsap.killTweensOf(ref.current);
			}
		};
	}, [
		finalText,
		randomChars,
		autoDelete,
		delay,
		readableDuration,
		inSpeed,
		outSpeed,
		shuffleSpeed,
		onComplete,
	]);

	return (
		<p className='font-mono opacity-0' style={{ fontSize }} ref={ref}>
			{finalText}
		</p>
	);
}
