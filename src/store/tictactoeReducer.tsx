import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";

export type TicTacToe = {
  prevState?: [];
  presentState?: {
    squares?: {
      x: number;
      y: number;
      value: string | null;
      //color: { backgroundWin: string };
    }[];
    currentSquare?: { x: number; y: number; value: string | null };
    isStarted?: boolean;
    isPlayer?: string;
    boardSize?: { x?: number; y?: number };
    playerToWin: boolean;
    arrayWin: {
      x: number;
      y: number;
      value: string | null;
      // color: { backgroundWin: string };
    }[];
    typeWin: string;
  };

  nextState?: [];
};

export type Actions = {
  init: (state: TicTacToe) => void;
  changeBoard: (
    state: TicTacToe,
    action: PayloadAction<{ boardSize?: { x?: number; y?: number } }>
  ) => void;
  addSquares: (
    state: any,
    action: PayloadAction<{ x: number; y: number; value: string | null }>
  ) => void;
  redo: (state: any) => void;
  undo: (state: any) => void;
  winner: (
    state: any,
    action: PayloadAction<{
      arrWin?: [];
      isWinner?: boolean;
      typeWinner?: string;
    }>
  ) => void;
  reStart: (state: any) => void;
};

const initialData: TicTacToe = {
  prevState: [],

  presentState: {
    squares: [],
    currentSquare: undefined,
    isStarted: false,
    isPlayer: "X",
    boardSize: {
      x: 15,
      y: 15,
    },
    playerToWin: false,
    arrayWin: [],
    typeWin: "",
  },

  nextState: [],
};

export type TicTacToeActionPayload = {
  x: number;
  y: number;
  value: "X" | "O";
};

const squareSlice = createSlice<TicTacToe, Actions>({
  name: "tictactoe",
  initialState: initialData as TicTacToe,
  reducers: {
    init: (state) => {
      const initBoard = [];

      if (
        state.presentState &&
        state.presentState.boardSize?.x &&
        state.presentState.boardSize?.y
      ) {
        for (let i = 0; i < state.presentState?.boardSize?.y; i++) {
          const temp = [];
          for (let j = 0; j < state.presentState?.boardSize?.x; j++) {
            temp.push({
              x: i,
              y: j,
              value: null,
            });
          }
          initBoard.push(temp);
        }
      }

      const tempSquare: {
        isStarted?: boolean;
        isPlayer?: "O" | "X";
        squares?: any;

        boardSize?: {
          x?: number;
          y?: number;
        };
        playerToWin: boolean;
        arrayWin: [];
        typeWin: string;
      } = {
        isStarted: false,
        isPlayer: "X",
        squares: initBoard,
        boardSize: {
          x: 15,
          y: 15,
        },
        playerToWin: false,
        arrayWin: [],
        typeWin: "",
      };

      state.presentState = tempSquare;
    },

    changeBoard: (state, action) => {
      const initBoard: {
        x: number;
        y: number;
        value: string | null;
      }[] = [];
      const { x, y } = action.payload.boardSize || { x: 15, y: 15 };

      if (x && y) {
        for (let i = 0; i < y; i++) {
          const temp: any = [];
          for (let j = 0; j < x; j++) {
            temp.push({
              x: i,
              y: j,
              value: null,
            });
          }
          initBoard.push(temp);
        }
      }

      if (state.presentState?.boardSize && state.presentState.squares) {
        state.presentState.boardSize = action.payload.boardSize;
        state.presentState.squares = initBoard;
        state.presentState = _.cloneDeep(state.presentState);
      }
    },

    addSquares: (state, action) => {
      const nextSquares = _.cloneDeep(state.presentState.squares);
      nextSquares[action.payload.x][action.payload.y].value =
        state.presentState.isStarted === true ? "O" : "X";

      const tempSquare: {
        isStarted?: boolean;
        isPlayer?: "X" | "O";
        squares?: string[];
        currentSquare?: { x: number; y: number; value: string | null };
        boardSize?: {
          x?: number;
          y?: number;
        };
        arrayWin: [];
        typeWin: string;
      } = {
        isStarted: !state.presentState.isStarted,
        isPlayer: !state.presentState.isStarted === true ? "O" : "X",
        squares: nextSquares,
        currentSquare: {
          ...action.payload,
          value: state.presentState.isStarted === true ? "O" : "X",
        },
        boardSize: {
          x: 15,
          y: 15,
        },
        arrayWin: [],
        typeWin: "",
      };

      state.prevState.push(_.cloneDeep(state.presentState));
      state.presentState = _.cloneDeep(tempSquare);
    },

    redo: (state) => {
      if (state.nextState?.length > 0) {
        let redoStack = state.nextState.pop();
        state.prevState.push(_.cloneDeep(state.presentState));
        state.presentState = redoStack;
      }
    },

    undo: (state) => {
      if (state.prevState?.length > 0) {
        let undoStack = state.prevState.pop();
        state.nextState.push(_.cloneDeep(state.presentState));
        state.presentState = undoStack;
      }
    },
    winner: (state, action) => {
      let { presentState } = state;
      const { arrWin, isWinner, typeWinner } = action.payload;
      presentState.playerToWin = isWinner;
      presentState.arrayWin = arrWin;
      presentState.typeWin = typeWinner;
      presentState = _.cloneDeep(presentState);
    },
    reStart: (state) => {
      let { presentState } = state;

      state.prevState = [];
      state.nextState = [];

      presentState.playerToWin = false;
      presentState.arrayWin = [];
      presentState.typeWin = "";
      presentState = _.cloneDeep(presentState);
    },
  },
  extraReducers: {},
});

export const { init, changeBoard, addSquares, redo, undo, reStart, winner } =
  squareSlice.actions;

export default squareSlice.reducer;
