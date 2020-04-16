export class MatchesResults {
  id: string;
  name: string;
  lastSeen: string;
  joinedOn: string;
  imagePath: string;
  displayDetails: DisplayDetails[];
  otherDetils: OtherDetails;
  isMatch?: boolean = false;

  constructor(obj: Partial<MatchesResults> = {}) {
    Object.assign(this, obj);
  }
}

export class DisplayDetails {
  key: string;
  value: string;

  constructor(obj: Partial<DisplayDetails> = {}) {
    Object.assign(this, obj);
  }
}

export class OtherDetails {
  caste: string;
  age: number;
  height: number;
  income: number;
  maritalStatus: string;
  regional: string;
  employeedIn: string;
  education: string;
  dhosam: string;
  city: string;
  diet: string;
  onlyShowProfile: OnlyShowProfile;
  dontShowProfile: DontShowProfile;

  constructor(obj: Partial<OtherDetails> = {}) {
    Object.assign(this, obj);
  }
}

export class OnlyShowProfile {
  withPhoto: boolean;
  withHoroscope: boolean;

  constructor(obj: Partial<OnlyShowProfile> = {}) {
    Object.assign(this, obj);
  }
}

export class DontShowProfile {
  alreadyViewed: boolean;

  constructor(obj: Partial<DontShowProfile> = {}) {
    Object.assign(this, obj);
  }
}
