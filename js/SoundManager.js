function SoundManager(parentDOMElement){

  var sounds = ['sounds/Brave_World.wav', 'sounds/game_over.wav', 'sounds/2_steps.wav', 'sounds/1_jump.wav'];

  this.sound = document.createElement('audio');

  this.src = function(index){
    this.sound.src = sounds[index];
  };

  this.sound.setAttribute("preload", "auto");

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
