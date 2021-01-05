import { ISecretSanta } from "./secretSanta";

export interface IEmployee{
  id?: number;
  username: string;
  firstName?: string;
  lastName?: string;
  secretSanta?: string;
}
