import { Component, OnInit, Input, ViewChild, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { DataGridColonne, FilterSyntheseAvis, CurrentFilters, getCurrentFilters, getCurrentYear,
  TypeImport, exportText, setCadastreBatiDatagridFilters, datagridAvis, setAvisDatagridFilters,
  datagridAvisErreurs,
  getCurrentUser,
  RoleUtilisateur,
  exportGenerique} from '../../../../core/helpers';
import { Import, VueAvis, Utilisateur } from '../../../../core/api/models';
import { DxDataGridComponent } from 'devextreme-angular';
import { AvisService, ImportService, SocieteService } from '../../../../core/services';
import { ActivatedRoute, Router } from '@angular/router';
import frMessages from 'src/assets/json/fr.json';
import { locale, loadMessages } from 'devextreme/localization';
import { NotifierService } from 'angular-notifier';
loadMessages(frMessages);
locale('fr');

@Component({
  selector: 'app-tableau-avis',
  templateUrl: './tableau-avis.component.html',
  styleUrls: ['./tableau-avis.component.css']
})
export class TableauAvisComponent implements OnInit, OnChanges {

  usedDataSource: any = {};
  rowsCount = 0;
  actionLoading = false;
  columns: DataGridColonne[] = [];
  checkedAvis: VueAvis[] = [];
  currentCampagne: number;
  currentUser: Utilisateur;
  rolesEnum = RoleUtilisateur;
  dernierImport: Import;

  loading = false;
  exportLoading = false;
  currentFilters: CurrentFilters;
  societeId: string;
  avisFilterEnum = FilterSyntheseAvis;

  @Input() currentAvisFilter: FilterSyntheseAvis;
  @ViewChild('dataGrid') dataGrid: DxDataGridComponent;

  constructor(
    private avisService: AvisService,
    private route: ActivatedRoute,
    private router: Router,
    private importService: ImportService,
    private societeService: SocieteService,
    private notifierService: NotifierService
  ) {}

  ngOnInit() {

    this.currentFilters = getCurrentFilters();
    const societeId = this.currentFilters.currentSocieteId;
    this.currentUser = getCurrentUser();
    this.societeService.get(societeId).then(
      onsuccess => {
        this.loading = true;
        this.currentCampagne = getCurrentYear();
        this.setDataGridColumns();
        this.initDataSource();
        this.importService.getDernierImportBySociete(TypeImport.avisExcel, societeId).then(
          onsuccessI => {
            this.dernierImport = onsuccessI;
          }
        );
      },
      onerror => {
        this.router.navigate(['/avis']);
        return;
      });
  }

  initDataSource() {
    const societeId = this.currentFilters.currentSocieteId !== '0' ? this.currentFilters.currentSocieteId : '';
    this.usedDataSource = this.avisService.getDatagridBySociete(societeId, this.currentAvisFilter);
  }

  setDataGridColumns() {
    this.columns = this.currentAvisFilter ===  FilterSyntheseAvis.erreur ? datagridAvisErreurs : datagridAvis;
  }

  onToolbarPreparing(e) {
    e.toolbarOptions.items.push({
      location: 'after',
      template: 'campagneTemplate'
  });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.currentFilters) {
      this.setDataGridColumns();
      this.initDataSource();
    }
  }

  onCellClick(e) {
    if (e.data) {
      const avisId = e.data.id;
      const index = e.columnIndex;
      if (index > 1 && e.column.caption !== 'PDF') {
        this.router.navigate(['/avis/fiche-avis'], { queryParams: { aId: avisId, f: this.currentAvisFilter }});
      }
    }
  }

  onSelectionChanged(e) {
    this.checkedAvis = e.selectedRowsData;
  }

  onClickDeleteMultiple() {
    if (confirm('Attention : les information rattachées aux avis seront également supprimées.' +
    ' Souhaitez-vous vraiment supprimer ces avis ?')) {
      this.actionLoading = true;
      const avisId: string[] = [];
      this.checkedAvis.forEach(element => {
        avisId.push(element.id);
      });
      this.avisService.deleteMultiple(avisId).then(
        onsuccess => {
          this.initDataSource();
          this.notifierService.notify('success', 'Les avis ont bien été supprimés.');
          this.checkedAvis = [];
        },
        onerror => {
          this.notifierService.notify('error', 'L\'un des avis ne peut pas être supprimé, merci de vérifier la sélection.');
        }
      ).then(
        () => this.actionLoading = false
      );
    }
  }

  getDatagridFilters() {
    return JSON.stringify(this.dataGrid.instance.getCombinedFilter(false));
  }

  onContentReady(e) {
    setAvisDatagridFilters(this.getDatagridFilters());
    this.rowsCount = this.dataGrid.instance.totalCount();
    this.loading = false;
  }

  onClickExport() {
    this.exportExcel('Liste des avis', this.avisService.exportListeExcel(this.currentFilters.currentSocieteId,
      this.currentAvisFilter, this.getDatagridFilters()));
  }

  exportExcel(name: string, exportFunction: any) {
    this.exportLoading = true;
    let errorExport = false;
    exportFunction.subscribe(data => {
      const blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });
      const downloadURL = window.URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = downloadURL;
      link.download = name + '.xlsx';
      link.dispatchEvent(new MouseEvent(`click`, {bubbles: true, cancelable: true, view: window}));
    },
    onerror => {
      errorExport = true;
    },
  () => this.exportLoading = false);
  }

  onClickExportPDf(importId: string, reference: string) {
    exportGenerique('avis_' + reference, this.avisService.exportOrigineDocument(importId), 'avis.pdf');
  }

  onClickExportRapport() {
    exportText('Rapport import', this.importService.exportRapport(this.dernierImport.id));
  }

}
