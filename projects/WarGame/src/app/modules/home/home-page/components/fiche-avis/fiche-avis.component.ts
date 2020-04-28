import { Component, OnInit, Input, SimpleChanges, SimpleChange, OnChanges, ElementRef, ViewChild } from '@angular/core';
import { VueAvis } from '../../../../core/api/models';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TextValue, getCurrentYear, exportExcel, TypePieceJointeAvisLabel, TypeImport, exportGenerique } from '../../../../core/helpers';
import { AvisService } from '../../../../core/services';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AvisDocument } from '../../../../core/api/models/avis/avis-document.model';

@Component({
  selector: 'app-fiche-avis',
  templateUrl: './fiche-avis.component.html',
  styleUrls: ['./fiche-avis.component.css']
})
export class FicheAvisComponent implements OnInit, OnChanges {

  avis: VueAvis = new VueAvis;

  currentCampagne: number;

  commentForm: FormGroup;
  commentLoading = false;
  commentSuccess = '';
  commentError = '';

  typesPiecesJointesAvisLabelEnum = TypePieceJointeAvisLabel;
  typesImportEnum = TypeImport;
  currentTypePieceJointe: TypeImport;
  currentTypePieceJointeLabel = '';
  currentNamePieceJointe = '';
  importFile: File;
  fileSend: boolean;
  importLoading: boolean;
  importText: string;

  docAvisSynthetiques: AvisDocument[] = [];
  docAvisDetailles: AvisDocument[] = [];
  docAvisDemandeRegularisations: AvisDocument[] = [];
  docAvisFactures: AvisDocument[] = [];
  docAvisRetourAdministrationFiscales: AvisDocument[] = [];
  docAvisAnnexes: AvisDocument[] = [];

  @Input() currentAvis: TextValue;

  importModalReference: NgbModalRef;
  @ViewChild('importModal') importModal;
  @ViewChild('importInputFile') importInputFile: ElementRef;

  constructor(
    private avisService: AvisService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private notifierService: NotifierService,
    private modalService: NgbModal,
  ) { }

  ngOnInit() {

    const avisId = this.currentAvis.value;

    if (!avisId) {
      this.router.navigate(['/avis']);
      return;
    }

    this.docAvisSynthetiques = [];
    this.docAvisDetailles = [];
    this.docAvisDemandeRegularisations = [];
    this.docAvisFactures = [];
    this.docAvisRetourAdministrationFiscales = [];
    this.docAvisAnnexes = [];
    this.commentSuccess = '';
    this.commentError = '';
    this.currentTypePieceJointeLabel = '';
    this.currentNamePieceJointe = '';

    this.currentCampagne = getCurrentYear();

    this.commentForm = this.formBuilder.group({
      commentaire: ['']
    });

    this.avis = new VueAvis;
    this.avisService.get(avisId).then(
      onsuccess => {
        this.avis = onsuccess;
        this.fillFormValues();
      },
      onerror => {
        this.router.navigate(['/avis']);
      }
    ).then(() =>
      this.avisService.getAllDocuments(avisId).then(
        onsuccess => {
          if (onsuccess.length > 0) {
            this.docAvisSynthetiques = onsuccess.filter(x => x.typeImportId === TypeImport.docAvisSynthetique);
            this.docAvisDetailles = onsuccess.filter(x => x.typeImportId === TypeImport.docAvisDetaille);
            this.docAvisDemandeRegularisations = onsuccess.filter(x => x.typeImportId === TypeImport.docAvisDemandeRegularisation);
            this.docAvisFactures = onsuccess.filter(x => x.typeImportId === TypeImport.docAvisFacture);
            this.docAvisRetourAdministrationFiscales = onsuccess.filter(x => x.typeImportId ===
              TypeImport.docAvisRetourAdministrationFiscale);
            this.docAvisAnnexes = onsuccess.filter(x => x.typeImportId === TypeImport.docAvisAnnexe);
          }
        },
        onerror => {}
      )
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    const avis: SimpleChange = changes.currentAvis;
    this.currentAvis = avis.currentValue;
    this.ngOnInit();
  }

  onClickExport() {
    exportExcel('Fiche avis ' + this.avis.reference, this.avisService.exportFicheExcel(this.avis.societeId, this.avis.id));
  }

  fillFormValues() {
    this.commentForm.patchValue({
      commentaire: this.avis.commentaires
    });
  }

  onClickImport(typePieceJointe: TypeImport, label: string) {
    this.currentTypePieceJointe = typePieceJointe;
    this.currentTypePieceJointeLabel = label;
    this.currentNamePieceJointe = label;
    if (this.currentTypePieceJointe) {
      this.openImportModal();
    }
  }

  openImportModal() {
    this.importFile = null;
    this.importModalReference = this.modalService.open(this.importModal);
  }

  closeImportModal() {
    this.importModalReference.close();
  }

  changeImportFile(fileList) {
    this.importFile = fileList.length > 0 ?  fileList[0] : null;
  }

  onCommentSubmit() {
    this.commentLoading = true;
    const formValues: any = Object.assign({}, this.commentForm.value);
    this.avis.commentaires = formValues.commentaire;
    this.avisService.putCommentaire(this.avis.id, this.avis).then(
      onsuccess => {
        this.notifierService.notify('success', 'Le commentaire a été mis à jour.');
      },
      onerror => {
        this.notifierService.notify('error', 'Erreur lors de la mise à jour du commentaire.');
      }
    );
  }

  onKeyUpNameFile(name: string) {
    this.currentNamePieceJointe = name;
  }

  importPieceJointe() {
    if (this.currentNamePieceJointe && this.importFile && this.currentTypePieceJointe) {
      this.importLoading = true;
      this.avisService.importDocument(this.importFile, this.currentAvis.value, this.currentNamePieceJointe, this.currentTypePieceJointe)
      .then(
        onsuccess => {
          this.notifierService.notify( 'success', 'Ajout du fichier effectué.' );
          this.addDocumentToArray(onsuccess.body);
        },
        onerror => {
          let importDocumentError = '';
          if (onerror.error && onerror.error.message) {
            importDocumentError = onerror.error.message;
          } else {
            importDocumentError = 'Une erreur s\'est produite, l\'ajout du fichier ne sera pas effectué.';
          }
          this.notifierService.notify( 'error', importDocumentError );
        }
      ).then(() => {
        this.importLoading = false;
        this.closeImportModal();
      });
    }
  }

  onClickDeletePieceJointe(id, type: TypeImport) {
    if (confirm('Souhaitez-vous vraiment supprimer ce document ?')) {
      this.avisService.deleteDocument(id).then(
        onsuccess => {
          this.notifierService.notify('success', 'Le document a bien été supprimé de l\'avis');
          this.removeDocumentFromArray(id, type);
        },
        onerror => {
          this.notifierService.notify('error', 'Le document n\'a pas pu être supprimé de l\'avis, merci de réessayer.');
        }
      );
    }
  }

  onClickExportPieceJointe(doc: AvisDocument) {
    exportGenerique(doc.nom, this.avisService.exportDocument(doc.id), doc.emplacement);
  }

  removeDocumentFromArray(id, type: TypeImport) {
    switch (type) {
      case TypeImport.docAvisSynthetique:
        this.docAvisSynthetiques.splice(this.docAvisSynthetiques.findIndex(x => x.id === id), 1);
        break;
      case TypeImport.docAvisDetaille:
        this.docAvisDetailles.splice(this.docAvisDetailles.findIndex(x => x.id === id), 1);
        break;
      case TypeImport.docAvisDemandeRegularisation:
        this.docAvisDemandeRegularisations.splice(this.docAvisDemandeRegularisations.findIndex(x => x.id === id), 1);
        break;
      case TypeImport.docAvisFacture:
        this.docAvisFactures.splice(this.docAvisFactures.findIndex(x => x.id === id), 1);
        break;
      case TypeImport.docAvisRetourAdministrationFiscale:
        this.docAvisRetourAdministrationFiscales.splice(this.docAvisRetourAdministrationFiscales.findIndex(x => x.id === id), 1);
        break;
      case TypeImport.docAvisAnnexe:
        this.docAvisAnnexes.splice(this.docAvisAnnexes.findIndex(x => x.id === id), 1);
        break;
      default:
        break;
    }
  }

  addDocumentToArray(document: AvisDocument) {
    switch (document.typeImportId) {
      case TypeImport.docAvisSynthetique:
        this.docAvisSynthetiques.push(document);
        break;
      case TypeImport.docAvisDetaille:
        this.docAvisDetailles.push(document);
        break;
      case TypeImport.docAvisDemandeRegularisation:
        this.docAvisDemandeRegularisations.push(document);
        break;
      case TypeImport.docAvisFacture:
        this.docAvisFactures.push(document);
        break;
      case TypeImport.docAvisRetourAdministrationFiscale:
        this.docAvisRetourAdministrationFiscales.push(document);
        break;
      case TypeImport.docAvisAnnexe:
        this.docAvisAnnexes.push(document);
        break;
      default:
        break;
    }
  }

}
