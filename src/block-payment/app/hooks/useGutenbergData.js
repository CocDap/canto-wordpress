export const useGutenbergData = () => {
	// get data-content, data-title from dom
	const content = document.querySelector("[data-content]").dataset.content;
	const title = document.querySelector("[data-title]").dataset.title;

	return { content, title };
};
