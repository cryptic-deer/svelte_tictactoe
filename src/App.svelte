<script>
	import Board from "./Board.svelte";

	const title = "Tic-Tac-Toe"

	let winningCombo = [
	  [0, 1, 2],
	  [3, 4, 5],
	  [6, 7, 8],
	  [0, 3, 6],
	  [1, 4, 7],
	  [2, 5, 8],
	  [0, 4, 8],
	  [2, 4, 6],
	];

	let arr = [];
	let usersTurn = true;
	let message = "";

	const userMove = (e) => {
	  if (e.target.firstChild.innerHTML == "" && !message && usersTurn) {
		e.target.firstChild.innerHTML = "X";

		arr.push(parseInt(e.target.getAttribute("number")));
		winner(0);

		usersTurn = false;

		if (arr.length != 9) {
		  computerMove();
		}
		if (arr.length == 9 && !message) {
		  message = "Draw!";
		}
	  }
	};

	const computerMove = () => {
	  if (!message) {
		setTimeout(() => {
		  let num;

		  do {
			num = Math.floor(Math.random() * 9);
		  } while (arr.includes(num));

		  let arr2 = arr.filter((_val, i) => i % 2 == 0);
		  let arr3 = arr.filter((_val, i) => i % 2 == 1);

		  winningCombo.forEach((array) => {
			if (
			  array.some((element) => arr2.includes(element)) &&
			  !array.some((element) => arr3.includes(element))
			) {
			  const findCommon = (a, b) => a.filter((n) => b.indexOf(n) !== -1);
			  const common = findCommon(array, arr2);

			  const findMissing = (a, b) => a.filter((n) => b.indexOf(n) == -1);
			  const missing = findMissing(array, common);
			  
			  if (common.length == 2) {
				if (!arr.includes(missing)) {
				  num = missing[0];
				}
			  } else if (common.length == 1) {
			  }
			}
		  });
		  const game = document.querySelector(".wrapper");
		  game.childNodes[num].firstChild.innerHTML = "O";

		  arr.push(num);
		  usersTurn = true;

		  winner(1);
		}, 400);
	  }
	};

	const winner = (perc) => {
	  if (arr.length >= 5) {
		let arr2 = arr.filter((_val, i) => i % 2 == perc);

		winningCombo.forEach((array) => {
		  if (array.every((element) => arr2.includes(element))) {
			if (perc == 0) {
			  message = "You won!";
			  const game = document.querySelector(".wrapper");

			  array.forEach((arr, _index) => {
				game.childNodes[arr].style.backgroundColor = "#99B898";
			  });
			} else {
			  message = "Computer won!";
			  const game = document.querySelector(".wrapper");

			  array.forEach((arr, _index) => {
				game.childNodes[arr].style.backgroundColor = "#E84A5F";
			  });
			}
		  }
		});
	  }
	};

	const reset = () => {
	  message = "";
	  arr = [];
	  usersTurn = true;

	  const game = document.querySelector(".wrapper").childNodes;

	  game.forEach((el) => {
		el.style.backgroundColor = "";
		el.firstChild.innerHTML = "";
	  });
	};

  </script>
  
  <style>
	main {
	  text-align: center;
	  padding: 1em;
	  max-width: 100%;
	  margin: 0 auto;
	  height: 100%;
	}
	.wrapper {
	  max-width: 400px;
	  height: 400px;
	  margin: 0 auto;
	  display: grid;
	  grid-template-columns: repeat(3, 1fr);
	  grid-template-rows: repeat(3, 1fr);
	  gap: 10px;
	}
	.title {
	  margin-top: 10vh;
	  margin-bottom: 10vh;
	  font-size: 5rem;
	}
	.reset {
	  margin-top: 10vh;
	  font-size: 2.5rem;
	  cursor: pointer;
	}
	@media only screen and (max-width: 450px){
		.title{
			font-size: 3rem;
		}
		.wrapper{
			max-height: 350px;
			max-width: 350px;
		}
		.reset{
			margin-top: 12vh;
			font-size: 2rem;
		}
	} 
  </style>
  
<svelte:head>
	<title>{title}</title>
</svelte:head>

  <main>
	<h1 class="title">{!message ? 'Tic Tac Toe' : message}</h1>
	<div class="wrapper">
	  {#each Array(9) as _field, index}
		<Board onClick={userMove} number={index} />
	  {/each}
	</div>
	<h1 class="reset" on:click={reset}>{!message ? 'Reset' : 'Play Again'}</h1>
  </main>