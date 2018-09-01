import {Controller} from "stimulus"

export default class extends Controller {

    static targets = ["result"]; // references resultTarget in scope

    greeting(event) {

        event.preventDefault(); // disable form submit

        const form = this.element;

        fetch(form.action, {
            method: 'post',
            body: new FormData(form) // https://developer.mozilla.org/en-US/docs/Web/API/FormData/FormData
        })
            .then(response => response.text())
            .then(text => this.result = text)
            .catch(error => console.error(error));
    }

    set result(text) {
        this.resultTarget.innerHTML = `<p>${text}</p>`
    }
}
