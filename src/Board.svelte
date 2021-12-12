<script>
    export let onClick, number;
  </script>
  
  <style>
    .board {
      background: transparent;
      cursor: pointer;
      border: 3px solid #373833;
      border-radius: 15px;
      display: grid;
      place-items: center;
      font-family: "Permanent Marker", cursive;
    }
    .board:hover {
      background-color: #37383370;
    }
    .board:active{
      background: transparent;
    }
    .board p {
      font-size: 4.5rem;
      font-weight: bold;
    }
  </style>
  
  <div class="board" on:click={onClick} {number}>
    <p />
  </div>