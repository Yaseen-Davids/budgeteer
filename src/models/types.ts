export type ColumnType = {
  id: number;
  date: string;
};

export type CardType = {
  column_id: number;
  type: string;
  name: string;
  value: number;
  label: string;
  date_due: string;
  paid: boolean;
};
