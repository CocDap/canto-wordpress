/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, RichText } from "@wordpress/block-editor";
import { Button } from "@wordpress/components";

/**
 *
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save({ attributes: { content, title } }) {
	return (
		<figure {...useBlockProps.save()} data-title={title} data-content={content}>
			{/* <div className="wallet">
				<div className="wallet__title">
					<RichText.Content
						placeholder="Write a title..."
						value={title}
						keepPlaceholderOnFocus
					/>
				</div>

				<div className="wallet__address">
					<RichText.Content
						tagName="div"
						value={content}
						placeholder="Write a wallet address..."
						keepPlaceholderOnFocus
					/>
				</div>
			</div> */}
		</figure>
	);
}
