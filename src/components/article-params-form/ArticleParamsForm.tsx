import { FormEvent, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

import { ArrowButton } from '../arrow-button';
import { Button } from '../button';
import { Text } from '../text';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';

import styles from './ArticleParamsForm.module.scss';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';

type TArticleParamsFormProps = {
	setSettings: (value: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ setSettings }: TArticleParamsFormProps) => {
	// Состояние формы - открыта/закрыта
	const [isOpen, setIsOpen] = useState<boolean>(false);

	// Состояние - пользовательские настройки
	const [userSettings, setUserSettings] =
		useState<ArticleStateType>(defaultArticleState);

	// Общий контейнер компонента
	const refContainer = useRef<HTMLDivElement | null>(null);

	// Применение пользовательских настроек
	function submitForm(event: FormEvent) {
		event.preventDefault();
		setSettings(userSettings);
	}

	// Сброс к настройкам по умолчанию
	function resetForm(event: FormEvent) {
		event.preventDefault();
		setUserSettings(defaultArticleState);
		setSettings(defaultArticleState);
	}

	// Сохранение опции поля формы в пользовательские настройки
	function saveOption(option: keyof ArticleStateType) {
		return (selected: OptionType): void => {
			setUserSettings({ ...userSettings, [option]: selected });
		};
	}

	// Обработчик нажатия клавиши мыши вне формы (если она открыта)
	function handleMouseClick(event: MouseEvent) {
		if (refContainer.current && (event.target as Node)) {
			if (!refContainer.current.contains(event.target as Node) && isOpen) {
				setIsOpen(false);
			}
		}
	}

	useEffect(() => {
		// Добавляем слушатели после рендеринга компонента
		window.addEventListener('mousedown', handleMouseClick);
		return () => {
			// Удаляем слушатели после размонтирования компонента
			window.removeEventListener('mousedown', handleMouseClick);
		};
	}, [isOpen]);

	return (
		<div ref={refContainer}>
			<ArrowButton
				isOpen={isOpen}
				onClick={() => {
					setIsOpen(!isOpen);
				}}
			/>
			<aside
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form className={styles.form} onSubmit={submitForm} onReset={resetForm}>
					<Text
						size={31}
						weight={800}
						fontStyle={'normal'}
						uppercase={true}
						align={'left'}
						family='open-sans'>
						Задайте параметры
					</Text>
					<Select
						selected={userSettings.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={saveOption('fontFamilyOption')}
						title='Шрифт'
					/>
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={userSettings.fontSizeOption}
						onChange={saveOption('fontSizeOption')}
						title='Размер шрифта'
					/>
					<Select
						selected={userSettings.fontColor}
						options={fontColors}
						onChange={saveOption('fontColor')}
						title={'Цвет шрифта'}
					/>
					<Separator />
					<Select
						selected={userSettings.backgroundColor}
						options={backgroundColors}
						onChange={saveOption('backgroundColor')}
						title='Цвет фона'
					/>
					<Select
						selected={userSettings.contentWidth}
						options={contentWidthArr}
						onChange={saveOption('contentWidth')}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
