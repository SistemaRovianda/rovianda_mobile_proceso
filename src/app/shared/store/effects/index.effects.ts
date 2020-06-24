import { LoginEffects } from "src/app/features/landing/store/login/login.effects";
import { RecentRecordsEffects } from "src/app/features/process/store/recent-records/recent-records.effects";
import { GrindingEffects } from 'src/app/features/process/store/grinding/griding.effects';
import { ConditioningEffects } from "src/app/features/process/store/conditioning/conditioning.effects";

export const effects = [
  LoginEffects,
  RecentRecordsEffects,
  ConditioningEffects,
  GrindingEffects
];
