export class AbstractView {

    constructor() {
        this.app = document.getElementById('root');
    }
 
    setTitel(title) {
        document.title = title;
    }
    render() {
        return;
    }
    destrot() {
        return;
    }
}