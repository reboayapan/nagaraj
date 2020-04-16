import {
  MatchesResults,
  UserDetailsResponse,
  DisplayDetails,
  OtherDetails,
  OnlyShowProfile,
  DontShowProfile
} from "../models/index";

export class UserDetailsHelper {

    static getFormattedUserDetails(
    response: UserDetailsResponse[]
  ): MatchesResults[] {
    const matches: MatchesResults[] = [];

    if (response && response.length) {
      response.forEach((userDetails: UserDetailsResponse) => {
        matches.push(this.getFormatttedUserDetail(userDetails));
      });
    }

    return matches;
  }

  static getFormatttedUserDetail(
    userDetails: UserDetailsResponse
  ): MatchesResults {
    if (userDetails) {
      return new MatchesResults({
        id: userDetails.id,
        name: `${userDetails.firstName} ${userDetails.lastName}`,
        lastSeen: userDetails.lastLogin,
        joinedOn: "", // Map with joined on
        imagePath: userDetails.photo,
        displayDetails: this._getDisplayDetails(userDetails),
        otherDetils: this._getOtherDetails(userDetails),
        isMatch: false
      });
    }

    return null;
  }

  static _getDisplayDetails(
    userDetails: UserDetailsResponse
  ): DisplayDetails[] {
    if (userDetails) {
      return [
        new DisplayDetails({
          key: `${userDetails.age} Years, ${userDetails.height}`,
          value: userDetails.education
        }),
        new DisplayDetails({
          key: userDetails.currentDistrict,
          value: "Others"
        }),
        new DisplayDetails({
          key: userDetails.caste,
          value: userDetails.income
        }),
        new DisplayDetails({
          key: `${userDetails.motherTongue} ${userDetails.currentState}`,
          value: userDetails.maritalStatus
        })
      ];
    }

    return null;
  }

  static _getOtherDetails(userDetails: UserDetailsResponse): OtherDetails {
    if (userDetails) {
      return new OtherDetails({
        caste: userDetails.caste,
        age: userDetails.age,
        height: userDetails.height,
        maritalStatus: userDetails.maritalStatus,
        regional: "Regional",
        employeedIn: userDetails.occupationType,
        education: userDetails.education,
        dhosam: userDetails.dosham,
        city: userDetails.currentDistrict,
        diet: userDetails.eatingHabit,
        onlyShowProfile: new OnlyShowProfile({
          withHoroscope: true,
          withPhoto: true
        }),
        dontShowProfile: new DontShowProfile({ alreadyViewed: true })
      });
    }

    return null;
  }

}
