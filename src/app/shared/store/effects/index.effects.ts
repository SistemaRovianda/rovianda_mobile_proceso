import { LoginEffects } from "src/app/features/landing/store/login/login.effects";
import { RecentRecordsEffects } from "src/app/features/process/store/recent-records/recent-records.effects";
<<<<<<< HEAD
import { SausageEffects } from "src/app/features/process/store/sausage/sausage.effects";

export const effects = [LoginEffects, RecentRecordsEffects, SausageEffects];
=======
import { BasicRegisterEffect } from "src/app/features/process/store/basic-register/basic-register.effects";

export const effects = [
  LoginEffects,
  RecentRecordsEffects,
  BasicRegisterEffect,
];
>>>>>>> origin/feature/basic-registration
