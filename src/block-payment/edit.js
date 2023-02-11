import { BlockToolbar, RichText } from "@wordpress/block-editor";
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
	attributes: { content, title },
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
				{/* &__wallet-address */}
				<div className="wallet__address">
					<div
						style={{
							fontSize: "12px",
							borderLeft: "6px solid #f000ee",
							paddingLeft: "12px",
							marginBottom: "20px",
						}}
					>
						This is a donate section block. You can have this block everywhere.
						<br />
						Look at the demo below to see how it works.
					</div>

					{/* <RichText
						tagName="div"
						value={content}
						onChange={onChangeContent}
						placeholder="Write your wallet address..."
						keepPlaceholderOnFocus
						style={{
							backgroundColor: "white",
							color: "black",
							padding: "10px 20px",
							borderRadius: "20px",
						}}
					/> */}
				</div>
			</div>
		</figure>
	);
}
