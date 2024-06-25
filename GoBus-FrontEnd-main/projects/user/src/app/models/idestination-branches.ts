import { IBranch } from './ibranch';

export interface IDestinationBranches {
  id: number;
  name: string;
  branches: IBranch[];
}
