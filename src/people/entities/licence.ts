import { Document} from 'mongoose';

export interface LicenceDef extends Document {
  Silenceko: string;
  Silenceka: string;
  Auteur?: string;
  Auteta?: string;
  capacity?: Number;
  used?: Number;
  Liceeta?: string;
  Licetyp?: string;// free or bouth
  actimotif?: string;
  compu?: string;
  defverson?: string;
  logcount?: number;
  create_tim?: Date;
}