// src/types/jspdf-autotable.d.ts
import { jsPDF } from 'jspdf';

declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: UserOptions) => jsPDF;
  }
}

interface UserOptions {
  head?: Array<Array<string | number>>;
  body: Array<Array<string | number>>;
  startY?: number;
  margin?: number | { top: number, right: number, bottom: number, left: number };
  theme?: 'striped' | 'grid' | 'plain';
  styles?: {
    fillColor?: [number, number, number] | string;
    textColor?: [number, number, number] | string;
    fontStyle?: 'normal' | 'bold' | 'italic' | 'bolditalic';
    overflow?: 'linebreak' | 'ellipsize' | 'visible' | 'hidden';
  };
  [key: string]: any; // Allow other options
}
