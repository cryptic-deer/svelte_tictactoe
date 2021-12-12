import { publish } from "gh-pages";

publish(
	"public", // path to public directory
	{
		branch: "gh-pages",
		repo: "https://github.com/cryptic-deer/svelte_tictactoe.git",
		user: {
			name: "Dudli Tibor",
			email: "dtibibmx@gmail.com",
		},
	},
	() => {
		console.log("Deploy Complete!");
	}
);
