import { AbstractView } from "../../common/view.js";
import onChange from 'on-change';
import { Header } from "../../conponents/header/header.js";
import { Search } from "../../conponents/search/search.js";
import { CardList } from "../../conponents/card-list/card-list.js";



export class MainView extends AbstractView{

    state = {
        list: [],
        total: 0,
        loading: false,
        searchQuery: undefined,
        offset: 0
    };

    constructor(appState) {
        super();
        this.appState = appState;
        this.appState = onChange(this.appState, this.appStateHook.bind(this));
        this.state = onChange(this.state, this.stateHook.bind(this));

        this.setTitel('Поиск фильмов');
    }; 

    destroy() {
        onChange.unsubscribe(this.appState);
        onChange.unsubscribe(this.state);
    }

    appStateHook(path) {
        if (path === 'favorites') {
            this.render();
        }
    };

    async stateHook(path) {
        if (path === 'searchQuery') {
            this.state.loading = true;
            const data = await this.loadList(this.state.searchQuery);
            this.state.loading = false;
           
            this.state.total = data.total;
            this.state.list = data.docs;
        }
       
        if (path === 'list' || path === 'loading') {
            this.render();
        }
    };

    
    // async loadList() {
    //     const response = await fetch('harry-potter.json');
    //     return await response.json();
    // };
    async loadList(query) {
        // const response = await fetch('harry-potter.json');
        // const data = await response.json();
    
        // const filteredData = data.filter(item => item.name.toLowerCase().includes(query.toLowerCase()));
        
        // return filteredData;

        const res = await fetch(`https://api.kinopoisk.dev/v1.4/movie/search?query=${query}&token=E2Q5B5B-XKK4YC1-QSBFT6N-BC92CMH`);
        // https://api.kinopoisk.dev/v1.4/movie/search?query={harry%20potter}&token=E2Q5B5B-XKK4YC1-QSBFT6N-BC92CMH
        return res.json();
    }
// const res = await fetch('./harry-potter.json')
        //                 .then(response => response.json())
        //                 .then(({ docs }) => {
        //                     console.log(docs);
                        // });

        
    

    render() {
        const main = document.createElement('div');
        main.innerHTML=`
        <h1>
            Найдено фильмов: ${this.state.total}
        </h1>`

        main.append(new Search(this.state).render());
        
        
        main.append(new CardList(this.appState, this.state).render());
        
        this.app.innerHTML = '';
        
        this.app.append(main);
        
        this.renderHeader();
       
    };

    renderHeader() {
        const header = new Header(this.appState).render();
        this.app.prepend(header);
    };
    
};