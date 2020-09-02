import Cell, { ISerializedCell } from './Cell';
import { MODE } from '../store/types';
export interface ISerializedRow {
  active: boolean;
  cells: ISerializedCell[];
  index: number;
}
export default class Row {
  private cells: Cell[];
  private index: number;
  private active: boolean;

  private constructor(previous?: Row) {
    this.index = previous ? previous.index : -1;
    this.active = previous ? previous.active : false;
    this.cells = previous ? previous.cells : [];
  }

  static create(data: [number, boolean][], index: number): Row {
    const row = new Row();
    row.cells = [...data.map(([value, given], i) => Cell.create(value, index, i + 1, given))];
    row.index = index;
    return row;
  }

  static deserialize(data: ISerializedRow): Row {
    const row = new Row();
    row.active = data.active;
    row.index = data.index;
    row.cells = data.cells.map(Cell.deserialize);
    return row;
  }

  public getCells(): Cell[] {
    return this.cells;
  }

  public validate(): Row {
    const row = new Row(this);
    row.cells = this.cells.map(c => c.validate());
    return row;
  }

  public getIndex(): number {
    return this.index;
  }

  public toggleCell(index: number, column: number): Row {
    if (this.index !== index && !this.active) {
      return this;
    }
    const row = new Row(this);

    if (this.active) {
      if (this.index === index) {
        row.cells = this.cells.map(c => {
          return c.setActive(c.isActive() ? false : c.getColumn() === column);
        });
      } else {
        row.active = false;
        row.cells = this.cells.map(c => (c.isActive() ? c.setActive(false) : c));
      }
    } else if (this.index === index) {
      row.active = true;
      row.cells = this.cells.map(c => (c.getColumn() === column ? c.setActive(true) : c));
    }
    return row;
  }

  public isActive(): boolean {
    return this.active;
  }

  public setDigit(digit: number, mode: MODE): Row {
    if (!this.active) {
      return this;
    }
    const row = new Row(this);
    row.cells = this.cells.map(c => c.setDigit(digit, mode));
    return row;
  }

  public removeDigit(): Row {
    if (!this.active) {
      return this;
    }
    const row = new Row(this);
    row.cells = this.cells.map(c => c.removeDigit());
    return row;
  }

  public clearCandidates(): Row {
    const row = new Row(this);
    row.cells = this.cells.map(c => c.clearNotes());
    return row;
  }
}
