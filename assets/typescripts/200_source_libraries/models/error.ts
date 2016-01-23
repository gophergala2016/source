/// <reference path="../../_app.ts" />

namespace Source.Libraries.Models {

	export class Error {

		message: string;
		title: string;

		constructor(message: string, title?: string) {
			if (!title) {
				title = '';
			}

			this.message = message.replace(/%s/g, '`').replace(/\\n/g, "\n");
			this.title = title.replace(/%s/g, '`').replace(/\\n/g, "\n");
		}

		isTitleNone(): boolean {
			return this.title === '';
		}

		hasTitle(): boolean {
			return this.title !== '';
		}

		hasMessage(): boolean {
			return this.message !== '';
		}

	}

}
