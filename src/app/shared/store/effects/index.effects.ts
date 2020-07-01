import { LoginEffects } from "src/app/features/landing/store/login/login.effects";
import { RecentRecordsEffects } from "src/app/features/process/store/recent-records/recent-records.effects";
import { TenderizedEffects } from "src/app/features/process/store/tenderized/tenderized.effects";
import { GrindingEffects } from "src/app/features/process/store/grinding/griding.effects";
import { ConditioningEffects } from "src/app/features/process/store/conditioning/conditioning.effects";
import { BasicRegisterEffect } from "src/app/features/process/store/basic-register/basic-register.effects";
import { SausageEffects } from "src/app/features/process/store/sausage/sausage.effects";
import { ProcessDetailEffect } from "src/app/features/process/store/process-detail/process-detail.effects";
import { UsersEffects } from "src/app/features/process/store/user/user.effect";

export const effects = [
  LoginEffects,
  BasicRegisterEffect,
  RecentRecordsEffects,
  ConditioningEffects,
  GrindingEffects,
  TenderizedEffects,
  SausageEffects,
  ProcessDetailEffect,
  UsersEffects,
];
