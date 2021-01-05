import { ISecretSanta } from "./secretSanta";

export interface IEmployee{
  id?: number;
  email: string;
  firstName?: string;
  lastName?: string;
  secretSanta?: string;
}
