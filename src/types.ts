import { ChessBoardPieces, ChessBoardPositions } from './enums';

export type SelectedPiece = keyof typeof ChessBoardPieces;
export type SelectedPiecePosition = keyof typeof ChessBoardPositions;
