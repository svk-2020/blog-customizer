import { FormEvent, useRef, useState } from 'react';
import clsx from 'clsx';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
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

type TArticleProps = {
	setArticleState: (value: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ setArticleState }: TArticleProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const formRef = useRef<HTMLFormElement | null>(null);
	const [articleSettings, setArticleSettings] =
		useState<ArticleStateType>(defaultArticleState);

	useOutsideClick({
		isOpen: isOpen,
		objectRef: formRef,
		onOutsideClick: () => setIsOpen(false),
	});

	const submitForm = (event: FormEvent) => {
		event.preventDefault();
		setArticleState(articleSettings);
	};

	const resetForm = () => {
		setArticleSettings(defaultArticleState);
		setArticleState(defaultArticleState);
	};

	const setFontFamily = (select: OptionType) => {
		setArticleSettings({ ...articleSettings, fontFamilyOption: select });
	};

	const setFontSize = (select: OptionType) => {
		setArticleSettings({ ...articleSettings, fontSizeOption: select });
	};

	const setFontColor = (select: OptionType) => {
		setArticleSettings({ ...articleSettings, fontColor: select });
	};

	const setBackgroundColor = (select: OptionType) => {
		setArticleSettings({ ...articleSettings, backgroundColor: select });
	};

	const setContentWith = (select: OptionType) => {
		setArticleSettings({ ...articleSettings, contentWidth: select });
	};

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
					<Text size={31} weight={800} uppercase={true}>
						Задайте параметры
					</Text>
					<Select
						selected={articleSettings.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={setFontFamily}
						title='Шрифт'
					/>
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={articleSettings.fontSizeOption}
						onChange={setFontSize}
						title='Размер шрифта'
					/>
					<Select
						selected={articleSettings.fontColor}
						options={fontColors}
						onChange={setFontColor}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						selected={articleSettings.backgroundColor}
						options={backgroundColors}
						onChange={setBackgroundColor}
						title='Цвет фона'
					/>
					<Select
						selected={articleSettings.contentWidth}
						options={contentWidthArr}
						onChange={setContentWith}
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
