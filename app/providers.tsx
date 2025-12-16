'use client';
import React from 'react';
import { useState, useEffect, ReactNode } from 'react';
import gsap from 'gsap';
import Intro from '@/components/intro';

export function Providers({ children }: { children: React.ReactNode }) {
	const [showIntro, setShowIntro] = useState(false);
	const [isReady, setIsReady] = useState(false);

	useEffect(() => {
		const hasSeenIntro = sessionStorage.getItem('intro-completed');
		setShowIntro(!hasSeenIntro);
		setIsReady(true);
	}, []);

	const completeIntro = () => {
		gsap.to('.intro-container', {
			opacity: 0,
			duration: 1.2,
			ease: 'power2.inOut',
			onComplete: () => {
				sessionStorage.setItem('intro-completed', 'true');
				setShowIntro(false);
			},
		});
	};

	// Prevent hydration flash
	if (!isReady) return null;

	return (
		<>
			{children}
			{showIntro && (
				<div className='intro-container pointer-events-none fixed inset-0 z-50'>
					<Intro onComplete={completeIntro} />
				</div>
			)}
		</>
	);
}

export default Providers;
