type TDate = {
  year: string;
  month: string;
  date: string
};

type TDay = {
  value: string;
  isActive: boolean;
  currentDay: boolean
};

type TNote = {
  id: number;
  text: string;
  success: boolean
};

type TNotes = {
  [key: string] : TNote[]
}
