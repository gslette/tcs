import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';

import { HttpClientTestingModule } from '@angular/common/http/testing'

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [ HomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create home component', () => {
    expect(component).toBeTruthy();
  });

  it('should render mat-select', () => {
    const element: HTMLElement = fixture.nativeElement;
    const matSelect = element.querySelector('mat-select')!;
    expect(matSelect).toBeTruthy();
  });

  it('should render mat-table', () => {
    const element: HTMLElement = fixture.nativeElement;
    const matTable = element.querySelector('table')!;
    expect(matTable).toBeTruthy();
  });

  // it('mat-select should have value when selected', async () => {
  //   const matSelect = await loader.getHarness(MatSelectHarness);
  // });
});
