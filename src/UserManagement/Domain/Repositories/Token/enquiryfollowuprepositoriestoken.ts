import { InjectionToken } from '@angular/core';

import { EnquiryFollowupRepositories } from '../Enquiryfollowuprepositories';

export const ENQUIRY_FOLOWUP_REPOSITORY =
  new InjectionToken<EnquiryFollowupRepositories>(
    'ENQUIRY_FOLOWUP_REPOSITORY'
  );