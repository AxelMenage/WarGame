import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LibelleStructure, AvisSynthese } from '../../../../core/api/models';
import { FilterSyntheseAvis, CurrentFilters, getCurrentFilters } from '../../../../core/helpers';
import { SwitchIdentityInteractionService } from '../../../../core/services/switch-identity-interaction.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carte-synthese-avis',
  templateUrl: './carte-synthese-avis.component.html',
  styleUrls: ['./carte-synthese-avis.component.css']
})
export class CarteSyntheseAvisComponent implements OnInit {

  libellesStructure: LibelleStructure = new LibelleStructure;

  avisFilters = FilterSyntheseAvis;

  currentFilters: CurrentFilters;

  @Input() avisSynthese: AvisSynthese;
  @Input() actionImportPermitted: boolean;
  @Output() societeIdEmitter = new EventEmitter<any>();

  constructor(
    private siiService: SwitchIdentityInteractionService,
    private router: Router) { }

  ngOnInit() {
    this.currentFilters = getCurrentFilters();
  }

  onClickImport(societeId) {
    this.societeIdEmitter.emit(societeId);
  }

  onClickDetail(societeId, filter = null) {
    this.siiService.switchIdentityHeader(this.currentFilters.societes.find(x => x.value === societeId).any2, societeId);
    this.router.navigate(['/avis/avis-details'], {queryParams: {f: filter}});
  }

}
