import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { EndpointPipe } from './endpoint.pipe';
import { JsonPipe } from './json.pipe';

@NgModule({
  declarations: [
    JsonPipe,
    EndpointPipe,
  ],
  imports: [CommonModule],
  exports: [
    JsonPipe,
    EndpointPipe,
  ],
})
export class PipesModule { }
