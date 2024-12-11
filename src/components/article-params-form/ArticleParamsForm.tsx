import { FormEvent, useRef, useState } from 'react';
import clsx from 'clsx';

import { ArrowButton } from '../arrow-button';
import { Button } from '../button';
import { Text } from '../text';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import { useOutsideClick } from './hook/useOutsideClick';

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

	// Контейнер формы
	const formRef = useRef<HTMLFormElement | null>(null);

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

	// при создании кастомного хука useOutsideClick использованы материалы статей:
	// https://sky.pro/wiki/javascript/obrabotka-klika-vne-komponenta-v-react-universalniy-metod/
	// https://spacejelly.dev/posts/how-to-detect-clicks-anywhere-on-a-page-in-react
	useOutsideClick({
		isOpen: isOpen,
		objectRef: formRef,
		onOutsideClick: () => setIsOpen(false),
	});

	return (
		<>
			<ArrowButton
				isOpen={isOpen}
				onClick={() => {
					setIsOpen(!isOpen);
				}}
			/>
			<aside
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form
					ref={formRef}
					className={styles.form}
					onSubmit={submitForm}
					onReset={resetForm}>
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
		</>
	);
};
