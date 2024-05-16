<!DOCTYPE html>
<html>
<head>
  <title>Gamefikasi - Gameplay</title>
  <link rel="stylesheet" type="text/css" href="{{ asset('css/style.css') }}">
</head>
<body>
  <div class="player-info">
    <img src="{{ asset('images/profil.png') }}" alt="Avatar" class="player-avatar">
    <div class="health-bar" id="healthBar" style="width: 150px;">
      <div class="player-name">Tantan</div>
    </div>
  </div>

  <div class="container">
    <div class="question-kotak">
      <div class="question-container" id="questionBox"></div> 
      <div class="timer-container" id="timer"></div> 
      <div class="answer-container" id="answerBox"></div> 
    </div>
    <img id="player" src="{{ asset('images/player.png') }}" alt="Player" class="stickman player">
    <img id="enemy" src="{{ asset('images/stik1.png') }}" alt="Enemy" class="stickman enemy hidden">
    <img id="miniboss" src="{{ asset('images/stik1.png') }}" alt="Miniboss" class="stickman miniboss hidden">
  </div>
  <script src="{{ asset('js/game.js') }}"></script>
  <a href="{{ route('stage') }}" id="winLink" class="hidden">Next Stage</a>
  <script>
    const gameRoute = "{{ route('game') }}";
    const stageRoute = "{{ route('stage') }}";
  </script>
</body>
</html>
