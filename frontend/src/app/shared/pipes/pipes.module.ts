import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { EndpointPipe } from './endpoint.pipe';

@NgModule({
  declarations: [EndpointPipe],
  imports: [CommonModule],
  exports: [EndpointPipe]
})
export class PipesModule {}
