import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RecentRecordsPage } from './recent-records.page';

describe('RecentRecordsPage', () => {
  let component: RecentRecordsPage;
  let fixture: ComponentFixture<RecentRecordsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentRecordsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RecentRecordsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
