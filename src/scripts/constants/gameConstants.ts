    export class GameConstants {
        // symbol mapping
        public static readonly SYM_1 = 0;
        public static readonly SYM_2 = 1;
        public static readonly SYM_3 = 2;
        public static readonly SYM_4 = 3;
        public static readonly SYM_5 = 4;
        public static readonly SYM_6 = 5;
        public static readonly SYM_7 = 6;

        // length of symbols in each reel 
        public static readonly REEL_SYM_LENGTH = [15, 18, 21];
        // saved the names of images for symbols just for the ease to load them in reels; this won't be requied in an actual game where we'll register all the symbols in the beginning
        public static readonly SYM_NAMES = ['symbol1.png', 'symbol2.png', 'symbol3.png', 'symbol4.png', 'symbol5.png', 'symbol6.png', 'symbol7.png'];

        public static readonly REEL_GAP = 30;
        public static readonly SYM_WIDTH = 270;
        public static readonly SYM_HEIGHT = 283;
        public static readonly REEL_X = 650;
        public static readonly REEL_Y = 250;

        public static readonly SPIN_BTN_X = 1700;
        public static readonly SPIN_BTN_Y = 550;


        // represents win line patterns in form of symbol row position; this won't be needed when winning data will be coming from backend
        public static readonly WIN_LINE_DATA = [[1, 1, 1], [0, 0, 0], [2, 2, 2]];


    }
    export class GameVariables {
        // calculating full house wins of random symbols and storing the data here
        public static WINS: {lineID: number, symID: number}[] = [];
    }