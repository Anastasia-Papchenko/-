import { DivComponent } from "../../common/div-component";
import './header.css';

export class Header extends DivComponent {
    constructor(appState) {
        super();
        this.appState = appState;
    }

    render() {
        this.el.classList.add('header');
        this.el.innerHTML = `
            <div>
                <img src="/static/logo2.svg" alt="Логотип" />
            </div>
            <div class="menu">
                <a class="menu__item" href="#">
                    <img class="img_item" src="/static/search.svg" alt="Поиск иконка" />
                    Поиск фильмов
                </a>
                <a class="menu__item" href="#favorites">
                    <img class="img_item" src="/static/favorites.svg" alt="Избранное иконка" />
                    Избранное
                </a>
                <div class="menu__counter">
                    ${this.appState.favorites.length}
                </div>
            </div>

        `;
        return this.el;
    }
}