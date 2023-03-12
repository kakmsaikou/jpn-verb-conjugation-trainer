type WordData = {
  word: string;
  verbDetail: VerbDetail<string>;
};

interface VerbDetail<T extends string | boolean> {
  verb_type: T;
  masu: T;
  te: T;
  ta: T;
  nai: T;
  [key: string]: T;
}
