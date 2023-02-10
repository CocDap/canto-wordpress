export const useGutenbergData = () => {
	// get data-content, data-title from dom
	const content = document.querySelector("[data-content]")?.dataset.content;
	const title = document.querySelector("[data-title]")?.dataset.title;

	// data-nft-address, data-nft-id
	const nftAddress =
		document.querySelector("#nft-required")?.dataset.nftAddress;
	const nftId = document.querySelector("#nft-required")?.dataset.nftId;

	// price
	const price = document.querySelector("#paid-required")?.dataset.price;

	return {
		content,
		title,
		nft: {
			address: nftAddress,
			id: nftId,
		},
		paid: {
			price,
		},
	};
};
