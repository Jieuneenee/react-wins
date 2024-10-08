export type TBus = {
  color: string;
  busType: string;
  busNumber: string;
};

export type TLocationGuide = {
  address1: string;
  address2: string;
  href: string;
  busList: TBus[];
  subway?: string[];
};
