import React, { useEffect } from 'react';

type TUseOutsideClick = {
	isOpen: boolean;
	objectRef: React.RefObject<HTMLElement>;
	onOutsideClick: () => void;
};

// Хук для отслеживания кликов вне зоны компонента
export function useOutsideClick({
	isOpen,
	objectRef,
	onOutsideClick,
}: TUseOutsideClick) {
	function handleOnClick(event: MouseEvent) {
		if (
			objectRef.current &&
			!objectRef.current.contains(event.target as Node)
		) {
			onOutsideClick();
		}
	}

	useEffect(() => {
		if (!isOpen) return;
		document.body.addEventListener('mousedown', handleOnClick);
		return () => {
			document.body.removeEventListener('mousedown', handleOnClick);
		};
	}, [isOpen, handleOnClick]);
}
