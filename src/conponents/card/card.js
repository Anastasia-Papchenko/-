import { DivComponent } from "../../common/div-component";
import './card.css';

export class Card extends DivComponent {
    constructor(appState, cardState) {
        super();
        this.appState = appState;
        this.cardState = cardState;
    }

    #addToFavorites() {
        this.appState.favorites.push(this.cardState);
    }

    #deleteFromFavorites() {
        this.appState.favorites = this.appState.favorites.filter(
            b => b.id !== this.cardState.id
        );
    }

  
    render() {
         
        this.el.classList.add('card');

        const existInFavorites = this.appState.favorites.find(
            b => b.id == this.cardState.id
        );

    //     <div class="card_teg">
    //     ${this.cardState.genres[0]}
    // </div>

        this.el.innerHTML=`
            <div class="card__image">
               <img class ="img_card" src="https://st.kp.yandex.net/images/film_iphone/iphone360_${this.cardState.id}.jpg" alt="Обложка"/>
            </div>
            <div class="card__info">

                <div class="card__name">
                    ${this.cardState.name}
                </div>
                <div class="card_year">
                    ${this.cardState.year}
                </div>
                <div class="card__footer">
                    <button class="button__add ${existInFavorites ? 'button__active' : ''}">
                        ${existInFavorites
                            ? '<img src="/static/favorites.svg" />'
                            : '<img src="/static/favorites-white.svg" />'
                        }

                    </button>
                </div>
            </div>
        `;

        if (existInFavorites) {
            this.el
            .querySelector('button')
            .addEventListener('click', this.#deleteFromFavorites.bind(this));
        } else {
            this.el
            .querySelector('button')
            .addEventListener('click', this.#addToFavorites.bind(this));
        }
        return this.el;
    }
};