import { Component, OnInit, Input } from "@angular/core";
import { Control, ControlMemberApi, TypeAttributes } from "@sassoftware/vi-api/control";
import { PageModel } from "@sassoftware/vi-api/page-model";
import { SviWindow } from "@sassoftware/vi-api";
import { HttpResponse } from "@sassoftware/vi-api/http";
import { AgGridAngular } from 'ag-grid-angular';
import { AllCommunityModule, ModuleRegistry, ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { AlertTrans } from './interface';

export interface Alert{

}

@Component({
  selector: 'sol-alert-trans',
  standalone: true,
  imports:[AgGridAngular],
  templateUrl: './alert-trans.component.html'
})
export class AlertTransComponent implements OnInit {
  @Input() childNode!: Control;
  @Input() pageModel!: PageModel;
  @Input() controlApi!: ControlMemberApi;

  public rowData: AlertTrans[] = [];
  private gridApi!: GridApi;

  colDefs: ColDef[] = [
    // { field: 'alert_id', headerName: 'Alert ID', cellDataType: 'text', minWidth: 120 },
    { field: 'accnum', headerName: 'Account Number', cellDataType: 'text', minWidth: 120 },
    { field: 'transaction_date', headerName: 'Transaction date', cellDataType: 'text', minWidth: 300 },
    { field: 'sfe', headerName: 'Fired Event Id', cellDataType: 'text', minWidth: 300 },
    { field: 'ae', headerName: 'Alerting Event Id', cellDataType: 'text', minWidth: 300 },    
    { field: 'curr', headerName: 'CDI', cellDataType: 'text', minWidth: 300 },
    { field: 'cm', headerName: 'Currency', cellDataType: 'text', minWidth: 300 },
    { field: 'status', headerName: 'Status', cellDataType: 'text', minWidth: 300 },
    { field: 'td', headerName: 'Description', cellDataType: 'text', minWidth: 300 },
    { field: 'pmd', headerName: 'Primary Medium', cellDataType: 'text', minWidth: 300 },
    { field: 'smd', headerName: 'Secondary Medium', cellDataType: 'text', minWidth: 300 },
    { field: 'mech', headerName: 'Mechanism', cellDataType: 'text', minWidth: 300 }


  ];



  public defaultColDef: ColDef = {
    flex: 1,
    editable: false,
    filter: true,
    sortable: true,
    resizable: true
  };

  public paginationPageSize = 10;
  public paginationPageSizeSelector: number[] | boolean = [10, 25, 50];

  constructor() {
    ModuleRegistry.registerModules([AllCommunityModule]);
  }
  
  ngOnInit(): void {
    console.log('typeeee',this.pageModel.type);
    console.log('nameeee',this.pageModel);
    console.log('pageModel.data:', this.pageModel.data);
    console.log('alert_id:', this.pageModel.data['alert_id']);
    // Component will load data when grid is ready
  }

  onBtnExport() {
    this.gridApi.exportDataAsCsv();
  }

  // Main data loading method (following your reference pattern)
  async onGridReady(params: GridReadyEvent<AlertTrans>) {
    this.gridApi = params.api;
    console.log("pageModel:", this.pageModel);
    console.log('pageModel.data:', this.pageModel.data);
    console.log('alert_id:', this.pageModel.data['alert_id']);
    const sviWindow = window as SviWindow;
    const jobPath = this.childNode.typeAttributes?.['jobPath'];

    try {

      await sviWindow.sas.vi.http.get(`/SASJobExecution/?_program=${encodeURIComponent(jobPath)}&aid=${this.pageModel.data['alert_id']}`
      )
        .then((response: HttpResponse<string>) => {
          console.log("Alert scenarios response:", response);
          
          const respString = JSON.stringify(response.body);
          const respJson = JSON.parse(respString).results;
          
          console.log("Response JSON:", respJson);

          // Process date fields
          for (let k = 0; k < respJson.length; k++) {
            if (respJson[k].last_triggered) {
              respJson[k].last_triggered = new Date(respJson[k].last_triggered);
            }
            if (respJson[k].created_date) {
              respJson[k].created_date = new Date(respJson[k].created_date);
            }
          }

          if (response && response.body) {
            this.rowData = respJson;
          } else {
            console.error("Error fetching alert scenarios:", response);
            throw new Error("Invalid response format");
          }
        });

    } catch (error) {
      console.error("Error loading alert scenarios:", error);
    } finally {
      this.gridApi.setGridOption("loading", false);
    }
  }


}
