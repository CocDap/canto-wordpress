import {
	BlockToolbar, RichText,
} from '@wordpress/block-editor';
import { __ } from "@wordpress/i18n";
import { useBlockProps } from "@wordpress/block-editor";
import { Button } from "@wordpress/components";
import "./editor.scss";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({
	attributes: {
		content,
		title,
	},
	setAttributes,
}) {
	const onChangeContent = (newContent) => {
		setAttributes({ content: newContent });
	};

	const onChangeTitle = (newTitle) => {
		setAttributes({ title: newTitle });
	};

	return (
		<figure {...useBlockProps()}>
			<div className="wallet">
				{/* __title */}
				<div className="wallet__title">
					<RichText
						onChange={onChangeTitle}
						placeholder="Write a title..."
						value={title}
						keepPlaceholderOnFocus
					/>
				</div>

				{/* &__wallet-address */}
				<div className="wallet__address">
					<RichText
						tagName="div"
						value={content}
						onChange={onChangeContent}
						placeholder="Write a wallet address..."
						keepPlaceholderOnFocus
					/>
				</div>
			</div>
		</figure>
	);
}
