import { LoginEffects } from "src/app/features/landing/store/login/login.effects";
import { RecentRecordsEffects } from "src/app/features/process/store/recent-records/recent-records.effects";
import { SausageEffects } from "src/app/features/process/store/sausage/sausage.effects";

export const effects = [LoginEffects, RecentRecordsEffects, SausageEffects];
