/// <reference path="../_app.ts" />

namespace Source.SourceLibraries.Const {

	export enum APIErrorCode {
		likeOverLimit = 7001,
		AuthNotAcceptPermissionEMail = 3021,
		AuthNotAcceptPermissionBirthday = 3023,
		AuthNotAcceptPermissionFriends = 3024,
		AuthNotAcceptPermissionRelationships = 3025,
		PhotoRequestCannotForBlockedPartner = 19004
	}

	export function authNotAcceptErrorCode(code: number): boolean {
		// Don't show error code details.
		switch(code) {
			case 3017:
			case 3018:
			case 3019:
			case 3020:
			case 3022:
				return true;
		}

		return false;
	}
}
