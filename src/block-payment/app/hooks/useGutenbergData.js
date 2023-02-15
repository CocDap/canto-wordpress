export const useGutenbergData = () => {
	// get data-content, data-title from dom
	const content = document.querySelector("[data-content]")?.dataset.content;
	const title = document.querySelector("[data-title]")?.dataset.title;

	// data-nft-address, data-nft-id
	const nftAddress =
		document.querySelector("#nft-required")?.dataset.nftAddress;

	// price
	const price = document.querySelector("#paid-required")?.dataset.price;

	// wallet address
	const walletAddress =
		document.querySelector("#paid-required")?.dataset.walletAddress;

	return {
		content,
		title,
		nft: {
			address: nftAddress,
		},
		paid: {
			price,
			walletAddress,
		},
	};
};
