function SoundManager(parentDOMElement) {

    var sounds = ['sounds/Brave_World_cut.mp3', 'sounds/game_over.mp3', 'sounds/2_steps.mp3', 'sounds/1_jump.mp3', 'sounds/got _life.mp3', 'sounds/pop.mp3', 'sounds/laughter.mp3'];

    this.backgroundSound = document.createElement('audio');
    this.stepSound = document.createElement('audio');
    this.jumpSound = document.createElement('audio');
    this.gameOverSound = document.createElement('audio');
    this.lifeSound = document.createElement('audio');
    this.touchedMonsterSound = document.createElement('audio');
    this.touchedTricksterSound = document.createElement('audio');

    parentDOMElement.appendChild(this.backgroundSound);
    parentDOMElement.appendChild(this.stepSound);
    parentDOMElement.appendChild(this.jumpSound);
    parentDOMElement.appendChild(this.gameOverSound);
    parentDOMElement.appendChild(this.lifeSound);
    parentDOMElement.appendChild(this.touchedMonsterSound);
    parentDOMElement.appendChild(this.touchedTricksterSound);

    this.getBackgroundSound = function () {

        if (!this.backgroundSound.src) {

            this.backgroundSound.src = sounds[0];
        }

        return this.backgroundSound;
    }

    this.getStepSound = function () {

        if (!this.stepSound.src) {

            this.stepSound.src = sounds[2];
        }

        return this.stepSound;
    }

    this.getJumpSound = function () {

        if (!this.jumpSound.src) {

            this.jumpSound.src = sounds[3];
        }

        return this.jumpSound;
    }

    this.getGameOverSound = function () {

        if (!this.gameOverSound.src) {

            this.gameOverSound.src = sounds[1];
        }

        return this.gameOverSound;
    }

    this.getLifeSound = function () {

        if (!this.lifeSound.src) {

            this.lifeSound.src = sounds[4];
        }

        return this.lifeSound;
    }

    this.getTouchedMonsterSound = function () {

        if (!this.touchedMonsterSound.src) {

            this.touchedMonsterSound.src = sounds[5];
        }

        return this.touchedMonsterSound;
    }

    this.getTouchedTricksterSound = function () {

        if (!this.touchedTricksterSound.src) {

            this.touchedTricksterSound.src = sounds[6];
        }

        return this.touchedTricksterSound;
    }
}
