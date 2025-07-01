import { ComponentFixture, TestBed } from "@angular/core/testing";

import { AlertTransComponent } from "./alert-trans.component";

describe("AlertTransComponent", () => {
  let component: AlertTransComponent;
  let fixture: ComponentFixture<AlertTransComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertTransComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertTransComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
