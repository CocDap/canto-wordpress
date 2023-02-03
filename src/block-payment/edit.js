import { BlockToolbar, RichText } from '@wordpress/block-editor';
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
		alignment,
		textColor,
	},
	setAttributes,
	className,
}) {
	return (
		<div {...useBlockProps()}>
			<RichText
				tagName="p"
				className={className}
				style={{
					color: textColor,
				}}
				value={content}
				onChange={(content) => setAttributes({ content })}
				placeholder="Write a paragraph..."
				keepPlaceholderOnFocus
			/>

			<div className="card">
				Hi

				<button
					className=""
				>
					Click me
				</button>
			</div>
		</div>
	);
}
