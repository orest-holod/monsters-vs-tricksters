function SoundManager(parentDOMElement){

  var sounds = ['sounds/Brave_World.mp3', 'sounds/game_over.mp3', 'sounds/2_steps.mp3', 'sounds/1_jump.mp3', 'sounds/got _life.mp3', 'sounds/pop.mp3', 'sounds/laughter.mp3'];

  this.sound = document.createElement('audio');

  this.src = function(index){
    this.sound.src = sounds[index];
  };

  this.sound.setAttribute('preload', 'auto');

  this.sound.autoplay = function(){
    this.sound.setAttribute('autoplay', 'autoplay');
  };

  this.sound.setAttribute('controls', 'none');

  this.sound.style.display = 'none';

  this.loop = function(bool){
    this.sound.loop = bool;
  }

  parentDOMElement.appendChild(this.sound);

  this.play = function(){
    this.sound.play();
  };

  this.stop = function(){
    this.sound.pause();
  };
}
