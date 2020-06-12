import { LoginEffects } from "src/app/features/landing/store/login/login.effects";
import { RecentRecordsEffects } from "src/app/features/process/store/recent-records/recent-records.effects";
import { TenderizedEffects } from "src/app/features/process/store/tenderized/tenderized.effects";

export const effects = [LoginEffects, RecentRecordsEffects, TenderizedEffects];
