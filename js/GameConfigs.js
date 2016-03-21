var gameConfigs = {

    fps: 7,

    fpsDelta: 0.25,

    gameField: {

        gameFieldBackground: {

            gameFieldBackgroundStarsLayer: {
                dx: -1,
                dy: -1

            },

            gameFieldBackgroundCloudsLayer: {
                dx: 3,
                dy: 0
            }
        },

        gameFieldTower: {

            steps: {

                numberOfLevels: 1000,
                heightOfLevel: 75
            },

            tricksters: {

                numberOfTricksters: 250,

                arrayOfDX: [0, 5, 10, 15, 20, 25, 30, 35, 0, -5, -10, -15, -20, -25, -30, -35],
                arrayOfDY: [0, 5, 10, 15, 20, 25, 30, 35, 0, -5, -10, -15, -20, -25, -30, -35],
                arrayOfDAngle: [0, 5, 10, 15, 20, 25, 30, 35, 0, -5, -10, -15, -20, -25, -30, -35],
                arrayOfLevitateDX: [10, 40, 70, 100, 130, 160, 180, 210, 240, 270, 300, 330, 360, 390, 410],
                arrayOfLevitateDY: [10, 40, 70, 100, 130, 160, 180, 210, 240, 270, 300, 330, 360, 390, 410]
            },

            monsters: {

                numberOfMonsters: 200,

                arrayOfDAngle: [5, -5]
            },

            lifes: {
                numberOfLifes: 300,

                arrayOfDAngle: [5, -5]
            }

        },
        gameFieldScore: {

            lifes: 3
        }
    },

    gamer: {

        dx: 25,
        dy: 25,
        dAngle: 10,
        ddy: 25
    },

    colors: [

        '#e57373', '#ef5350', '#f44336', '#e53935', '#d32f2f', '#c62828', '#b71c1c', '#ff8a80', '#ff5252', '#ff1744',
        '#d50000', '#e91e63', '#f48fb1', '#f06292', '#ec407a', '#e91e63', '#d81b60', '#c2185b', '#ad1457', '#880e4f',
        '#ff80ab', '#ff4081', '#f50057', '#c51162', '#9c27b0', '#ce93d8', '#ba68c8', '#ab47bc', '#9c27b0', '#8e24aa',
        '#7b1fa2', '#6a1b9a', '#4a148c', '#ea80fc', '#e040fb', '#d500f9', '#aa00ff', '#673ab7', '#b39ddb', '#9575cd',
        '#7e57c2', '#673ab7', '#5e35b1', '#512da8', '#4527a0', '#311b92', '#b388ff', '#7c4dff', '#651fff', '#6200ea',
        '#3f51b5', '#9fa8da', '#7986cb', '#5c6bc0', '#3f51b5', '#3949ab', '#303f9f', '#283593', '#1a237e', '#8c9eff',
        '#536dfe', '#3d5afe', '#304ffe', '#2196f3', '#90caf9', '#64b5f6', '#42a5f5', '#2196f3', '#1e88e5', '#1976d2',
        '#1565c0', '#0d47a1', '#82b1ff', '#448aff', '#2979ff', '#2962ff', '#03a9f4', '#81d4fa', '#4fc3f7', '#29b6f6',
        '#03a9f4', '#039be5', '#0288d1', '#0277bd', '#01579b', '#80d8ff', '#40c4ff', '#00b0ff', '#0091ea', '#84ffff',
        '#18ffff', '#00e5ff', '#00b8d4', '#a7ffeb', '#64ffda', '#1de9b6', '#00bfa5', '#4caf50', '#a5d6a7', '#81c784',
        '#66bb6a', '#4caf50', '#43a047', '#388e3c', '#b9f6ca', '#69f0ae', '#00e676', '#00c853', '#8bc34a', '#c5e1a5',
        '#aed581', '#9ccc65', '#8bc34a', '#7cb342', '#689f38', '#ccff90', '#b2ff59', '#76ff03', '#64dd17', '#cddc39',
        '#e6ee9c', '#dce775', '#d4e157', '#cddc39', '#c0ca33', '#afb42b', '#9e9d24', '#f4ff81', '#eeff41', '#c6ff00',
        '#aeea00', '#ffeb3b', '#fff59d', '#fff176', '#ffee58', '#ffeb3b', '#fdd835', '#fbc02d', '#f9a825', '#f57f17',
        '#ffea00', '#ffd600', '#ffc107', '#ffe082', '#ffd54f', '#ffca28', '#ffc107', '#ffb300', '#ffa000', '#ff8f00',
        '#ff6f00', '#ffe57f', '#ffd740', '#ffc400', '#ffab00', '#ff9800', '#ffcc80', '#ffb74d', '#ffa726', '#ff9800',
        '#fb8c00', '#f57c00', '#ef6c00', '#e65100', '#ffd180', '#ffab40', '#ff9100', '#ff6d00', '#ff5722', '#ffab91',
        '#ff8a65', '#ff7043', '#ff5722', '#f4511e', '#e64a19', '#ff9e80', '#ff6e40', '#ff3d00', '#dd2c00'
    ],

    alphabet: [

        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V',
        'W', 'X', 'Y', 'Z'
    ]

};